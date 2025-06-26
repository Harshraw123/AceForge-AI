import { GoogleGenAI } from "@google/genai";
import { GenerateQuizPrompt } from "../utils/prompt.util.js";
import Quiz from "../models/Quiz.model.js";
import Question from "../models/Question.model.js";

// Initialize the AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Create a new quiz session by generating questions from AI
export const createQuizSession = async (req, res) => {
  try {
    // 1. Get user inputs from the request
    const { role, experience, topicsToFocus } = req.body;
    const userId = req.user._id;

    if (!role || !experience || !topicsToFocus) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // 2. Generate quiz questions using the AI
    const prompt = GenerateQuizPrompt({ role, experience, topicsToFocus });
    const result = await ai.models.generateContent({ 
        model: "gemini-2.5-flash", 
        contents: prompt 
    });
    const response = result.text || "";


    // Clean and parse the AI response
    const cleanedText = response
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
    const questions = JSON.parse(cleanedText);

    // 3. Create the Quiz document in the database
    const quiz = await Quiz.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
    });

    // 4. Create a Question document for each question from the AI
    const questionDocs = await Promise.all(
      questions.filter(q => q.question && q.options && q.options.length === 4 && q.answer).map(async (q) => {
        const question = await Question.create({
          quizQuestions: quiz._id, // Reference the parent quiz
          question: q.question,
          options: q.options,
          answer: q.answer,
        });
        return question._id;
      })
    );

    // 5. Link the questions to the quiz
    quiz.questions = questionDocs;
    await quiz.save();

    // 6. Send the new quiz ID to the frontend
    res.status(201).json({ success: true, quizId: quiz._id });

  } catch (error) {
    console.error("Error creating quiz session:", error);
    if (error.message.includes('503') || error.status === 503) {
      return res.status(503).json({ success: false, error: "The AI service is currently overloaded. Please try again later." });
    }
    res.status(500).json({ success: false, error: "An unexpected error occurred while generating the quiz." });
  }
};

// Fetch quiz by ID, including questions and options
export const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    // Populate questions where quizQuestions matches this quiz
    const quiz = await Quiz.findById(quizId).populate({
      path: 'questions',
      match: { quizQuestions: quizId },
    });
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    res.json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Submit answers and return result
export const submitQuizAnswers = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // { questionId: selectedOption, ... }
    // Populate questions where quizQuestions matches this quiz
    const quiz = await Quiz.findById(quizId).populate({
      path: 'questions',
      match: { quizQuestions: quizId },
    });
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    let correct = 0;
    const total = quiz.questions.length;
    const results = [];

    quiz.questions.forEach((q) => {
      const userAnswer = answers[q._id];
      const isCorrect = userAnswer === q.answer;
      if (isCorrect) correct++;
      results.push({
        questionId: q._id,
        question: q.question,
        options: q.options,
        correctAnswer: q.answer,
        userAnswer,
        isCorrect,
      });
    });

    res.json({ success: true, correct, total, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};