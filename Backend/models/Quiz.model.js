import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(

    {
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        topicsToFocus: {
            type: String,
            required: true,
        },

        questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
        }],
            
    },
    {timestamps: true} )




  const Quiz = mongoose.model("Quiz", QuizSchema);
  export default Quiz;
