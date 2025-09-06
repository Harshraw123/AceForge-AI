import { GoogleGenAI } from "@google/genai";
import { questionAnswerPrompt, conceptExplainPrompt } from "../utils/prompt.util.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is not set. Please set it in your .env file.");
}

// --- Helper for AI calls ---
async function askAI(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text || "";
}

// --- Routes ---
export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt({ role, experience, topicsToFocus, description, numberOfQuestions });
    const rawText = await askAI(prompt);

    try {
      const parsed = JSON.parse(rawText); // ✅ works directly on your sample
      return res.status(200).json(parsed);
    } catch {
      // fallback if AI ever sends non-JSON
      return res.status(200).json({ raw: rawText });
    }
  } catch (err) {
    console.error("❌ Error generating questions:", err.message);
    res.status(500).json({ message: "Something went wrong.", error: err.message });
  }
};

export const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: "Question is required" });

    const prompt = conceptExplainPrompt(question);
    const rawText = await askAI(prompt);

    try {
      const parsed = JSON.parse(rawText);
      return res.status(200).json(parsed);
    } catch {
      return res.status(200).json({
        title: question,
        explanation: rawText.trim(),
      });
    }
  } catch (err) {
    console.error("❌ Error generating explanation:", err.message);
    res.status(500).json({ message: "Failed to generate explanation", error: err.message });
  }
};
