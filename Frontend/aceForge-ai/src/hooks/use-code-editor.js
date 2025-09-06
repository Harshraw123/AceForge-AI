/**
 * Custom hook for code editor state management
 * Handles language switching, code execution, and state persistence
 */
import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPath";

// This function is your hook
export function useCodeEditor({ question, onSubmit, updateResult }) {
  // Get available languages and default to first available
  const availableLanguages = question?.functionSignature ? Object.keys(question.functionSignature) : [];
  const defaultLanguage = availableLanguages.includes("javascript") ? "javascript" : availableLanguages[0] || "javascript";
  
  const [language, setLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState(question?.functionSignature?.[defaultLanguage] || "");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState(null);
  const [fontSize, setFontSize] = useState(14);

  // Reset code/results if the question changes
  useEffect(() => {
    // Debug: question change
    try {
      console.log("[useCodeEditor] question changed", {
        id: question?.id,
        title: question?.title,
        availableLanguages: Object.keys(question?.functionSignature || {}),
      });
    } catch (err) {
      console.warn("[useCodeEditor] question change log failed", err);
    }
    
    // Reset results whenever question changes
    setResults(null);
    
    // Update code if the language template is available
    if (question?.functionSignature?.[language]) {
      setCode(question.functionSignature[language]);
    } else if (question?.functionSignature && Object.keys(question.functionSignature).length > 0) {
      // If current language isn't available but others are, switch to an available language
      const availableLang = Object.keys(question.functionSignature)[0];
      setLanguage(availableLang);
      setCode(question.functionSignature[availableLang]);
    }
  }, [question, language]);

  const handleLanguageChange = useCallback(
    (newLanguage) => {
      setLanguage(newLanguage);
      if (question?.functionSignature?.[newLanguage]) {
        setCode(question.functionSignature[newLanguage]);
        setResults(null);
      }
    },
    [question?.functionSignature]
  );

  const handleRun = useCallback(async () => {
    if (!code.trim()) {
      setResults({
        success: false,
        totalPassed: 0,
        totalTests: 0,
        results: [
          {
            passed: false,
            testCase: { input: "", expected: "" },
            actual: "",
            error: "Please write some code before running.",
          },
        ],
      });
      return;
    }
    
    if (!question) {
      setResults({
        success: false,
        totalPassed: 0,
        totalTests: 0,
        results: [
          {
            passed: false,
            testCase: { input: "", expected: "" },
            actual: "",
            error: "No question data available.",
          },
        ],
      });
      return;
    }

    // Normalize test cases from question to { input, expected }
    const rawCases = question?.testCases || question?.testcases || [];
    if (!Array.isArray(rawCases) || rawCases.length === 0) {
      setResults({
        success: false,
        totalPassed: 0,
        totalTests: 0,
        results: [
          {
            passed: false,
            testCase: { input: "", expected: "" },
            actual: "",
            error: "No test cases available for this question.",
          },
        ],
      });
      return;
    }
    
    // Ensure test cases are properly formatted for the API
    const testcases = rawCases.map((tc) => {
      // Handle array inputs that might be stringified
      let input = tc.input;
      if (typeof input === 'string' && input.startsWith('[') && input.endsWith(']')) {
        try {
          // Try to parse it as JSON if it's a stringified array
          input = JSON.parse(input);
        } catch (e) {
          // If parsing fails, keep it as is
          console.warn("Failed to parse input as JSON", input);
        }
      }
      
      // Handle array outputs that might be stringified
      let expected = tc.expected ?? tc.output ?? "";
      if (typeof expected === 'string' && expected.startsWith('[') && expected.endsWith(']')) {
        try {
          // Try to parse it as JSON if it's a stringified array
          expected = JSON.parse(expected);
        } catch (e) {
          // If parsing fails, keep it as is
          console.warn("Failed to parse expected as JSON", expected);
        }
      }
      
      return {
        input: input,
        expected: expected,
      };
    });

    setIsRunning(true);
    try {
      // Debug: Outgoing request info
      console.log("[useCodeEditor] RUN start", {
        language,
        codeLength: code.length,
        testcasesCount: testcases.length,
        endpoint: API_PATHS.DSACodeRun.Run,
      });

      const { data } = await axiosInstance.post(
        `${API_PATHS.DSACodeRun.Run}`,
        { language, soln: code, testcases }
      );

      // Debug: Raw response
      console.log("[useCodeEditor] RUN response", data);

      // Transform backend response to UI-friendly structure
      const uiResults = {
        success: Boolean(data?.success),
        totalPassed: data?.totalPassed ?? (data?.results?.filter?.((r) => r.passed).length || 0),
        totalTests: data?.totalTests ?? (data?.results?.length || 0),
        results: Array.isArray(data?.results) ? data.results.map((r) => {
          // Format input, expected, and output consistently
          // Keep arrays as arrays, but convert other values to strings for display
          const formatValue = (val) => {
            if (val === null || val === undefined) return "";
            if (Array.isArray(val)) return val;
            return String(val);
          };
          
          return {
            passed: Boolean(r.passed),
            testCase: { 
              input: formatValue(r.input), 
              expected: formatValue(r.expected)
            },
            actual: formatValue(r.output),
            error: r.error || null,
            runtime: r.time || null,
            memory: r.memory || null,
          };
        }) : [],
      };

      // Debug: Transformed results
      console.log("[useCodeEditor] RUN transformed", uiResults);

      setResults(uiResults);
      if (updateResult) {
        updateResult(uiResults);
      }
    } catch (error) {
      // Debug: Error details
      console.error("[useCodeEditor] RUN error:", {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      setResults({
        success: false,
        totalPassed: 0,
        totalTests: 0,
        results: [
          {
            passed: false,
            testCase: { input: "", expected: "" },
            actual: "",
            error: error?.response?.data?.message || error.message || "Run failed: There was an error executing your code.",
          },
        ],
      });
    } finally {
      console.log("[useCodeEditor] RUN end");
      setIsRunning(false);
    }
  }, [code, language, question, updateResult]);

  const handleSubmit = useCallback(async () => {
    if (!code.trim()) {
      setResults({
        success: false,
        totalPassed: 0,
        totalTests: 0,
        results: [
          {
            passed: false,
            testCase: { input: "", expected: "" },
            actual: "",
            error: "Please write some code before submitting.",
          },
        ],
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmit && typeof onSubmit === 'function') {
        const result = await onSubmit(code, language);
        // Ensure result has the expected structure
        const formattedResult = result && typeof result === 'object' ? result : {
          success: false,
          totalPassed: 0,
          totalTests: 0,
          results: []
        };
        
        setResults(formattedResult);
        if (updateResult && typeof updateResult === 'function') {
          updateResult(formattedResult);
        }
      } else {
        // If no onSubmit handler is provided, fall back to handleRun
        await handleRun();
      }
    } catch (error) {
      console.error("Submit failed:", error);
      setResults({
        success: false,
        totalPassed: 0,
        totalTests: 0,
        results: [
          {
            passed: false,
            testCase: { input: "", expected: "" },
            actual: "",
            error: error?.message || "Submission failed. Please try again.",
          },
        ],
      });
      
      if (updateResult && typeof updateResult === 'function') {
        updateResult({
          success: false,
          error: error?.message || "Submission failed"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [code, language, onSubmit, handleRun, updateResult]);

  const handleReset = useCallback(() => {
    if (question?.functionSignature?.[language]) {
      setCode(question.functionSignature[language]);
      setResults(null);
    }
  }, [question?.functionSignature, language]);

  return {
    // State
    language,
    code,
    isRunning,
    isSubmitting,
    results,
    fontSize,

    // Setters
    setCode,
    setFontSize,

    // Handlers
    handleLanguageChange,
    handleRun,
    handleSubmit,
    handleReset,
  };
}

// ✅ Optional runtime validation (helpful for debugging)
useCodeEditor.propTypes = {
  question: PropTypes.shape({
    functionSignature: PropTypes.objectOf(PropTypes.string),
    testCases: PropTypes.array,
    testcases: PropTypes.array,
  }),
  onSubmit: PropTypes.func,
  updateResult: PropTypes.func,
};
