const mongoose = require("mongoose");

const landVerificationSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: false, // change to true if linking with customer
    },

location: {
  type: {
    type: String,
    enum: ["Point", "Polygon"],
    required: true,
  },
  coordinates: {
    type: Array,
    required: true,
  },
},

    note: {
      type: String,
    },

    image: {
      type: String, // stored file name
    },

    verifiedBy: {
      type: String, // officer name (optional)
    },
  },
  { timestamps: true }
);

landVerificationSchema.index({ location: "2dsphere" });

module.exports = mongoose.model(
  "LandVerification",
  landVerificationSchema
);