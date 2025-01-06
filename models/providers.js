const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    serviceName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
}); 

const Provider = mongoose.model("providers", providerSchema);

module.exports = Provider;