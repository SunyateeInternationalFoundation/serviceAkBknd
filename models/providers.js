const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  name: { type: String,  },
  phone: { type: String,  },
  email: { type: String, required: true, unique: true},
  serviceName: { type: String,},
  address: { type: String, },
  city: { type: String,},
  pincode: { type: String},
  password: { type: String },
});

const Provider = mongoose.model("providers", providerSchema);

module.exports = Provider;
