const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
});

const Admins = mongoose.model("admins", adminSchema);

module.exports = Admins;
