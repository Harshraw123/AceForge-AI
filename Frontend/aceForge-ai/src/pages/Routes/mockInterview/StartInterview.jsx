import React, { useState, useEffect } from 'react'
import VapiWidget from './VapiWidget'
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';

const interviewerNames = {
  "Hmz0MdhDqv9vPpSMfDkh": "Rakesh Thakur",
  "rKEZ4zwQvgkCKHp8yR8n": "Jessica", 
  "TzH1pxB1AEqPI2KZJ5MT": "Daniel",
};

const StartInterview = ({ topic, experience, voiceAgent }) => {
  const [error, setError] = useState(null);
  const [audioPermission, setAudioPermission] = useState(null);

  const interviewerName = interviewerNames[voiceAgent] || "AI Interviewer";

  // Check if required props are provided
  useEffect(() => {
    if (!topic || !experience || !voiceAgent) {
      setError("Missing required interview data. Please restart the interview setup.");
      toast.error("Missing required interview data. Please restart the interview setup.");
    }
  }, [topic, experience, voiceAgent]);

  // Check audio permissions
  useEffect(() => {
    const checkAudioPermissions = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setError("Your browser doesn't support audio recording. Please use Chrome, Firefox, or Safari.");
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioPermission(true);
        stream.getTracks().forEach(track => track.stop());
        console.log("Audio permissions granted");
      } catch (error) {
        console.error("Audio permission denied:", error);
        setAudioPermission(false);
        setError("Microphone permission is required for the interview. Please allow microphone access and refresh the page.");
      }
    };

    checkAudioPermissions();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <div className="text-red-500 text-center">
          <p className="font-semibold mb-2">Error</p>
          <p>{error}</p>
        </div>
        <Button 
          onClick={() => window.location.href = '/interview-form'}
          className="mt-4"
        >
          Restart Interview Setup
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">AI Interview Session</h1>
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Interview with {interviewerName}</h2>
            <p className="text-gray-300 mb-1">Topic: {topic}</p>
            <p className="text-gray-300 mb-4">Experience: {experience}</p>
            
            {/* Audio Permission Status */}
            <div className="p-3 rounded-lg bg-gray-700">
              <p className="text-sm text-gray-300">
                Audio Status: {
                  audioPermission === null ? "Checking..." :
                  audioPermission === true ? "✅ Microphone Ready" :
                  "❌ Microphone Permission Required"
                }
              </p>
              {audioPermission === false && (
                <p className="text-xs text-red-400 mt-1">
                  Please allow microphone access in your browser settings
                </p>
              )}
            </div>
          </div>
        </div>

        {/* VapiWidget positioned for better UX */}
        <div className="relative">
          <VapiWidget 
            apiKey="4b342171-7d3a-4495-9eff-c8d6195b8b38" 
            assistantId={voiceAgent}
            interviewerName={interviewerName}
            topic={topic}
            experience={experience}
            audioPermission={audioPermission}
          />
        </div>
      </div>
    </div>
  )
}

export default StartInterview
