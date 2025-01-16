const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
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
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  isProfileCompleted: { type: Boolean, default: false },
  isDocumentVerified: { type: Boolean, default: false },
});
const servicesSchema = new mongoose.Schema({});
const parentsSchema = new mongoose.Schema({});
const serviceBookingsSchema = new mongoose.Schema(
  {
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "children",
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
    status: {
      type: String,
      enum: ["On Going", "Completed", "Cancelled"],
      required: false,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Providers = mongoose.model("providers", providerSchema);

const Services = mongoose.model("services", servicesSchema);
const Parents = mongoose.model("parents", parentsSchema);
const Bookings = mongoose.model("servicebookings", serviceBookingsSchema);

module.exports = {
  Providers,
  Services,
  Bookings,
  Parents,
};
