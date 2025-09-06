/**
 * Reusable stats card component for displaying metrics and statistics
 * Used in dashboard progress tracking and performance metrics
 */
import { Card, CardContent } from './card';
import { cn } from '../../lib/utils';
import PropTypes from 'prop-types';

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  variant = 'default',
  className 
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'muted':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Card className={cn('hover-scale', className)}>
      <CardContent className="p-4">
        <div className={cn('text-2xl font-bold', getVariantStyles())}>
          {value}
        </div>
        <div className="text-sm text-muted-foreground">{title}</div>
        {subtitle && (
          <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
        )}
      </CardContent>
    </Card>
  );
}

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'muted']),
  className: PropTypes.string,
};
