import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "react-hot-toast";

const StartInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCalling, setIsCalling] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const vapiRef = useRef(null);

  // Initialize Vapi and validate environment
  useEffect(() => {
    const apiKey = import.meta.env.VAPI_PUBLIC_KEY;
    
    if (!apiKey) {
      setError("VAPI API key is not configured. Please check your environment variables.");
      toast.error("Configuration error: Missing VAPI API key");
      return;
    }

    if (!id) {
      setError("Invalid interview session ID");
      toast.error("Invalid interview session");
      navigate("/mock-interview");
      return;
    }

    try {
      vapiRef.current = new Vapi(apiKey);
      
      // Attach Vapi listeners for real-time transcript
      vapiRef.current.on("message", (msg) => {
        setMessages((prev) => [
          ...prev,
          {
            role: msg.role === "assistant" ? "interviewer" : "candidate",
            text: msg.text,
          },
        ]);
      });

      vapiRef.current.on("call-end", () => {
        setIsCalling(false);
        toast.success("Interview session ended");
      });

      vapiRef.current.on("error", (error) => {
        console.error("Vapi error:", error);
        setError("Connection error occurred");
        setIsCalling(false);
        toast.error("Connection error occurred");
      });

    } catch (err) {
      console.error("Failed to initialize Vapi:", err);
      setError("Failed to initialize voice assistant");
      toast.error("Failed to initialize voice assistant");
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.removeAllListeners("message");
        vapiRef.current.removeAllListeners("call-end");
        vapiRef.current.removeAllListeners("error");
      }
    };
  }, [id, navigate]);

  const handleStartCall = async () => {
    if (!vapiRef.current) {
      toast.error("Voice assistant not initialized");
      return;
    }

    try {
      setIsCalling(true);
      setError(null);

      // Start conversation with assistant ID
      await vapiRef.current.startConversation(id);
      toast.success("Interview call started successfully!");

    } catch (error) {
      console.error("❌ Error starting call:", error);
      setError("Failed to start interview call");
      setIsCalling(false);
      toast.error("Failed to start interview call. Please try again.");
    }
  };

  const handleEndCall = async () => {
    if (vapiRef.current && isCalling) {
      try {
        await vapiRef.current.stop();
        setIsCalling(false);
        toast.success("Interview call ended");
      } catch (error) {
        console.error("Error ending call:", error);
        toast.error("Error ending call");
      }
    }
  };

  // Show error state if there's an error
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 text-red-400">Error</h1>
          <p className="mb-8 text-zinc-400">{error}</p>
          <Button
            onClick={() => navigate("/mock-interview")}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 
                       hover:from-yellow-600 hover:to-yellow-700 
                       text-black font-semibold h-12 px-8 rounded-xl shadow-lg 
                       hover:shadow-yellow-500/30 transition-all"
          >
            Back to Interview Setup
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        Mock Interview Session
      </h1>
      <p className="mb-8 text-zinc-400">Assistant ID: {id}</p>

      <div className="flex gap-4 mb-8">
        <Button
          onClick={handleStartCall}
          disabled={isCalling || !vapiRef.current}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 
                     hover:from-yellow-600 hover:to-yellow-700 
                     text-black font-semibold h-12 px-8 rounded-xl shadow-lg 
                     hover:shadow-yellow-500/30 transition-all"
        >
          {isCalling ? "Connecting..." : "Start Interview Call"}
        </Button>
        
        {isCalling && (
          <Button
            onClick={handleEndCall}
            className="bg-gradient-to-r from-red-500 to-red-600 
                       hover:from-red-600 hover:to-red-700 
                       text-white font-semibold h-12 px-8 rounded-xl shadow-lg 
                       hover:shadow-red-500/30 transition-all"
          >
            End Call
          </Button>
        )}
      </div>

      {/* Transcript Section */}
      <div className="mt-10 w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-96 overflow-y-auto shadow-inner">
        <h2 className="text-lg font-semibold mb-4 text-yellow-400">Live Transcript</h2>
        <div className="space-y-3">
          {messages.length === 0 && (
            <p className="text-zinc-500">No messages yet...</p>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.role === "interviewer"
                  ? "bg-yellow-600/20 text-yellow-400 self-start"
                  : "bg-zinc-800 text-zinc-200 self-end ml-auto"
              }`}
            >
              <span className="block text-sm font-bold mb-1 capitalize">
                {msg.role}
              </span>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
