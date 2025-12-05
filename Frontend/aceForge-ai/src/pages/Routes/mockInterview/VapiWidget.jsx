import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';

const VapiWidget = ({ 
  apiKey, 
  assistantId, 
  interviewerName = "AI Interviewer",
  topic = "General Interview",
  experience = "Mid Level",
  audioPermission = null
}) => {
  const [vapi, setVapi] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiKey || !assistantId) {
      setError("Missing API key or assistant ID");
      return;
    }

    console.log("Initializing Vapi with:", { apiKey: apiKey.substring(0, 10) + "...", assistantId });

    let vapiInstance;
    try {
      // Use simpler configuration to avoid potential issues
      vapiInstance = new Vapi(apiKey);
      setVapi(vapiInstance);
      console.log("Vapi instance created successfully");
    } catch (error) {
      console.error("Failed to create Vapi instance:", error);
      setError(`Failed to initialize Vapi: ${error.message || error}`);
      return;
    }

    // Event listeners
    vapiInstance.on('call-start', () => {
      console.log('🎤 Call started');
      setIsConnected(true);
      setIsLoading(false);
      toast.success("Interview started! You can now speak.");
    });

    vapiInstance.on('call-end', () => {
      console.log('📞 Call ended');
      setIsConnected(false);
      setIsSpeaking(false);
      toast.info("Interview ended");
    });

    vapiInstance.on('speech-start', () => {
      console.log('🗣️ Assistant started speaking');
      setIsSpeaking(true);
    });

    vapiInstance.on('speech-end', () => {
      console.log('🔇 Assistant stopped speaking');
      setIsSpeaking(false);
    });

    vapiInstance.on('message', (message) => {
      console.log('💬 Vapi message:', message);
      if (message.type === 'transcript') {
        setTranscript(prev => [...prev, {
          role: message.role,
          text: message.transcript,
          timestamp: new Date().toLocaleTimeString()
        }]);
      }
    });

    vapiInstance.on('error', (error) => {
      console.error('❌ Vapi error:', error);
      
      // Better error message handling
      let errorMessage = 'Unknown error occurred';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && error.message) {
        errorMessage = error.message;
      } else if (error && error.error) {
        errorMessage = error.error;
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error, null, 2);
      }
      
      setError(`Interview error: ${errorMessage}`);
      toast.error(`Interview error: ${errorMessage}`);
      setIsLoading(false);
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [apiKey, assistantId]);

  const startCall = async () => {
    if (!vapi) {
      toast.error("Vapi not initialized");
      return;
    }

    if (audioPermission === false) {
      toast.error("Microphone permission is required. Please allow microphone access.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setTranscript([]);

    try {
      console.log("Starting Vapi call with assistantId:", assistantId);
      console.log("Interview details:", { interviewerName, topic, experience });

      // Try the simpler start method first
      await vapi.start(assistantId);
    } catch (error) {
      console.error("Error starting Vapi call:", error);
      
      // Better error message handling
      let errorMessage = 'Unknown error occurred';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && error.message) {
        errorMessage = error.message;
      } else if (error && error.error) {
        errorMessage = error.error;
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error, null, 2);
      }
      
      setError(`Failed to start interview: ${errorMessage}`);
      toast.error(`Failed to start interview: ${errorMessage}`);
      setIsLoading(false);
    }
  };

  const endCall = async () => {
    try {
      if (vapi) {
        await vapi.stop();
      }
    } catch (error) {
      console.error("Error ending Vapi call:", error);
      
      // Better error message handling
      let errorMessage = 'Unknown error occurred';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && error.message) {
        errorMessage = error.message;
      } else if (error && error.error) {
        errorMessage = error.error;
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error, null, 2);
      }
      
      toast.error(`Error ending interview: ${errorMessage}`);
    }
  };

  if (error) {
    return (
      <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6">
        <div className="text-red-200 text-center">
          <p className="font-semibold mb-2">Error</p>
          <p className="text-sm mb-4">{error}</p>
          <div className="text-xs text-red-300 space-y-1">
            <p>Common solutions:</p>
            <p>• Check if the assistant ID is correct</p>
            <p>• Verify your internet connection</p>
            <p>• Allow microphone permissions</p>
            <p>• Try refreshing the page</p>
          </div>
          <Button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-700 hover:bg-red-800"
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!isConnected ? (
        <div className="text-center">
          <Button
            onClick={startCall}
            disabled={isLoading || audioPermission === false}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-yellow-500/25 transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Starting Interview...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                🎤 Start Interview with {interviewerName}
              </div>
            )}
          </Button>
          
          {audioPermission === false && (
            <p className="text-red-400 text-sm mt-4">
              Microphone permission is required. Please allow microphone access and refresh the page.
            </p>
          )}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${isSpeaking ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span className="text-white font-semibold text-lg">
                {isSpeaking ? 'Assistant Speaking...' : 'Listening...'}
              </span>
            </div>
            <Button
              variant="destructive"
              onClick={endCall}
              className="bg-red-600 hover:bg-red-700"
            >
              End Interview
            </Button>
          </div>
          
          {/* Transcript Display */}
          <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
            <h3 className="text-white font-semibold mb-4 text-lg">Conversation</h3>
            {transcript.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                Conversation will appear here...
              </p>
            ) : (
              <div className="space-y-4">
                {transcript.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-100'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VapiWidget;
