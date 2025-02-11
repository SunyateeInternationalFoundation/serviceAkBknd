const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    about: { type: String, required: true },
    price: { type: Number, required: true },
    sessions: { type: Number, required: true },
    sessionType: { type: String, required: true },
    locations: { type: [String] },
    image: { type: String },
  },
  { timestamps: true }
);

const Service = mongoose.model("services", serviceSchema);

module.exports = Service;
