/**
 * Problem description component showing detailed problem information
 * Includes statement, examples, constraints, topics, hints, and test cases
 */
import { Badge } from '../../../../components/ui/badge';
import { DifficultyBadge } from  '../../../../components/ui/difficulty-badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../../components/ui/collapsible'
import { ChevronDown, ChevronUp, Lightbulb, ArrowLeft } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProblemDescription({ question }) {
  const [hintsOpen, setHintsOpen] = useState(false);
  const router = useNavigate();

  return (
    <div className="h-full overflow-y-auto">
      {/* Header with back button */}
      <div className="p-4 border-b border-border bg-card">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router('/')}
          className="mb-3"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Problems
        </Button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold mb-2">{question.title}</h1>
            <div className="flex items-center gap-2">
              <DifficultyBadge difficulty={question.difficulty} />
              <span className="text-sm text-muted-foreground">
                Acceptance: {question.acceptance}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Problem Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Problem Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {question.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-3 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.examples.map((example, index) => (
              <div key={index} className="bg-muted/50 rounded-lg p-4">
                <div className="font-semibold text-sm mb-2">Example {index + 1}:</div>
                <div className="space-y-2 text-sm font-mono">
                  <div>
                    <span className="font-semibold">Input:</span> {example.input}
                  </div>
                  <div>
                    <span className="font-semibold">Output:</span> {example.output}
                  </div>
                  {example.explanation && (
                    <div className="text-muted-foreground">
                      <span className="font-semibold">Explanation:</span> {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Constraints */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Constraints</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {question.constraints.map((constraint, index) => (
                <li key={index} className="text-sm font-mono text-muted-foreground">
                  • {constraint}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {question.topics.map((topic) => (
                <Badge key={topic} variant="secondary" className="topic-tag">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hints (Collapsible) */}
        {question.hints && question.hints.length > 0 && (
          <Collapsible open={hintsOpen} onOpenChange={setHintsOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-warning" />
                      Hints ({question.hints.length})
                    </CardTitle>
                    {hintsOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {question.hints.map((hint, index) => (
                      <div key={index} className="bg-warning/5 border border-warning/20 rounded-lg p-3">
                        <div className="text-sm">
                          <span className="font-semibold text-warning">Hint {index + 1}:</span>{' '}
                          <span className="text-muted-foreground">{hint}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

        {/* Test Cases Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Test Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {question.testCases
                .filter(testCase => !testCase.hidden)
                .map((testCase, index) => (
                <div key={index} className="bg-muted/50 rounded p-3 font-mono">
                  <div>Input: {testCase.input}</div>
                  <div>Expected: {testCase.expected}</div>
                </div>
              ))}
              
              {question.testCases.some(tc => tc.hidden) && (
                <div className="text-xs text-muted-foreground mt-2">
                  + {question.testCases.filter(tc => tc.hidden).length} hidden test cases
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
