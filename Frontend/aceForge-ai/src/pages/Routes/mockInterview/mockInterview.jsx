import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import StartInterview from "./StartInterview";
import { Button } from "@/components/ui/button";

const MockInterview = () => {
  const { id: _id } = useParams(); // uuid (unused but kept for potential future use)
  const location = useLocation();
  const navigate = useNavigate();
  const { topic, experience, interviewer } = location.state || {};

  if (!topic || !experience || !interviewer) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-500">Missing Interview Data</h1>
          <p className="text-gray-400 mb-6">
            The interview session data is missing. This usually happens when you navigate directly to this URL.
          </p>
          <Button 
            onClick={() => navigate('/interview-form')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            Start New Interview
          </Button>
        </div>
      </div>
    );
  }

  return (
    <StartInterview 
      topic={topic} 
      experience={experience} 
      voiceAgent={interviewer}
    />
  );
};

export default MockInterview;
 