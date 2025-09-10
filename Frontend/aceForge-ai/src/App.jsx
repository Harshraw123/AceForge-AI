import React, { useContext } from 'react'
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import Practice from './pages/Routes/Practice/Practice'
import Solve from './pages/Routes/Practice/Solve'

import InterviewForm from './pages/Routes/mockInterview/InterviewForm'
import StartInterview from './pages/Routes/mockInterview/StartInterview'

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

const AppRouter = ({ children }) => {
  const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  const RouterImpl = isDev ? BrowserRouter : HashRouter;
  return <RouterImpl>{children}</RouterImpl>;
};

const App = () => {
  return (
    <div>
      <AppRouter>
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
          <Route path="/code-editor" element={<CodeEditor />} />
          <Route 
            path="/solve" 
            element={
              <ProtectedRoute>
                <Practice/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/solve/:id" 
            element={
              <ProtectedRoute>
                <Solve/>
              </ProtectedRoute>
            } 
          />

<Route 
            path="/interview-form" 
            element={
              <ProtectedRoute>
                <InterviewForm/>
              </ProtectedRoute>
            } 
          />
          
<Route 
            path="/mock-interview/:id" 
            element={
              <ProtectedRoute>
                <StartInterview/>
              </ProtectedRoute>
            } 
          />
          

        </Routes>
      </AppRouter>
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
