const Therapy = require("../models/booking");

const getTherapy = async (req, res) => {
  try {
    const therapyId = req.params.id;

    const therapy = await Therapy.findById(therapyId).populate("serviceId");

    if (!therapy) {
      return res.status(404).json({ message: "Therapy not found" });
    }

    return res.status(201).json({ success: true, data: therapy });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { assignment, feedback, videoUrl } = req.body;

    const therapy = await Therapy.create({
      "sessions.sessionNumber": sessionId,
    });

    if (!therapy) {
      return res.status(404).json({ message: "Session not found" });
    }

    const session = therapy.sessions.id(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found in therapy" });
    }

    if (assignment !== undefined) session.feedback.assignment = assignment;
    if (feedback !== undefined) session.feedback.therapyFeedback = feedback;
    if (videoUrl !== undefined) session.videoUrl = videoUrl;

    await therapy.save();
    res.json({ message: "Session updated successfully", session });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const markSessionCompleted = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const therapy = await Therapy.findOne({ "sessions._id": sessionId });

    if (!therapy) {
      return res.status(404).json({ message: "Session not found" });
    }

    const session = therapy.sessions.id(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found in therapy" });
    }

    session.status = "completed";

    await therapy.save();
    res.json({ message: "Session marked as completed", session });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getTherapy,
  updateSession,
  markSessionCompleted,
};
