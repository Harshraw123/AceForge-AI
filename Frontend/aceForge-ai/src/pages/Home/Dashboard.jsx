import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

import Modal from '../../components/Modal';
import CreateSessionForm from '../interviewPrep/components/CreateSessionForm';
import EmptyState from '../interviewPrep/components/EmptyState';
import FloatingActionButton from '../interviewPrep/components/FloatingActionButton';
import SummaryCard from '../interviewPrep/components/SummaryCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      if (response.data.success) {
        setSessions(response.data.sessions || []);
      } else {
        setError('Failed to fetch sessions');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred while fetching sessions';
      setError(errorMessage);
      toast.error('Failed to load sessions');
      console.error('Fetch sessions error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleCloseModal = (shouldRefresh) => {
    setOpenCreateModal(false);
    if (shouldRefresh) {
      fetchSessions();
    }
  };

  const handleCardClick = (sessionId) => {
    if (sessionId) {
      navigate(`/interview-prep/${sessionId}`);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        await axiosInstance.delete(`/api/sessions/${sessionId}`);
        toast.success('Session deleted successfully!');
        setSessions((prevSessions) => prevSessions.filter((s) => s._id !== sessionId));
      } catch (err) {
        toast.error('Failed to delete session.');
        console.error('Delete session error:', err);
      }
    }
  };

  const handleRetry = () => {
    fetchSessions();
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen text-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          
          {/* Header */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold  bg-gradient-to-r from-gray-300 via-gray-300 to-gray-700 bg-clip-text text-transparent  shadow-gray-900 bg-gray-700  mb-4">
                Your AceForge AI Dashboard
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Manage your AceForge AI sessions and practice for your dream role
              </p>
            </div>

            {/* Play Quiz Button */}
            <div className="flex justify-end mt-2 gap-4">
              <button
                onClick={() => navigate('/solve')}
                className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Practice Problems
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
              >
                Play Quiz
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-500" />
                <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-blue-300" />
              </div>
              <p className="text-gray-500 animate-pulse">Loading your sessions...</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="max-w-md mx-auto">
              <div className="text-center p-8 bg-red-100 border border-red-300 rounded-xl">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">Oops! Something went wrong</h3>
                <p className="text-red-500 mb-6">{error}</p>
                <button 
                  onClick={handleRetry}
                  className="px-6 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && sessions.length === 0 && (
            <EmptyState onCreate={() => setOpenCreateModal(true)} />
          )}

          {/* Sessions Grid */}
          {!loading && !error && sessions.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Your Sessions ({sessions.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sessions.map((session) => (
                  <SummaryCard
                    key={session._id || Math.random()}
                    session={session}
                    onClick={handleCardClick}
                    onDelete={handleDeleteSession}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Floating Action Button */}
          <FloatingActionButton onClick={() => setOpenCreateModal(true)} />

          {/* Create Session Modal */}
          <Modal
            isOpen={openCreateModal}
            onClose={handleCloseModal}
            title="Start a New Interview Journey"
            hideHeader={true}
          >
            <CreateSessionForm onClose={handleCloseModal} />
          </Modal>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
