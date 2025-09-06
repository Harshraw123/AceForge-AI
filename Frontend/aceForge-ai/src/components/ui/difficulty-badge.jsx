import { Badge } from './badge';
import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

export function DifficultyBadge({ difficulty, className }) {
  const getDifficultyStyles = () => {
    switch (difficulty) {
      case 'Easy':
        return 'difficulty-easy';
      case 'Medium':
        return 'difficulty-medium';
      case 'Hard':
        return 'difficulty-hard';
      default:
        return 'difficulty-easy';
    }
  };

  return (
    <Badge className={cn(getDifficultyStyles(), className)}>
      {difficulty}
    </Badge>
  );
}

DifficultyBadge.propTypes = {
  difficulty: PropTypes.oneOf(['Easy', 'Medium', 'Hard']).isRequired,
  className: PropTypes.string,
};
