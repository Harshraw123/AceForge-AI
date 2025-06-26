// src/components/CodeEditor.jsx
import Editor from "@monaco-editor/react";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/atom-one-dark.css';

const languageOptions = [
  { label: "C++", value: "cpp" },
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "javascript" },
];

export default function CodeEditor() {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isAskingAI, setIsAskingAI] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    try {
      const res = await axiosInstance.post("/api/code/run", {
        sourceCode: code,
        language,
      });
      setOutput(res.data.output || "No output.");
    } catch (err) {
      setOutput("⚠️ Error: " + (err?.response?.data?.error || err.message));
    }
    setIsRunning(false);
  };

  const handleAskAI = async () => {
    setIsAskingAI(true);
    setAiFeedback("");
    try {
      const res = await axiosInstance.post(API_PATHS.REVIEW.AI, {
        sourceCode: code,
        language,
      });
      setAiFeedback(res.data.feedback || "No feedback provided.");
    } catch (err) {
      setAiFeedback("⚠️ AI Error: " + (err?.response?.data?.error || err.message));
    }
    setIsAskingAI(false);
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-6 font-mono">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-3/4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Code Editor</h2>
            <select
              className="bg-gray-800 text-white border border-gray-600 px-3 py-1 rounded focus:outline-none"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <Editor
            height="500px"
            language={language}
            value={code}
            onChange={(val) => setCode(val || "")}
            theme="white"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontLigatures: true,
            }}
          />

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 rounded text-white disabled:opacity-50"
            >
              {isRunning ? "Running..." : "Run Code"}
            </button>
            <button
              onClick={handleAskAI}
              disabled={
                isAskingAI ||
                (
                  (!code.trim() || code.trim() === "// Write your code here...") &&
                  !(aiFeedback && (/error|⚠️/i).test(aiFeedback))
                )
              }
              className="bg-yellow-400 hover:bg-purple-700 transition-all px-4 py-2 rounded text-white disabled:opacity-50"
            >
              {isAskingAI ? "Analyzing..." : "Ask AI"}
            </button>
          </div>
        </div>

        <div className="md:w-1/4 mt-9 bg-whi border border-gray-700 rounded p-4 h-[500px] overflow-auto">
          <h3 className="text-md font-semibold mb-2">Output</h3>
          <pre className="whitespace-pre-wrap text-green-400">
            {output || "Output will be shown here..."}
          </pre>
        </div>
      </div>

      {aiFeedback && (
        <div className="mt-6 bg-gray-800 border border-gray-700 p-4 rounded overflow-y-auto max-h-72">
          <h3 className="text-md font-semibold mb-2 text-yellow-300">AI Feedback</h3>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{aiFeedback}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
