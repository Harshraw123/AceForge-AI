import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    // For session questions
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: false,
    },
    // For quiz questions (renamed to quizQuestions)
    quizQuestions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: false,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      validate: {
        validator: function (arr) {
          // If this is a quiz question, options must be present and length 4
          if (this.quizQuestions) {
            return Array.isArray(arr) && arr.length === 4;
          }
          // If this is a session question, options can be undefined or empty
          return true;
        },
        message: 'Quiz questions must have exactly 4 options',
      },
      required: false, // Only required for quiz questions
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;