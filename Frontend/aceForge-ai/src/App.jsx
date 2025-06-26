import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import LandingPage from './pages/Home/LandingPage'
import Dashboard from './pages/Home/Dashboard'
import InterviewPrep from './pages/interviewPrep/components/InterviewPrep'
import { Toaster } from 'react-hot-toast'
import { UserContext } from './context/UserContext'
import Quiz from './pages/Home/Quiz'
import QuizInterface from './pages/Home/QuizInterface'
import CodeEditor from  './pages/Home/CodeEditor'

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(UserContext);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/interview-prep/:sessionId" 
            element={
              <ProtectedRoute>
                <InterviewPrep />
              </ProtectedRoute>
            } 
          />
            <Route 
            path="/quiz" 
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            } 
          />
          <Route path="/quiz/:quizId" element={<QuizInterface />} />
          <Route 
            path="/code-editor" 
            element={
              <ProtectedRoute>
                <CodeEditor />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          className:"",
          style:{
            fontSize: '13px',
          }
        }}
      />
    </div>
  )
}

export default App
