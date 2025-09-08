/**
 * Question card component for displaying problem information
 * Shows difficulty, status, topics, and acceptance rate in a compact format
 */
import { Badge } from '../../../../components/ui/badge';
import { DifficultyBadge } from '../../../../components/ui/difficulty-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

import { cn } from '../../../../lib/utils';
import { UI_CONFIG } from  '../../../../lib/utils';



export function QuestionCard({ question, onClick }) {

  const getStatusIcon = (status) => {
    switch (status) {
      case 'solved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'attempted':
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusIndicator = (status) => {
    switch (status) {
      case 'solved': return 'progress-solved';
      case 'attempted': return 'progress-attempted';
      default: return 'progress-unsolved';
    }
  };

  return (
    <Card 
      className="question-card group cursor-pointer border border-yellow-500/30 bg-gray-900 hover:bg-gray-900/80 hover:border-yellow-400/80 hover:shadow-lg hover:shadow-yellow-500/10 transition-colors duration-200 rounded-xl"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("shrink-0", getStatusIndicator(question.status))} />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg text-white group-hover:text-yellow-300 transition-colors truncate">
                {question.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <DifficultyBadge difficulty={question.difficulty} />
                <span className="text-xs text-gray-400">
                  {question.acceptance}% acceptance
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            {getStatusIcon(question.status)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="text-sm text-gray-300 line-clamp-2 mb-3">
          {question.description.slice(0, UI_CONFIG.DESCRIPTION_PREVIEW_LENGTH)}...
        </CardDescription>
        
        <div className="flex flex-wrap gap-1">
          {question.topics.slice(0, UI_CONFIG.MAX_VISIBLE_TOPICS).map((topic) => (
            <Badge key={topic} variant="secondary" className="topic-tag text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
              {topic}
            </Badge>
          ))}
          {question.topics.length > UI_CONFIG.MAX_VISIBLE_TOPICS && (
            <Badge variant="secondary" className="topic-tag text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
              +{question.topics.length - UI_CONFIG.MAX_VISIBLE_TOPICS}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}