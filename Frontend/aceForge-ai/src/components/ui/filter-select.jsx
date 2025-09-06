import { cn } from '../../lib/utils';
import PropTypes from 'prop-types';

export function FilterSelect({ 
  value, 
  onChange, 
  options, 
  placeholder,
  className 
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'px-3 py-2 text-sm border border-border rounded-md',
        'bg-background text-foreground',
        'focus:ring-2 focus:ring-primary focus:border-primary',
        'transition-colors duration-200',
        'hover:border-primary/50',
        className
      )}
    >
      {placeholder && (
        <option value="">{placeholder}</option>
      )}
      {options.map(option => (
        <option key={option.value || option} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  );
}

FilterSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ])
  ).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};
