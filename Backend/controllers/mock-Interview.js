import { VapiClient } from '@vapi-ai/server-sdk';

// Initialize Vapi with server-side SDK
// Try public key first since private key is giving auth errors
const vapi = new VapiClient(process.env.VAPI_PUBLIC_KEY);

export const mockInterview = async (req, res) => {
    try {
      const { topic, experience, agentID, agentName } = req.body; 

      if (!topic || !experience || !agentID || !agentName) {
        return res.status(400).json({ success: false, error: "Missing required fields: topic, experience, agentID, agentName" });
      }

      if (!process.env.VAPI_PUBLIC_KEY) {
        return res.status(501).json({ success: false, error: "Vapi service is not configured" });
      }

      // Debug: Log key info (first 10 chars for security)
      console.log("VAPI_PUBLIC_KEY loaded:", process.env.VAPI_PUBLIC_KEY ? `${process.env.VAPI_PUBLIC_KEY.substring(0, 10)}...` : "NOT FOUND");
      console.log("Key length:", process.env.VAPI_PUBLIC_KEY ? process.env.VAPI_PUBLIC_KEY.length : 0);

      // Dynamic System Prompt
      const systemPrompt = `
        You are ${agentName}, a professional interviewer.
        Your job is to conduct a structured mock interview.
        The main topic is: ${topic}.
        The candidate has ${experience} experience.
        Ask realistic interview questions, give feedback, 
        and simulate a real professional interview setting.
      `;
  
      // Create assistant on Vapi
      const assistant = await vapi.assistants.create({
        name: `${agentName}-InterviewBot`,
        model: {
          provider: "openai",
          model: "gpt-4o-mini", // fast + cost effective
        },
        voice: {
          provider: "openai",
          voice: agentID,
        },
        firstMessage: `Hello, I am ${agentName}, and I will be interviewing you today about ${topic}. Let's get started!`,
        systemPrompt,
      });
  
      res.json({
        success: true,
        assistantId: assistant.id,
        assistant,
      });
    } catch (error) {
      console.error("Error creating assistant:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  };

// Test endpoint to verify API key
export const testVapiKey = async (req, res) => {
  try {
    if (!process.env.VAPI_PUBLIC_KEY) {
      return res.status(501).json({ success: false, error: "VAPI_PUBLIC_KEY not found in environment" });
    }

    // Test the key by making a simple API call
    const assistants = await vapi.assistants.list();
    
    res.json({
      success: true,
      message: "API key is valid",
      keyLength: process.env.VAPI_PUBLIC_KEY.length,
      keyPrefix: process.env.VAPI_PUBLIC_KEY.substring(0, 10) + "...",
      assistantsCount: assistants.length
    });
  } catch (error) {
    console.error("API key test failed:", error);
    res.status(401).json({ 
      success: false, 
      error: "API key test failed", 
      details: error.message,
      statusCode: error.statusCode || 500
    });
  }
};
  