const jwt = require("jsonwebtoken");
const panData = require("../panData.json");

exports.cibilVerify = async (req, res) => {
  try {
    const { service, itemId, task, essentials } = req.body;

    if (!service || !itemId || task !== "verification" || !essentials) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request body" });
    }

    const itemIdVerify = jwt.verify(itemId, process.env.JWT_SECRET);
    if (itemIdVerify.fldID === "95605") {
      const { pan } = essentials;
      console.log("PAN from request:", pan); 

      const isValidPAN = (pan) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
        const isValid = panRegex.test(pan);
        console.log("PAN Regex check:", isValid); 
        return isValid;
      };

      if (!isValidPAN(pan)) {
        console.log("PAN validation failed.");
        return res.status(400).json({ error: "Invalid PAN format" });
      }

      // Access the relevant data from the JSON
      const applicantDetails = panData.processReturn.INProfileResponse.Current_Application.Current_Application_Details.Current_Applicant_Details;
      const creditAccountSummary = panData.processReturn.INProfileResponse.CAIS_Account.CAIS_Summary.Credit_Account;

      if (applicantDetails.IncomeTaxPan === pan.toUpperCase()) {
        console.log("PAN details found:", applicantDetails);
        // Return the BureauScore, CreditAccountActive, and CreditAccountTotal
        return res.status(200).json({
          bureauScore: applicantDetails.SCORE.BureauScore,
          creditAccountActive: creditAccountSummary.CreditAccountActive,
          creditAccountTotal: creditAccountSummary.CreditAccountTotal
        });
      } else {
        const failedResponse = {
          data: {
            client_id: "cibil_validation_jUjwaGIvzojpzjfGHPfz",
            pan_number: pan,
            is_valid: false,
            remarks: "PAN not found",
            less_info: false,
          },
          status_code: 404,
          success: false,
          message: "PAN not found",
          message_code: "pan_not_found",
        };

        console.log("PAN not found.");
        return res.status(404).json(failedResponse);
      }
    } else {
      return res.status(500).json({ error: "Not Valid details" });
    }
  } catch (error) {
    console.error("Error in cibilVerify:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
