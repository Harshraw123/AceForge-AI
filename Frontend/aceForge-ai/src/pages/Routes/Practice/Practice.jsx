/**
 * Main dashboard component displaying question list and progress
 * Integrates search, filtering, and navigation functionality
 */
import { Header } from './(components)/Header';
import { QuestionCard } from './(components)/QuestionCard';
import { StatsCard } from '../../../components/ui/stats-card';
import { useNavigate } from 'react-router-dom';
import { useDashboardFilters } from '../../../hooks/use-dashboard-filter'
import {questions} from '../../../utils/PracticeQuestions'



function Practice() {
    const navigate = useNavigate();
  
    const {
      searchTerm,
      selectedDifficulty,
      selectedTopic,
      filteredQuestions,
      stats,
      setSearchTerm,
      setSelectedDifficulty,
      setSelectedTopic
    } = useDashboardFilters({ questions });
  
    const handleQuestionClick = (questionId) => {
      navigate(`/solve/${questionId}`);
    };
  
    return (
      <div className="min-h-screen bg-background">
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedTopic={selectedTopic}
          onTopicChange={setSelectedTopic}
        />
        
        <main className="container mx-auto px-4 py-6">
          {/* Progress Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatsCard title="Total Problems" value={stats.total} />
            <StatsCard title="Solved" value={stats.solved} variant="success" />
            <StatsCard title="Attempted" value={stats.attempted} variant="warning" />
            <StatsCard title="Todo" value={stats.unsolved} variant="muted" />
          </div>
  
          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuestions.map((question, index) => (
              <QuestionCard
                key={`${question.id}-${index}`}
                question={question}
                onClick={() => handleQuestionClick(question.id)}
              />
            ))}
          </div>
          
          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No problems found matching your criteria.</p>
              <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </main>
      </div>
    );
}

export default Practice;