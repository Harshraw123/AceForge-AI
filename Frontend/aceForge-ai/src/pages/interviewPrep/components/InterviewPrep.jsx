import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import { API_PATHS } from '../../../utils/apiPath';
import { FaUserTie, FaRegCalendarAlt, FaQuestionCircle, FaClock, FaDownload } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import { ClipLoader } from 'react-spinners';
import jsPDF from 'jspdf';

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
        if (response.data.success && response.data.session) {
          setSession(response.data.session);
        } else {
          setError('Session not found.');
          setSession(null);
        }
      } catch (e) {
        const status = e?.response?.status;
        if (status === 404) setError('Session not found or you do not have access.');
        else if (status === 401) setError('Your session expired. Please log in again.');
        else setError('Failed to load session.');
        setSession(null);
      } finally {
        setLoading(false);
      }
    };
    if (sessionId) fetchSession();
  }, [sessionId]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix = ['th', 'st', 'nd', 'rd'][day % 10 > 3 || ~~((day % 100) / 10) === 1 ? 0 : day % 10];
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}${suffix} ${month} ${year}`;
  };

  // Responsive copy button for code blocks
  const addCopyButtonsToCode = () => {
    setTimeout(() => {
      document.querySelectorAll('pre code').forEach((codeBlock) => {
        const parent = codeBlock.parentElement;
        if (parent && !parent.classList.contains('code-block-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'code-block-wrapper';
          parent.replaceWith(wrapper);
          wrapper.appendChild(parent);

          const button = document.createElement('button');
          button.className = 'copy-button';
          button.innerText = 'Copy';
          button.onclick = () => {
            navigator.clipboard.writeText(codeBlock.innerText);
            button.innerText = 'Copied!';
            setTimeout(() => (button.innerText = 'Copy'), 2000);
          };
          wrapper.appendChild(button);
        }
      });
    }, 100);
  };

  // Run after every render where expanded or session/questions change
  useEffect(() => {
    addCopyButtonsToCode();
  }, [expanded, session]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
          <ClipLoader color="#f59e0b" size={36} />
          <div className="text-white">Loading session...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
          <div className="text-yellow-400 text-xl font-semibold">{error}</div>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg shadow transition"
          >
            Go to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const {
    role = 'Interview',
    experience = 'Not specified',
    topicsToFocus = 'General',
    description = 'AceForge AI session',
    questions = [],
    createdAt,
    updatedAt,
  } = session || {};

  const handleLoadMore = async () => {
    setLoadingMore(true);
    setError(null);
    try {
      // 1. Generate 3 more questions
      const aiRes = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        description,
        numberOfQuestions: 3,
      });
      const newQuestions = aiRes.data;
      // 2. Add them to the session
      await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: newQuestions,
      });
      // 3. Refetch session to update UI
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      if (response.data.success && response.data.session) {
        setSession(response.data.session);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load more questions.');
    } finally {
      setLoadingMore(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`${role} - Interview Q&A`, 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Topics: ${topicsToFocus}`, 14, 30);
    doc.text(`Experience: ${experience}`, 14, 36);

    let y = 50; // Initial Y position for Q&A

    questions.forEach((q, index) => {
      if (y > 250) { // Check for page break
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      const questionLines = doc.splitTextToSize(`Q${index + 1}: ${q.question}`, 180);
      doc.text(questionLines, 14, y);
      y += (questionLines.length * 5) + 3;

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(80, 80, 80);
      
      // Rough conversion of markdown to plain text for PDF
      const plainAnswer = q.answer
        .replace(/\n/g, '\n')
        .replace(/\t/g, '  ')
        .replace(/`/g, '')
        .replace(/\*\*/g, '')
        .replace(/###/g, '')
        .replace(/##/g, '')
        .replace(/#/g, '');

      const answerLines = doc.splitTextToSize(plainAnswer, 170);
      
      if (y + (answerLines.length * 5) > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(answerLines, 20, y);
      y += (answerLines.length * 5) + 10;
    });

    doc.save(`${role.replace(/\s+/g, '_')}_interview.pdf`);
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto py-4 px-2 sm:py-10 sm:px-4">
        {/* Action Buttons: Download PDF + Try Code Editor */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center sm:justify-end items-stretch sm:items-center w-full">
          <button
            onClick={handleDownloadPDF}
            className="bg-yellow-400 hover:bg-yellow-500 text-black dark:text-white font-semibold px-6 py-2 rounded-lg shadow transition w-full sm:w-auto"
          >
            Download PDF
          </button>
          <button
            onClick={() => navigate('/code-editor')}
            className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black font-semibold px-6 py-2 rounded-lg shadow transition w-full sm:w-auto"
          >
            Try Code Editor
          </button>
        </div>
        {/* Session Details */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2 dark:text-white">{role}</h2>
          <div className="text-gray-400 mb-2 text-sm sm:text-base">{topicsToFocus}</div>
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
            <span className="flex items-center gap-1 bg-gray-200 dark:bg-[#1f2937]/80 text-black dark:text-yellow-200 px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              <FaUserTie className="text-yellow-400" /> Experience: {experience}
            </span>
            <span className="flex items-center gap-1 bg-gray-200 dark:bg-[#1f2937]/80 text-black dark:text-pink-200 px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              <FaQuestionCircle className="text-pink-400" /> {questions.length} Q&A
            </span>
            <span className="flex items-center gap-1 bg-gray-200 dark:bg-[#1f2937]/80 text-black dark:text-indigo-200 px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              <FaClock className="text-indigo-400" /> Last Updated: {formatDate(updatedAt)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <FaRegCalendarAlt className="text-yellow-300" />
            <span>Created on: {formatDate(createdAt)}</span>
          </div>
          <div className="text-white italic mb-2 text-sm sm:text-base">{description}</div>
        </div>

        {/* Q&A Section */}
        <div className=" dark:bg-black rounded-xl shadow p-2 sm:p-6 transition-all duration-300 w-full">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white">AceForge AI Q & A</h3>
          <div className="space-y-2 sm:space-y-4">
            {questions.length === 0 && <div className="text-gray-400">No questions found.</div>}
            {questions.map((q, idx) => (
              <div
                key={q._id || idx}
                className="border-b text-white border-gray-200 dark:border-gray-700 py-2 sm:py-4"
              >
                <button
                  className="w-full flex justify-between items-center py-3 sm:py-4 text-left focus:outline-none transition-all duration-200"
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                >
                  <span className="flex items-center gap-2 text-base sm:text-lg font-medium text-black dark:text-white">
                    <span className=" bg-gray-400 rounded-full px-2 py-1 text-xs font-bold mr-2">Q</span>
                    <span className="break-words text-white text-left">{q.question}</span>
                  </span>
                  <span className="ml-2 sm:ml-4 text-gray-400">{expanded === idx ? '▲' : '▼'}</span>
                </button>
                {expanded === idx && (
                  <div className="pl-2 sm:pl-8 pb-2 sm:pb-4 text-gray-700 dark:text-gray-200 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-amber-100 dark:bg-amber-900 rounded-full px-2 py-1 text-xs font-bold mr-2 text-amber-700 dark:text-amber-300">A</span>
                      <span className="font-semibold text-white">Answer:</span>
                    </div>
                    <div className="w-full font-bold text-white px-1 sm:px-6 prose prose-xs sm:prose-sm prose-invert max-w-none overflow-x-auto rounded-md ">
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {q.answer?.replace(/\\n/g, '\n').replace(/\\t/g, '  ')}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Load More Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg shadow transition disabled:opacity-60 flex items-center gap-2"
          >
            {loadingMore ? <ClipLoader color="#000" size={20} /> : 'Load More Questions'}
          </button>
        </div>
      </div>
      {/* Responsive code block and copy button styles */}
      <style>{`
        .code-block-wrapper {
          position: relative;
        }
        .copy-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: #374151;
          color: #fff;
          font-size: 0.8rem;
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          z-index: 10;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .copy-button:hover {
          background: #111827;
        }
        .prose pre {
          overflow-x: auto;
          border-radius: 0.5rem;
          margin: 0.5rem 0;
        }
        @media (max-width: 640px) {
          .prose pre {
            font-size: 0.85rem;
            padding: 0.75rem 0.5rem;
            margin: 0.25rem 0;
          }
          .flex-col.sm\\:flex-row { /* Ensure buttons stack on small screens */
            flex-direction: column;
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default InterviewPrep;