import Question from "../models/Question.model.js";
import Session from  "../models/Session.model.js";

export const addQuestionToSession = async (req, res) => {
    try {
      const { sessionId, questions } = req.body;
  
      // Validation
      if (!sessionId || !Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: "Invalid input data" });
      }
  
      // Check if session exists
      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
  
      // Prepare question documents
      const questionDocs = questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }));
  
      // Insert questions into DB
      const createdQuestions = await Question.insertMany(questionDocs);
      
      // Update session with new questions
      session.questions.push(...createdQuestions);
      await session.save();
  
      return res.status(201).json({
        message: "Questions added successfully",
        data: createdQuestions,
      });
  
    } catch (error) {
      console.error("Error adding questions:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
export const togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    // Toggle pin
    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({
      success: true,
      message: `Question ${question.isPinned ? 'pinned' : 'unpinned'} successfully`,
      question,
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not Found"
      });
    }

    question.note = note || "";
    await question.save();

    res.status(200).json({
      success: true,
      message: "Question note updated successfully",
      question
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};