// Updated: Quiz.jsx (Professional White Theme)

import { BookOpen, Sparkles, Target, User } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const DisplayData = [
  {
    title: "Role-Based",
    description: "Questions adapted to your professional role and responsibilities",
    icon: User,
  },
  {
    title: "Experience Level",
    description: "Tailored to your experience level, ensuring appropriate difficulty",
    icon: Target,
  },
  {
    title: "Topic Focused",
    description: "Focused on specific topics you want to master",
    icon: BookOpen,
  },
  {
    title: "AI Powered",
    description: "Powered by AI for personalized and relevant questions",
    icon: Sparkles,
  },
];

const Quiz = () => {
  const [formData, setFormData] = useState({ role: '', experience: '', topics: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const res = await axiosInstance.post('/api/quiz/generate', {
        role: formData.role,
        experience: formData.experience,
        topicsToFocus: formData.topics,
      });
      const quizId = res.data.quizId;
      if (quizId) navigate(`/quiz/${quizId}`);
      else alert(res.data.error || 'Failed to generate quiz ID.');
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred while generating the quiz.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gray-100 rounded-full mr-4">
              <Sparkles className="w-8 h-8 text-gray-800" />
            </div>
            <h1 className="text-4xl font-bold  text-white ">
              AI Powered Quiz
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Create personalized quizzes tailored to your role, experience, and topics of interest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {DisplayData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className=" border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 " />
                </div>
                <h3 className="text-lg text-white  font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className=" border border-gray-200 rounded-2xl p-8 max-w-2xl mx-auto">
          <h2 className="text-xl  text-white font-bold text-center mb-8">
            Generate Your Custom Quiz
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                Your Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g., Software Developer, Marketing Manager"
                className="w-full px-4 py-3 text-white border border-gray-300 rounded-lg "
                required
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-white mb-2">
                Experience Level
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-white  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950"
                required
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner (0-1 years)</option>
                <option value="intermediate">Intermediate (2-4 years)</option>
                <option value="advanced">Advanced (5-7 years)</option>
                <option value="expert">Expert (8+ years)</option>
              </select>
            </div>

            <div>
              <label htmlFor="topics" className="block text-sm font-mediu text-white mb-2">
                Topics to Focus On
              </label>
              <input
                type="text"
                id="topics"
                name="topics"
                value={formData.topics}
                onChange={handleInputChange}
                placeholder="e.g., React, Python, Machine Learning"
                className="w-full px-4 py-3 border  border-gray-300 rounded-lg focus:outline-none "
                required
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isGenerating ? 'Generating Quiz...' : 'Generate Quiz'}
            </button>
          </form>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">
            Powered by advanced AI for personalized learning experiences
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
