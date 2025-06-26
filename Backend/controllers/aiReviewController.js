// controllers/codeController.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export async function askGeminiAI(req, res) {
  const { sourceCode, language } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a code reviewer. Analyze the following ${language} code. Find bugs, logical issues, and suggest improvements:\n\n${sourceCode}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let feedback = response.text();
    // Clean feedback: remove *, //, and other unnecessary symbols
    feedback = feedback.replace(/[\*\/]/g, '').replace(/\n{2,}/g, '\n').trim();
    res.json({ feedback });
  } catch (error) {
    console.error("Gemini AI error:", error);
    res.status(500).json({ error: "Gemini AI failed to analyze code." });
  }
}
