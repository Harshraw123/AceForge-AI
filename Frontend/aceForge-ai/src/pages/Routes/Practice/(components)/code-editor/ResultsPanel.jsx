/**
 * Code execution results panel component
 * Displays test results, performance metrics, and execution summary
 */
import { Badge } from '../../../../../components/ui/badge';
import { TestResultItem } from './TestResultItem'

export function ResultsPanel({ results }) {
  return (
    <div className="border-t border-border bg-card p-4 animate-fade-in">
      {/* Header with overall result */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Test Results</h3>
        <Badge variant={results.success ? "default" : "destructive"}>
          {results.totalPassed}/{results.totalTests} passed
        </Badge>
      </div>
      
      {/* Test Cases */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {results.results.slice(0, 5).map((result, index) => (
          <TestResultItem key={index} result={result} index={index} />
        ))}

        {results.results.length > 5 && (
          <div className="text-xs text-muted-foreground text-center p-2">
            + {results.results.length - 5} more test cases
          </div>
        )}
      </div>
      
      {/* Performance Metrics */}
      {results.success && results.percentile && (
        <div className="mt-4 pt-3 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-success/10 rounded-lg p-2 text-center">
              <div className="font-semibold text-success">Runtime</div>
              <div className="text-muted-foreground">
                {results.runtime}ms (Beats {results.percentile.runtime}%)
              </div>
            </div>
            <div className="bg-primary/10 rounded-lg p-2 text-center">
              <div className="font-semibold text-primary">Memory</div>
              <div className="text-muted-foreground">
                {results.memory}MB (Beats {results.percentile.memory}%)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
