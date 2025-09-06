import { ProblemPage } from './(components)/ProblemPage';
import { useParams} from 'react-router-dom';
import { questions } from '@/utils/PracticeQuestions';

const Solve = () => {
  const { id } = useParams();
  console.log('this is question', id);

  console.log(questions);

  // Find the question with the matching ID
  const question = questions ? questions.find((q) => q.id === id) : null;

  console.log('this is the ', question);

  if (!question) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Question Not Found</h1>
          <p className="text-gray-500 mb-4">The question you're looking for doesn't exist.</p>
          <button 
            onClick={() => window.history.back()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <ProblemPage question={question} />;
};

export default Solve;