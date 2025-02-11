const ServiceBooking = require("../models/booking");

const getTherapy = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await ServiceBooking.findById(id).populate("serviceId");

    return res.status(201).json({ success: true, data: session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.body", req.body);
    const { updatedSessions, completed } = req.body;

    const updateData = { sessions: updatedSessions };
    if (completed === true) {
      updateData.completed = true;
      updateData.status = "Completed";
    }

    const session = await ServiceBooking.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    console.log("session", session);
    if (!session) {
      return res.status(404).json({ message: "Session not updated" });
    }

    res.json({
      message: "Session updated successfully",
      session,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const markSessionCompleted = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const therapy = await ServiceBooking.findOne({ "sessions._id": sessionId });

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
