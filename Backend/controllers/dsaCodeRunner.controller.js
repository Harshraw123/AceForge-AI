import axios from "axios";

const JUDGE0_KEY = process.env.JUDGE0_API_KEY;
const JUDGE0_API = process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com/submissions";

// Judge0 language IDs (stable versions at time of writing)
const LANGUAGE_MAP = {
  javascript: 63, // Node.js
  python: 71,     // Python 3.x
  java: 62,       // Java 17
  cpp: 54,        // C++ (GCC)
};

/**
 * Parse input string to extract parameters for different question types
 */
function parseInput(inputStr) {
  const input = String(inputStr);
  let params = [];
  
  try {
    // Case 1: Array + other parameters: "[2,7,11,15], 9" or "[1,2,3], [4,5,6]"
    if (input.includes('], ')) {
      let remaining = input;
      
      while (remaining.includes('[')) {
        const arrayStart = remaining.indexOf('[');
        let bracketCount = 1;
        let arrayEnd = arrayStart + 1;
        
        // Find matching closing bracket
        while (bracketCount > 0 && arrayEnd < remaining.length) {
          if (remaining[arrayEnd] === '[') bracketCount++;
          if (remaining[arrayEnd] === ']') bracketCount--;
          arrayEnd++;
        }
        
        if (bracketCount === 0) {
          // Extract array part
          const arrayPart = remaining.substring(arrayStart, arrayEnd);
          try {
            const array = JSON.parse(arrayPart);
            params.push(array);
          } catch (e) {
            // If JSON parsing fails, parse manually
            const arrayStr = arrayPart.substring(1, arrayPart.length - 1);
            const array = arrayStr.split(',').map(s => s.trim()).map(s => {
              if (s === 'null') return null;
              if (s === 'true') return true;
              if (s === 'false') return false;
              if (s.startsWith('-')) return parseInt(s);
              if (!isNaN(s)) return parseInt(s);
              return s.replace(/^["']|["']$/g, ''); // Remove quotes for strings
            });
            params.push(array);
          }
          
          // Move past the array and any comma/space
          remaining = remaining.substring(arrayEnd).trim();
          if (remaining.startsWith(',')) {
            remaining = remaining.substring(1).trim();
          }
          
          // Check if there's a non-array parameter next
          if (remaining.length > 0 && remaining[0] !== '[') {
            const nextComma = remaining.indexOf(',');
            const paramPart = nextComma !== -1 ? remaining.substring(0, nextComma).trim() : remaining.trim();
            
            // Parse the parameter
            if (paramPart === 'null') {
              params.push(null);
            } else if (paramPart === 'true') {
              params.push(true);
            } else if (paramPart === 'false') {
              params.push(false);
            } else if (paramPart.startsWith('"') || paramPart.startsWith("'")) {
              // String parameter
              params.push(paramPart.substring(1, paramPart.length - 1));
            } else if (!isNaN(paramPart)) {
              // Number parameter
              params.push(parseInt(paramPart));
            } else {
              // Keep as string
              params.push(paramPart);
            }
            
            // Move past this parameter
            remaining = nextComma !== -1 ? remaining.substring(nextComma + 1).trim() : '';
          }
        } else {
          break;
        }
      }
    } 
    // Case 2: Single array: "[1,2,3]" or "[1,null,2,3]"
    else if (input.startsWith('[') && input.endsWith(']')) {
      try {
        const array = JSON.parse(input);
        params.push(array);
      } catch (e) {
        // Manual parsing for arrays with null/true/false
        const arrayStr = input.substring(1, input.length - 1);
        const array = arrayStr.split(',').map(s => s.trim()).map(s => {
          if (s === 'null') return null;
          if (s === 'true') return true;
          if (s === 'false') return false;
          if (s.startsWith('-')) return parseInt(s);
          if (!isNaN(s)) return parseInt(s);
          return s.replace(/^["']|["']$/g, '');
        });
        params.push(array);
      }
    }
    // Case 3: String: "hello" or 'world'
    else if ((input.startsWith('"') && input.endsWith('"')) || 
             (input.startsWith("'") && input.endsWith("'"))) {
      params.push(input.substring(1, input.length - 1));
    }
    // Case 4: Boolean: true or false
    else if (input === 'true' || input === 'false') {
      params.push(input === 'true');
    }
    // Case 5: Number: 42 or -42
    else if (!isNaN(input)) {
      params.push(parseInt(input));
    }
    // Case 6: Comma-separated values: "1,2,3"
    else if (input.includes(',')) {
      const values = input.split(',').map(s => s.trim()).map(s => {
        if (s === 'null') return null;
        if (s === 'true') return true;
        if (s === 'false') return false;
        if (s.startsWith('-')) return parseInt(s);
        if (!isNaN(s)) return parseInt(s);
        return s.replace(/^["']|["']$/g, '');
      });
      params = values;
    }
    // Case 7: Single value (fallback)
    else {
      params.push(input);
    }
  } catch (e) {
    console.warn("Failed to parse input:", input, e);
    params = [input];
  }
  
  return params;
}

// Deep comparison with support for unordered arrays (e.g., group anagrams)
function normalizeForCompare(value) {
  if (Array.isArray(value)) {
    // If elements are arrays or objects, normalize each then sort by JSON string
    const normalized = value.map((v) => normalizeForCompare(v));
    const allNested = normalized.every((v) => Array.isArray(v) || (v && typeof v === 'object'));
    if (allNested) {
      return normalized
        .map((v) => JSON.stringify(v))
        .sort()
        .map((s) => JSON.parse(s));
    }
    // Primitive array: sort for order-insensitive compare
    return [...normalized].sort((a, b) => {
      const sa = typeof a === 'string' ? a : JSON.stringify(a);
      const sb = typeof b === 'string' ? b : JSON.stringify(b);
      return sa.localeCompare(sb);
    });
  }
  if (value && typeof value === 'object') {
    const keys = Object.keys(value).sort();
    const obj = {};
    for (const k of keys) obj[k] = normalizeForCompare(value[k]);
    return obj;
  }
  return value;
}

/**
 * Function to run user code against testcases using Judge0
 */
export async function runDsaCode(req, res) {
  try {
    const { language, soln, testcases } = req.body;

    // --- Validation ---
    if (!language || !soln || !testcases) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    if (!Array.isArray(testcases)) {
      return res.status(400).json({ success: false, message: "'testcases' must be an array" });
    }

    // Map language to Judge0 ID
    const langId = LANGUAGE_MAP[language.toLowerCase()];
    if (!langId) {
      return res.status(400).json({ success: false, message: "Unsupported language" });
    }

    const results = [];
    let allPassed = true;

    // --- Run code for each testcase ---
    for (const tc of testcases) {
      if (!tc || typeof tc !== "object" || tc.input === undefined || tc.expected === undefined) {
        results.push({
          input: tc?.input,
          expected: tc?.expected,
          output: "",
          passed: false,
          error: "Invalid testcase format",
        });
        allPassed = false;
        continue;
      }

      let { input, expected } = tc;
      
      try {
        // Create executable code based on language
        let executableCode;
        let stdin = "";
        
        if (language.toLowerCase() === "javascript") {
          // Parse input to extract parameters
          const params = parseInput(input);
          
          // Extract function name from user's code
          const funcNameMatch = soln.match(/function\s+(\w+)/);
          if (!funcNameMatch) {
            results.push({
              input,
              expected,
              output: "",
              passed: false,
              error: "Could not find function name in code",
            });
            allPassed = false;
            continue;
          }
          
          const funcName = funcNameMatch[1];
          
          // Create executable code that calls the user's function
          executableCode = `${soln}\n\n// Test runner\nconst result = ${funcName}(${params.map(p => JSON.stringify(p)).join(', ')});\nconsole.log(JSON.stringify(result));`;
          
        } else if (language.toLowerCase() === "python") {
          // Parse input to extract parameters
          const params = parseInput(input);
          
          // Extract function name from user's code
          const funcNameMatch = soln.match(/def\s+(\w+)/);
          if (!funcNameMatch) {
            results.push({
              input,
              expected,
              output: "",
              passed: false,
              error: "Could not find function name in code",
            });
            allPassed = false;
            continue;
          }
          
          const funcName = funcNameMatch[1];
          
          // Create executable code that calls the user's function
          executableCode = `${soln}\n\n# Test runner\nimport json\nresult = ${funcName}(${params.map(p => {
            if (p === null) return 'None';
            if (typeof p === 'boolean') return p ? 'True' : 'False';
            if (typeof p === 'string') return `"${p}"`;
            if (Array.isArray(p)) return JSON.stringify(p);
            return p;
          }).join(', ')})\nprint(json.dumps(result))`;
          
        } else {
          // For other languages, use the original approach
          executableCode = soln;
          stdin = String(input);
        }

        // Send code to Judge0
        const { data: submission } = await axios.post(
          `${JUDGE0_API}?base64_encoded=false&wait=true`,
          {
            source_code: executableCode,
            language_id: langId,
            stdin: stdin,
          },
          {
            headers: {
              "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
              "x-rapidapi-key": JUDGE0_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        // Extract output and errors
        const output = (submission.stdout || "").trim();
        const error =
          submission.stderr ||
          submission.compile_output ||
          (submission.status && submission.status.description !== "Accepted"
            ? submission.status.description
            : null);

        // --- Normalize outputs for fair comparison ---
        const normalizeValue = (val) => {
          if (val === null || val === undefined) return null;
          if (typeof val !== 'string') return val; // already typed

          const trimmed = val.trim();

          // JSON arrays/objects
          if ((trimmed.startsWith('[') && trimmed.endsWith(']')) ||
              (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
              trimmed === 'null') {
            try { return JSON.parse(trimmed); } catch (_) { /* fallthrough */ }
          }

          // booleans
          if (trimmed === 'true') return true;
          if (trimmed === 'false') return false;

          // numbers (int or float)
          if (!isNaN(trimmed)) return Number(trimmed);

          return trimmed; // plain string
        };

        const expectedOutput = normalizeValue(expected);
        const actualOutput = normalizeValue(output);

        // Compare outputs
        // Order-insensitive deep compare for arrays/objects where order doesn't matter
        const passed = JSON.stringify(normalizeForCompare(actualOutput)) === JSON.stringify(normalizeForCompare(expectedOutput)) && !error;
        if (!passed) allPassed = false;

        results.push({
          input,
          expected: expectedOutput,
          output: actualOutput,
          passed,
          error,
        });
      } catch (err) {
        allPassed = false;
        results.push({
          input,
          expected,
          output: "",
          passed: false,
          error: `Judge0 error: ${err.message}`,
        });
      }
    }

    // --- Final Response ---
    const totalTests = results.length;
    const totalPassed = results.filter((r) => r.passed).length;

    if (allPassed) {
      return res.json({
        success: true,
        message: "All testcases passed ✅",
        totalTests,
        totalPassed,
        results,
      });
    } else {
      return res.json({
        success: false,
        message: "Some testcases failed ❌",
        totalTests,
        totalPassed,
        results,
      });
    }
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
