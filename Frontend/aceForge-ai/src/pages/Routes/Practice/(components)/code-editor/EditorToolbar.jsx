/**
 * Code editor toolbar component
 * Handles language selection, font size, and action buttons
 */
import { Button } from '../../../../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../components/ui/select';
import { Play, Send, RotateCcw } from 'lucide-react';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' }
];

const FONT_SIZES = [12, 14, 16, 18];

export function EditorToolbar({
  language,
  onLanguageChange,
  fontSize,
  onFontSizeChange,
  onReset,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting
}) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Font Size Selector */}
        <Select
          value={fontSize.toString()}
          onValueChange={(value) => onFontSizeChange(parseInt(value))}
        >
          <SelectTrigger className="w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_SIZES.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}px
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onRun}
          disabled={isRunning}
        >
          <Play className="h-4 w-4 mr-1" />
          {isRunning ? 'Running...' : 'Run'}
        </Button>

        <Button
          size="sm"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Send className="h-4 w-4 mr-1" />
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
}
