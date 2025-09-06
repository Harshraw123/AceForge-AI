// 👉 yeh function alag-alag language ke liye test runner generate karega
export function generateCode({ language, code, question }) {
    const testCases = question.testCases;
  
    switch (language) {
      // ------------------------- JAVASCRIPT -------------------------
      case "javascript":
        return `
  // 👇 user ka solution code inject ho raha hai
  ${code}
  
  // 👇 testcases ko JS object me convert kar rahe hain
  const tests = ${JSON.stringify(testCases, null, 2)};
  
  // 👇 loop karke saare testcases run karenge
  for (const tc of tests) {
    try {
      const args = eval("[" + tc.input + "]"); // input ko array ya args me convert
      const funcName = (${code}).match(/function\\s+(\\w+)/)[1]; // function ka naam nikalna
      const result = eval(funcName)(...args); // function call
      console.log("Expected:", tc.expected, "| Got:", JSON.stringify(result));
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
        `;
  
      // ------------------------- PYTHON -------------------------
      case "python":
        return `# 👇 user ka solution code inject
  ${code}
  
  tests = ${JSON.stringify(testCases, null, 2)}
  
  import json
  
  # 👇 function ka naam extract kar rahe hain
  func_name = "${question.functionSignature.python.split(" ")[1].split("(")[0]}"
  
  # 👇 testcases execute karenge
  for tc in tests:
      try:
          args = eval("[" + tc["input"] + "]")   # input ko python args me convert
          result = globals()[func_name](*args)   # function call
          print("Expected:", tc["expected"], "| Got:", json.dumps(result))
      except Exception as e:
          print("Error:", str(e))
        `;
  
      // ------------------------- JAVA -------------------------
      case "java":
        return `import java.util.*;
  
  class Main {
      public static void main(String[] args) {
          Solution sol = new Solution();
          // 👇 input-output pairs inject ho rahe hain
          String[][] tests = ${JSON.stringify(
            testCases.map((tc) => [tc.input, tc.expected]),
            null,
            2
          )};
          for (String[] t : tests) {
              try {
                  String input = t[0];
                  String expected = t[1];
  
                  // 👇 result variable jisme function ka output store hoga
                  Object result = null;
  
                  // case 1: agar input matrix hai
                  if (input.startsWith("[[") && input.endsWith("]]")) {
                      String cleaned = input.substring(2, input.length() - 2);
                      String[] rows = cleaned.split("\\],\\[");
                      int[][] matrix = new int[rows.length][];
                      for (int i = 0; i < rows.length; i++) {
                          String[] nums = rows[i].split(",");
                          matrix[i] = new int[nums.length];
                          for (int j = 0; j < nums.length; j++) {
                              matrix[i][j] = Integer.parseInt(nums[j]);
                          }
                      }
                      result = sol.${question.id.replace(
                        /-([a-z])/g,
                        (g) => g[1].toUpperCase()
                      )}(matrix);
  
                  // case 2: agar input array hai
                  } else if (input.startsWith("[") && input.endsWith("]")) {
                      String cleaned = input.substring(1, input.length() - 1);
                      String[] parts = cleaned.split(",");
                      int[] arr = new int[parts.length];
                      for (int i = 0; i < parts.length; i++) {
                          arr[i] = Integer.parseInt(parts[i].trim());
                      }
                      result = sol.${question.id.replace(
                        /-([a-z])/g,
                        (g) => g[1].toUpperCase()
                      )}(arr);
  
                  // case 3: agar input string hai
                  } else if (input.startsWith("\\"") && input.endsWith("\\"")) {
                      String s = input.substring(1, input.length() - 1);
                      result = sol.${question.id.replace(
                        /-([a-z])/g,
                        (g) => g[1].toUpperCase()
                      )}(s);
  
                  // case 4: otherwise integer input
                  } else {
                      int num = Integer.parseInt(input.trim());
                      result = sol.${question.id.replace(
                        /-([a-z])/g,
                        (g) => g[1].toUpperCase()
                      )}(num);
                  }
  
                  // 👇 output print karna
                  System.out.println("Expected: " + expected);
                  if (result instanceof int[]) {
                      System.out.println("Got: " + Arrays.toString((int[]) result));
                  } else if (result instanceof int[][]) {
                      System.out.println("Got: " + Arrays.deepToString((int[][]) result));
                  } else {
                      System.out.println("Got: " + result);
                  }
  
              } catch (Exception e) {
                  System.out.println("Error: " + e.getMessage());
              }
          }
      }
  }
  
  // 👇 user ka solution inject
  ${code}
        `;
  
      // ------------------------- C++ -------------------------
      case "cpp":
        return `
  #include <bits/stdc++.h>
  using namespace std;
  
  // 👇 yaha pe user ka solution inject hoga
  ${code}
  
  // 👇 string ko array<int> me convert karne wala helper
  vector<int> parseArray(const string &s) {
      string str = s;
      str.erase(remove_if(str.begin(), str.end(), ::isspace), str.end()); // spaces hata do
      vector<int> res;
      string num;
      for (char c : str) {
          if (isdigit(c) || c == '-') num += c;
          else if (!num.empty()) { res.push_back(stoi(num)); num.clear(); }
      }
      if (!num.empty()) res.push_back(stoi(num));
      return res;
  }
  
  // 👇 string ko 2D matrix me convert karne wala helper
  vector<vector<int>> parseMatrix(const string &s) {
      string str = s;
      str.erase(remove_if(str.begin(), str.end(), ::isspace), str.end());
      vector<vector<int>> matrix;
      string inner = str.substr(1, str.size()-2); // outer [[ ]] hatao
      string row;
      bool inRow = false;
      for (char c : inner) {
          if (c == '[') { row.clear(); inRow = true; }
          else if (c == ']') { 
              inRow = false; 
              matrix.push_back(parseArray("[" + row + "]")); 
          }
          else if (inRow) row += c;
      }
      return matrix;
  }
  
  int main() {
      // 👇 input-output pairs inject ho rahe hain
      vector<pair<string,string>> tests = {
  ${testCases.map(tc => `        {"${tc.input}", "${tc.expected}"}`).join(",\n")}
      };
      Solution sol;
  
      // 👇 har testcase execute karo
      for (auto &tc : tests) {
          try {
              string input = tc.first;
              string expected = tc.second;
  
              cout << "Expected: " << expected << "\\n";
  
              // case 1: matrix input
              if (input.rfind("[[", 0) == 0) {
                  auto mat = parseMatrix(input);
                  auto res = sol.${question.id.replace(/-([a-z])/g, g => g[1].toUpperCase())}(mat);
  
                  cout << "Got: [";
                  for (size_t r=0;r<res.size();r++) {
                      cout << "[";
                      for (size_t c=0;c<res[r].size();c++) {
                          cout << res[r][c];
                          if (c+1<res[r].size()) cout << ",";
                      }
                      cout << "]";
                      if (r+1<res.size()) cout << ",";
                  }
                  cout << "]\\n";
  
              // case 2: array input
              } else if (input.rfind("[", 0) == 0) {
                  auto arr = parseArray(input);
                  auto res = sol.${question.id.replace(/-([a-z])/g, g => g[1].toUpperCase())}(arr);
  
                  cout << "Got: [";
                  for (size_t i=0;i<res.size();i++) {
                      cout << res[i];
                      if (i+1<res.size()) cout << ",";
                  }
                  cout << "]\\n";
  
              // case 3: string input
              } else if (input.rfind("\"", 0) == 0) {
                string s = input.substr(1, input.size()-2);
                auto res = sol.${question.id.replace(/-([a-z])/g, g => g[1].toUpperCase())}(s);
                cout << "Got: " << res << "\\n";
              // case 4: integer input
              } else {
                  int num = stoi(input);
                  auto res = sol.${question.id.replace(/-([a-z])/g, g => g[1].toUpperCase())}(num);
                  cout << "Got: " << res << "\\n";
              }
  
          } catch (exception &e) {
              cout << "Error: " << e.what() << "\\n";
          }
      }
      return 0;
  }
        `;
  
      default:
        return code;
    }
  }
  