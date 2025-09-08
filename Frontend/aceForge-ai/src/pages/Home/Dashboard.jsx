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
  const [activeTab, setActiveTab] = useState('MY'); // 'MY' | 'COMMUNITY'

  const fetchMySessions = async () => {
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

  const fetchCommunitySessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL_SESSIONS);
      // Expecting similar shape: { success, sessions }
      if (response.data?.success) {
        const list = Array.isArray(response.data.sessions) ? response.data.sessions : [];
        setSessions(list);
      } else {
        setError('Failed to fetch community sessions');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred while fetching community sessions';
      setError(errorMessage);
      toast.error('Failed to load community sessions');
      console.error('Fetch community sessions error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = () => {
    if (activeTab === 'MY') return fetchMySessions();
    return fetchCommunitySessions();
  }

  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

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
          
          {/* Header with Tabs */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold  bg-gradient-to-r from-gray-300 via-gray-300 to-gray-700 bg-clip-text text-transparent  shadow-gray-900 bg-gray-700  mb-4">
                Your AceForge AI Dashboard
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Manage your AceForge AI sessions and practice for your dream role
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="inline-flex rounded-xl bg-gray-800/60 p-1 border border-gray-700">
                <button
                  onClick={() => setActiveTab('COMMUNITY')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'COMMUNITY'
                      ? 'bg-yellow-500 text-black shadow'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Community
                </button>
                <button
                  onClick={() => setActiveTab('MY')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'MY'
                      ? 'bg-blue-500 text-white shadow'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  My Sessions
                </button>
              </div>

              {/* Play Buttons */}
              <div className="flex justify-end mt-2 gap-4">
                <button
                  onClick={() => toast('Coming soon: DSA Problems (Beta)')}
                  className="relative bg-gray-800 text-gray-300 font-semibold px-6 py-2 rounded-lg shadow cursor-not-allowed"
                  disabled
                  title="DSA Problems (Beta) — testing in progress"
                >
                  <span className="flex items-center gap-2">
                    <span>DSA Problems</span>
                    <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full">Beta</span>
                    <span className="opacity-80">🔒</span>
                  </span>
                </button>
                <button
                  onClick={() => navigate('/quiz')}
                  className="bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
                >
                  Play Quiz
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-500" />
                <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-blue-300" />
              </div>
              <p className="text-gray-500 animate-pulse">Loading sessions...</p>
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

          {/* Empty State (only for My Sessions) */}
          {!loading && !error && sessions.length === 0 && activeTab === 'MY' && (
            <EmptyState onCreate={() => setOpenCreateModal(true)} />
          )}

          {/* Sessions Grid */}
          {!loading && !error && sessions.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {activeTab === 'MY' ? 'Your Sessions' : 'Community Sessions'} ({sessions.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sessions.map((session) => (
                  <SummaryCard
                    key={session._id || Math.random()}
                    session={session}
                    onClick={handleCardClick}
                    onDelete={activeTab === 'MY' ? handleDeleteSession : undefined}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Floating Action Button (only for My Sessions) */}
          {activeTab === 'MY' && (
            <FloatingActionButton onClick={() => setOpenCreateModal(true)} />
          )}

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
