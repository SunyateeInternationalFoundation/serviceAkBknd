const mongoose = require("mongoose");

const serviceBooking = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    serviceName: { type: String },
    address: { type: String },
    state: { type: String },
    languages: { type: [String] },
    bio: { type: String },
    dob: { type: String },
    country: { type: String },
    gender: { type: String },
    city: { type: String },
    pincode: { type: String },
    password: { type: String },
    userName: { type: String },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "services" }],
  },
  { timestamps: true }
);

const Providers = mongoose.model("providers", serviceBooking);

const Services = mongoose.model("services", servicesSchema);
module.exports = {
  Providers,
  Services,
};
