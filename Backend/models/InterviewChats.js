// create a schema to store interview chats
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
      sender: {
        type: String, // "user" | "ai"
        enum: ["user", "ai"],
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
    { _id: false } // extra _id na bane har message ke liye
  );
  
  const interviewSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // link with User table
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      chats: {
        type: [messageSchema], // array of objects
        default: [],
      },
    },
    { timestamps: true }
  );
  
  const Interview =
    mongoose.models.Interview || mongoose.model("Interview", interviewSchema);
  
  export default Interview;
  