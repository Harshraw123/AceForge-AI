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
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'muted':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  return (
    <Card className={cn('hover-scale border border-yellow-500/30 bg-gray-900 rounded-xl', className)}>
      <CardContent className="p-4">
        <div className={cn('text-2xl font-bold', getVariantStyles())}>
          {value}
        </div>
        <div className="text-sm text-gray-400">{title}</div>
        {subtitle && (
          <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
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
