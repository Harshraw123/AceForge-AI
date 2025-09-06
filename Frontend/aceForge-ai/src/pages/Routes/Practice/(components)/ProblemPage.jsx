import { ProblemDescription } from "./ProblemDescription";
import { CodeEditor } from "./CodeEditor";
import TestCaseSection from "./TestCaseSection";
import { useState } from "react";

export function ProblemPage({ question }) {
  const [finalResult, setFinalResult] = useState();

  if (!question) {
    return <div className="text-center py-12">Question not found.</div>;
  }

  console.log("this is", question);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 h-screen">
      {/* Left Section */}
      <div className="col-span-2 flex flex-col border rounded-lg shadow-sm overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <ProblemDescription question={question} />
        </div>
      </div>

      {/* Right Section */}
      <div className="col-span-3 flex flex-col border rounded-lg shadow-sm overflow-hidden">
        {/* Editor takes most height */}
        <div className="flex-[4] overflow-y-auto p-4">
          <CodeEditor
            question={question}
            updateResult={(result) => setFinalResult(result)}
          />
        </div>

        {/* Test Cases compact at bottom */}
        <div className="flex-[1] border-t p-2 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
          <TestCaseSection
            testCases={question.testCases}
            result={finalResult}
          />
        </div>
      </div>
    </div>
  );
}
