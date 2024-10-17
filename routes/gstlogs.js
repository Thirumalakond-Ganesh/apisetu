const express = require('express');
const router = express.Router();
const GSTVerificationLog = require('../models/gstinVerifiaction'); 
const panData = require("../panData.json");

router.get('/gstlogs', async (req, res) => {
  try {
    const gstLogs = await GSTVerificationLog.find().sort({ logTime: -1 });
    res.status(200).json(gstLogs);  
  } catch (error) {
    console.error("Error fetching GST logs:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;


// router.post("/cibil", (req, res) => {
//     const { pan } = req.body;
  
//     if (!pan) {
//       return res.status(400).json({ message: "PAN is required" });
//     }
  
//     const panInfo = panData.find((entry) => entry.pan === pan.toUpperCase());
  
//     if (!panInfo) {
//       return res.status(404).json({ message: "PAN not found" });
//     }
  
//     res.json({
//       cibilScore: panInfo.cibilScore,
//       latePayments: panInfo.latePayments,
//       creditCards: panInfo.creditCards,
//     });
//   });
