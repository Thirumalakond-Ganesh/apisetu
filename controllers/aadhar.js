const jwt = require('jsonwebtoken');
const data = require('../DataAadhaar.json');


exports.aadharverify = async (req, res) => {
  try {
    const { service, itemId, task, essentials } = req.body;

    if (!service || !itemId || task !== "verification" || !essentials) {
      return res.status(400).json({ error: "Missing required fields in the request body" });
    }

    const itemIdVerify = jwt.verify(itemId, process.env.JWT_SECRET);
    if (itemIdVerify.fldID === '95602') {

      const { number, fuzzy, aadharStatus } = essentials;
      console.log("true fldID");

      const isValidAadhar = (aadhar) => {
        const aadharRegex = /^\d{12}$/;
        if (!aadharRegex.test(aadhar)) {
          return false;
        }
        return true;    
      }
      
      if (!isValidAadhar(number) || !fuzzy || !aadharStatus) {
        console.log(number);
        return res.status(400).json({ error: "Missing personal verification fields in the request body" });
      } else {

        // Example API call to validate Aadhaar
        // const response = await axios.post('https://sandbox.surepass.io/api/v1/aadhaar/verify', {
        //   id_number: number
        // }, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json',
        //     'Authorization': `Bearer ${process.env.SUREPASS_TOKEN}`
        //   }
        // });
        // console.log(response.data);
        // return res.status(201).json({ data: response.data });

        const aadharD = data.AadhaarData;
        const aadharFinder = aadharD.find(a => a.data.aadhaar_number === number);
        if(aadharFinder){
          console.log(aadharFinder);
          return res.status(201).json(aadharFinder);
        }
        else{
          return res.status(422).json({
            data: {
                client_id: "aadhaar_validation_jUjwaGIvzojpzjfGHPfz",
                age_range: null,
                aadhaar_number: number,
                state: null,
                gender: null,
                last_digits: null,
                is_mobile: null,
                remarks: "invalid_aadhaar_format",
                less_info: false
            },
            status_code: 422,
            success: false,
            message: "Verification Failed.",
            message_code: "verification_failed"
          });
        }
     
      }
    } else {
      return res.status(500).json({ error: "Not Valid details" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
