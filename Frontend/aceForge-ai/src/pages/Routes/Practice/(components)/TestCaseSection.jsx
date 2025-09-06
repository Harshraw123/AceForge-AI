import React, { useState } from "react";

export default function TestCaseSection({ testCases = [], result }) {
  const [activeTab, setActiveTab] = useState(0);

  const renderResults = () => {
    if (!testCases || testCases.length === 0) {
      return <div className="text-gray-400 text-sm">No test cases available</div>;
    }

    const currentTestCase = testCases[activeTab];
    if (!currentTestCase) {
      return <div className="text-gray-400 text-sm">Test case not found</div>;
    }

    return (
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Input:</h4>
          <pre className="bg-[#161b22] p-3 rounded text-sm text-gray-300 overflow-x-auto">
            {JSON.stringify(currentTestCase.input, null, 2)}
          </pre>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Expected Output:</h4>
          <pre className="bg-[#161b22] p-3 rounded text-sm text-gray-300 overflow-x-auto">
            {JSON.stringify(currentTestCase.expectedOutput, null, 2)}
          </pre>
        </div>
        {result && typeof result === 'object' && Array.isArray(result.results) && result.results[activeTab] && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Actual Output:</h4>
            <pre className="bg-[#161b22] p-3 rounded text-sm text-gray-300 overflow-x-auto">
              {JSON.stringify(result.results[activeTab].output, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-lg">
      {/* Tabs */}
      <div className="flex space-x-2 px-3 py-2 border-b border-[#30363d] text-xs">
        {testCases.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              activeTab === i
                ? 'bg-[#238636] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#21262d]'
            }`}
          >
            Case {i + 1}
            {result && typeof result === 'object' && Array.isArray(result.results) && result.results[i] && (
              <span className="ml-1">
                {result.results[i].passed ? <span className="text-green-400">✓</span> : <span className="text-red-400">✗</span>}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {renderResults()}
      </div>
    </div>
  );
}
