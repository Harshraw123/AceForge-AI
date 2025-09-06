import mongoose from "mongoose";

const DsaSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    solved: {
      type: [String], // array of question IDs like ["two-sum", "longest-substring"]
      required: true,
      default: [],
    },
    attemptCount: {
      type: Number,
      required: true,
      default: 0,
    },
    solvedCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const DsaTableData = mongoose.model("DsaTableData", DsaSessionSchema);
export default DsaTableData;
