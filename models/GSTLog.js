const mongoose = require("mongoose");

const gstLogSchema = new mongoose.Schema({
  gstin: { type: String, required: true },
  gstStatus: { type: Boolean, required: true },
  isValid: { type: Boolean, required: true }, 
  responseData: { type: mongoose.Schema.Types.Mixed, required: true },
  logTime: { type: Date, default: Date.now }, 
  ipAddress: { type: String, required: true },
});

module.exports = mongoose.model("GSTVerificationLog", gstLogSchema);
