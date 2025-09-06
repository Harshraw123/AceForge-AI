import DsaTableData from "../models/DsaQuestion.js";
// Update or create session
export async function updateDsaSchema(req, res) {
  try {
    const userId = req.user._id;
    const { questionId, attemptCount, solvedCount } = req.body;

    // find the user’s DsaSession or create one if it doesn’t exist
    let session = await DsaTableData.findOne({ user: userId });

    if (!session) {
      session = new DsaTableData({
        user: userId,
        solved: [],
        attemptCount: 0,
        solvedCount: 0,
      });
    }

    // ✅ increment attempt count if provided
    if (attemptCount !== undefined) {
      session.attemptCount += attemptCount;
    }

    // ✅ increment solved count & add questionId if solved
    if (solvedCount !== undefined && solvedCount > 0 && questionId) {
      if (!session.solved.includes(questionId)) {
        session.solved.push(questionId); // add solved question
      }
      session.solvedCount += solvedCount;
    }

    await session.save();
    return res.status(200).json({ success: true, data: session });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// Fetch data for logged-in user
export async function fetchDataFromDsaSchema(req, res) {
  try {
    const userId = req.user._id;

    const session = await DsaTableData.findOne({ user: userId });

    if (!session) {
      return res.status(404).json({ success: false, message: "No session found" });
    }

    return res.status(200).json({ success: true, data: session });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
