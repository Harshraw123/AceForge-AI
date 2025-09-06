/**
 * Custom hook for dashboard filtering and search functionality
 * Manages filter state and computed filtered results
 */
import { useState, useMemo } from "react";
import PropTypes from "prop-types";

export function useDashboardFilters({ questions = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");

  const filteredQuestions = useMemo(() => {
    if (!questions || questions.length === 0) return [];
    
    return questions.filter((question) => {
      const title = question.title || question.question || '';
      const description = question.description || '';
      const difficulty = question.difficulty || 'medium';
      const topics = question.topics || [];
      
      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDifficulty =
        selectedDifficulty === "all" ||
        difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      const matchesTopic =
        selectedTopic === "all" || 
        topics.some(topic => topic.toLowerCase() === selectedTopic.toLowerCase());

      return matchesSearch && matchesDifficulty && matchesTopic;
    });
  }, [questions, searchTerm, selectedDifficulty, selectedTopic]);

  const stats = useMemo(() => {
    if (!questions || questions.length === 0) {
      return {
        solved: 0,
        attempted: 0,
        total: 0,
        unsolved: 0,
      };
    }
    
    const solved = questions.filter((q) => (q.status || 'unsolved') === "solved").length;
    const attempted = questions.filter((q) => (q.status || 'unsolved') === "attempted").length;
    const total = questions.length;

    return {
      solved,
      attempted,
      total,
      unsolved: total - solved - attempted,
    };
  }, [questions]);

  return {
    // State
    searchTerm,
    selectedDifficulty,
    selectedTopic,

    // Computed
    filteredQuestions,
    stats,

    // Setters
    setSearchTerm,
    setSelectedDifficulty,
    setSelectedTopic,
  };
}

// ✅ Optional runtime validation (helpful for debugging)
useDashboardFilters.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      question: PropTypes.string,
      description: PropTypes.string,
      difficulty: PropTypes.string,
      topics: PropTypes.arrayOf(PropTypes.string),
      status: PropTypes.oneOf(["solved", "attempted", "unsolved"]),
    })
  ),
};
