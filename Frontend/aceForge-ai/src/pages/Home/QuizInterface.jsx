import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
// import Confetti from 'react-confetti'; // optional celebration effect

const QuizInterface = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/quiz/${quizId}`);
        setQuiz(res.data.quiz);
      } catch (err) {
        const errorMsg = err.response?.data?.error || 'Failed to fetch quiz';
        alert(errorMsg);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    if (quizId) fetchQuiz();
  }, [quizId]);

  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`/api/quiz/${quizId}/submit`, { answers });
      setResult(res.data);
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to submit answers');
    }
  };

  const scorePercent = result ? ((result.correct / result.total) * 100).toFixed(1) : 0;

  if (loading) return <div className="text-center text-white mt-10">Loading quiz...</div>;
  if (error) return <div className="text-center text-white mt-10">{error}</div>;
  if (!quiz) return <div className="text-center text-white mt-10">Quiz not found or failed to load.</div>;

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-10 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-white to-gray-800 text-transparent bg-clip-text">
          AI Quiz
        </h1>

        {/* Quiz Questions */}
        <form onSubmit={handleSubmit} className="space-y-10">
          {quiz.questions.map((q, idx) => (
            <div
              key={q._id}
              className="rounded-2xl p-6 sm:p-8  shadow-md hover:shadow-yellow-500/10 transition-all"
            >
              <div className="text-lg sm:text-xl font-semibold mb-4">
                {idx + 1}. {q.question}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {q.options.map((opt, i) => {
                  const isSelected = answers[q._id] === opt;
                  const isCorrect = opt === q.answer;
                  const isWrong = submitted && isSelected && !isCorrect;

                  const baseClass =
                    'flex items-center p-3 sm:p-4 rounded-xl cursor-pointer border text-sm sm:text-base transition-all duration-200';
                  const borderStyle = submitted
                    ? isCorrect
                      ? 'border-green-400 '
                      : isWrong
                      ? 'border-red-500 bg-red-900/20'
                      : 'border-gray-700'
                    : isSelected
                    ? ''
                    : 'border-gray-700';

                  return (
                    <label key={i} className={`${baseClass} ${borderStyle}`}>
                      <input
                        type="radio"
                        name={q._id}
                        value={opt}
                        disabled={submitted}
                        checked={isSelected}
                        onChange={() => handleOptionChange(q._id, opt)}
                        className="mr-3 "
                      />
                      {opt}
                    </label>
                  );
                })}
              </div>
              {submitted && (
                <div className="mt-3 text-sm text-gray-400">
                  ✅ Correct Answer:{' '}
                  <span className="text-green-400 font-medium">{q.answer}</span>
                  {answers[q._id] && (
                    <span
                      className={
                        answers[q._id] === q.answer ? 'text-green-400 ml-4' : 'text-red-400 ml-4'
                      }
                    >
                      Your Answer: {answers[q._id]}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}

          {!submitted && (
            <button
              type="submit"
              className="w-full sm:w-auto block mx-auto mt-6 bg-blue-400 text-black font-semibold py-3 px-8 rounded-xl hover:from-yellow-500 hover:to-pink-500 transition-all duration-200"
            >
              Submit Answers
            </button>
          )}
        </form>

        {/* Result Panel */}
        {
  submitted && result && (
    <div className="mt-16 max-w-2xl mx-auto px-6 py-10  rounded-2xl shadow-xl">
      <div className="flex flex-col items-center space-y-6 text-center">
       

        <div className="text-5xl drop-shadow-lg">🏆</div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Quiz Completed
        </h2>
        <p className="text-[#E0E0E0] text-lg">
          You answered{' '}
          <span className="text-green-400 font-semibold">{result.correct}</span> out of{' '}
          <span className="font-medium">{result.total}</span> questions correctly
        </p>

        {/* Score Progress Bar */}
        <div className="w-full">
          <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-white transition-all duration-700"
              style={{ width: `${scorePercent}%` }}
            ></div>
          </div>
          <div className="text-sm text-[#A0A0A0] mt-2">
            Score: <span className="text-[#E0E0E0] font-bold">{scorePercent}%</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-400 text-black font-semibold px-6 py-3 rounded-xl hover:from-[#FFD700] hover:to-[#FF69B4] transition"
          >
            Retry Quiz
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-800 hover:bg-gray-700 text-[#E0E0E0] px-6 py-3 rounded-xl transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
      
      </div>
    </div>
  );
};

export default QuizInterface;
