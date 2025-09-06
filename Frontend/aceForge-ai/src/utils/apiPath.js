export const BASE_URL = "https://ace-forge-ai-backend.vercel.app";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Signup
    LOGIN: "/api/auth/login", // Authenticate user & return JWT token
    GET_PROFILE: "/api/auth/profile", // Get logged-in user details
  },

 

  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions", // Generate interview questions and answers using Gemini
    GENERATE_EXPLANATION: "/api/ai/generate-explanation", // Generate concept explanation using Gemini
    GENERATE_Quiz: "/api/ai/generate-quiz", // Generate quiz questions and answers using Gemini
  },

  SESSION: {
    CREATE: "/api/sessions/create", // Create a new interview session with questions
    GET_ALL: "/api/sessions/my-sessions", // Get all user sessions
    GET_ALL_SESSIONS: "/api/sessions/all", // Get all sessions in the database
    GET_ONE: (id) => `/api/sessions/${id}`, // Get session details with questions
    DELETE: (id) => `/api/sessions/${id}`, // Delete a session
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add", // Add more questions to a session
    PIN: (id) => `/api/questions/${id}/pin`, // Pin or Unpin a question
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`, // Update/Add a note to a question
  },

  REVIEW: {
    AI: "/api/review/ai", // AI code review endpoint
  },

  DSA: {
    UPDATE: '/api/problems/update',
    GETDETAILS: '/api/problems/progress'
  },
  DSACodeRun: {
    Run: '/api/dsaProblems/run'
  }
};
