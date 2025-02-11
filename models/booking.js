const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  sessionNumber: { type: Number, required: true },
  date: { type: Date },
  time: { type: String },
  status: {
    type: String,
    enum: ["completed", "ongoing", "upcoming", "cancelled"],
  },
  assignment: { type: String, default: "" },
  feedback: { type: String, default: "" },
  videoUrl: { type: String, default: "" },
  completed: { type: Boolean, default: false },
});

const serviceBookingsSchema = new mongoose.Schema(
  {
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "childrens",
      required: false,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "providers",
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "parents",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
      required: false,
    },

    accepted: {
      type: Boolean,
      default: false,
    },
    sessions: { type: [SessionSchema], default: [] },
    completed: {
      type: Boolean,
      default: false,
    },
    feedback: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "On Going",
    },
  },
  { timestamps: true }
);
const ServiceBooking = mongoose.model("servicebookings", serviceBookingsSchema);

module.exports = ServiceBooking;
