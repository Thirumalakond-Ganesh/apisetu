const jwt = require("jsonwebtoken");
const data = require("../DataGSTN.json");
const GSTVerificationLog = require("../models/gstinVerifiaction"); 

exports.gstnverify = async (req, res) => {
  try {
    const { service, itemId, task, essentials } = req.body;

    if (!service || !itemId || task !== "verification" || !essentials) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request body" });
    }

    const itemIdVerify = jwt.verify(itemId, process.env.JWT_SECRET);
    if (itemIdVerify.fldID === "95603") {
      const { gstin, gstStatus } = essentials;
      console.log("GSTIN from request:", gstin); 
      console.log("GST Status from request:", gstStatus); 

      const isValidGSTIN = (gstin) => {
        const gstinRegex =
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/i;
        const isValid = gstinRegex.test(gstin);
        console.log("GSTIN Regex check:", isValid); 
        return isValid;
      };

      if (!isValidGSTIN(gstin)) {
        console.log("GSTIN validation failed.");
        await GSTVerificationLog.create({
          gstin,
          gstStatus,
          isValid: false,
          responseData: { error: "Invalid GSTIN format" },
          ipAddress: req.ip,
        });
        return res.status(400).json({ error: "Invalid GSTIN format" });
      }

      if (typeof gstStatus !== "boolean") {
        console.log("Invalid gstStatus. Expected boolean.");
        await GSTVerificationLog.create({
          gstin,
          gstStatus,
          isValid: false,
          responseData: { error: "Invalid gstStatus" },
          ipAddress: req.ip,
        });
        return res.status(400).json({ error: "Invalid gstStatus" });
      }

      const gstD = data.GSTData;
      const gstFinder = gstD.find((g) => g.data.GSTIN === gstin);

      if (gstFinder) {
        console.log(gstFinder);
        await GSTVerificationLog.create({
          gstin,
          gstStatus,
          isValid: true,
          responseData: gstFinder,
          ipAddress: req.ip,
        });
        return res.status(201).json(gstFinder);
      } else {
        const failedResponse = {
          data: {
            client_id: "gst_validation_jUjwaGIvzojpzjfGHPfz",
            gst_number: gstin,
            state: null,
            is_valid: false,
            remarks: "invalid_gstin_format",
            less_info: false,
          },
          status_code: 422,
          success: false,
          message: "Verification Failed.",
          message_code: "verification_failed",
        };

        await GSTVerificationLog.create({
          gstin,
          gstStatus,
          isValid: false,
          responseData: failedResponse,
          ipAddress: req.ip,
        });

        return res.status(422).json(failedResponse);
      }
    } else {
      return res.status(500).json({ error: "Not Valid details" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
