import { Editor } from '@monaco-editor/react';
import { EditorToolbar } from './code-editor/EditorToolbar';
import { ResultsPanel } from './code-editor/ResultsPanel';
import { useCodeEditor } from '../../../../hooks/use-code-editor';

export function CodeEditor({ question, onSubmit, updateResult }) {
  const {
    language,
    code,
    isRunning,
    isSubmitting,
    results,
    fontSize,
    setCode,
    setFontSize,
    handleLanguageChange,
    handleRun,
    handleSubmit,
    handleReset
  } = useCodeEditor({ question, onSubmit, updateResult });

  // Show error message if question is invalid
  if (!question || !question.functionSignature) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-500 text-lg">Invalid question data</p>
          <p className="text-gray-500 text-sm">Please select a valid question</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <EditorToolbar
        language={language}
        onLanguageChange={handleLanguageChange}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        onReset={handleReset}
        onRun={handleRun}
        onSubmit={handleSubmit}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
      />

      {/* Code Editor */}
      <div className="flex-1 code-editor-container">
        <Editor
          height="100%"
          language={language === 'cpp' ? 'cpp' : language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            fontSize,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            renderLineHighlight: 'line',
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
            fontLigatures: true,
            lineNumbers: 'on',
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderWhitespace: 'selection'
          }}
        />
      </div>

      {results && <ResultsPanel results={results} />}
    </div>
  );
}
