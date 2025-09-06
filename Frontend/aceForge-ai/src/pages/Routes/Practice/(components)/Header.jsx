import { Code2, Search, Filter } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { Badge } from "../../../../components/ui/badge";
import { FilterSelect } from "../../../../components/ui/filter-select";
import { DIFFICULTY_OPTIONS, TOPIC_OPTIONS } from "../utils/constants";
import PropTypes from "prop-types";

export function Header({
  searchTerm,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedTopic,
  onTopicChange,
}) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        {/* Logo + Title + Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AlgoMaster
            </h1>
          </div>
          <Badge variant="secondary" className="text-xs">
            15 Problems
          </Badge>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 items-center">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <FilterSelect
              value={selectedDifficulty}
              onChange={onDifficultyChange}
              options={DIFFICULTY_OPTIONS}
            />
            <FilterSelect
              value={selectedTopic}
              onChange={onTopicChange}
              options={TOPIC_OPTIONS}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

// ✅ PropTypes for validation in plain React
Header.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  selectedDifficulty: PropTypes.string.isRequired,
  onDifficultyChange: PropTypes.func.isRequired,
  selectedTopic: PropTypes.string.isRequired,
  onTopicChange: PropTypes.func.isRequired,
};
