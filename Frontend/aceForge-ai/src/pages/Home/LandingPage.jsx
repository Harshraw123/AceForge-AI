import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import Testimonials from '../interviewPrep/components/Testimonials';
import Features from '../interviewPrep/components/Features';
import { UserContext } from '../../context/UserContext';
import ProfileInfoCard from '../interviewPrep/components/ProfileInfoCard';

const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const { loading, isAuthenticated } = useContext(UserContext);

  const handleCTA = () => {
    if (!isAuthenticated) {
      setOpenAuthModal(true);
    } else {
      navigate('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <nav className="flex justify-between items-center p-6">
        <h1 className="text-xl font-semibold">
          AceForge <span className="text-amber-500">AI</span>
        </h1>
        {isAuthenticated ? (
          <ProfileInfoCard />
        ) : (
          <button
            onClick={() => setOpenAuthModal(true)}
            className="bg-orange-400 text-white rounded-full px-6 py-3 font-semibold hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            Login / Sign Up
          </button>
        )}
      </nav>

      <div className="container mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h3 className="text-amber-400 font-semibold">✨ AI Powered</h3>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Ace Interviews with <br />
            <span className="text-amber-500">AI-Powered Learning</span>
          </h1>
        </div>

        <div className="space-y-4">
          <p className="text-lg leading-relaxed font-bold">
          Ace your interviews with AI-generated questions.
Test your skills with smart quizzes and real-time coding.
Your all-in-one interview prep toolkit—powered by AI.
          </p>
          <button
            onClick={handleCTA}
            className="bg-amber-400 text-white rounded-full px-8 py-4 font-semibold text-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="container mx-auto py-8 px-6">
  <div
    className="rounded-xl overflow-hidden mt-6 border border-gray-800 bg-black shadow-[0_0_50px_10px_rgba(255,191,0,0.15)] transition-all duration-500"
  >
    <img
      src="Hero.jpg"
      alt="Preview"
      className="w-full h-auto object-cover rounded-xl"
    />
  </div>
</div>


      <Features />
      
      <div className='mt-20'>
        <Testimonials />
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        authMode={true}
      />
    </div>
  );
};

export default LandingPage;
