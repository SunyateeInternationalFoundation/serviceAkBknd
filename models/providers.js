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
const ChildSchema = new mongoose.Schema({});

const Providers = mongoose.model("providers", providerSchema);
const Child = mongoose.model("childrens", ChildSchema);
const Services = mongoose.model("services", servicesSchema);
const Parents = mongoose.model("parents", parentsSchema);

module.exports = {
  Providers,
  Services,

  Parents,
  Child,
};
