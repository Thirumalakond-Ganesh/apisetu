const mongoose = require('mongoose');

const gstVerificationSchema = new mongoose.Schema({
  gstin: { type: String, required: true },
  gstStatus: { type: Boolean, required: true },
  isValid: { type: Boolean, required: true },
  responseData: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
  logTime: { type: Date, default: Date.now },
  ipAddress: { type: String, required: true }, 
});

const GSTVerificationLog = mongoose.model('GSTVerificationLog', gstVerificationSchema);

module.exports = GSTVerificationLog;
