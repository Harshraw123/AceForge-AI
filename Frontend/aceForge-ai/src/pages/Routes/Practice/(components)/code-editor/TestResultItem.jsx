import { Badge } from '../../../../../components/ui/badge';

export function TestResultItem({ result, index }) {
  return (
    <div 
      className={`p-3 rounded-lg text-xs font-mono border transition-colors ${
        result.passed 
          ? 'bg-success/10 text-success border-success/20' 
          : 'bg-destructive/10 text-destructive border-destructive/20'
      }`}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Test Case {index + 1}</span>
        <Badge 
          variant={result.passed ? "default" : "destructive"} 
          className="text-xs"
        >
          {result.passed ? 'PASS' : 'FAIL'}
        </Badge>
      </div>
      
      {/* Details */}
      <div className="space-y-1">
        <div className="text-muted-foreground">
          <span className="font-medium">Input:</span> {result.testCase.input}
        </div>
        <div className="text-muted-foreground">
          <span className="font-medium">Expected:</span> {result.testCase.expected}
        </div>
        {result.actual && (
          <div className="text-muted-foreground">
            <span className="font-medium">Output:</span> {result.actual}
          </div>
        )}
        {result.error && (
          <div className="text-destructive">
            <span className="font-medium">Error:</span> {result.error}
          </div>
        )}
        {result.runtime && (
          <div className="text-xs text-muted-foreground mt-1">
            Runtime: {result.runtime}ms | Memory: {result.memory}MB
          </div>
        )}
      </div>
    </div>
  );
}
