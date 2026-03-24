const express = require("express");
const router = express.Router();
const multer = require("multer");
const LandVerification = require("../models/LandVerification");

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST API
router.post(
  "/land-verification",
  upload.single("image"),
  async (req, res) => {
    try {
      const { polygon, note, customerId } = req.body;

      const coordinates = JSON.parse(polygon);

      const newVerification = new LandVerification({
        customerId,
        location: {
          type: "Polygon",
          coordinates,
        },
        note,
        image: req.file ? req.file.filename : null,
      });

      await newVerification.save();

      res.status(201).json({
        success: true,
        message: "Land boundary saved successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }
);

module.exports = router;