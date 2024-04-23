const { itemId } = require("./itemId");
const jwt = require("jsonwebtoken");
const fields =[{pan:"95601"},{aadhaar:"95602"},{gst:"95603"},{voterId:"95604"}];


exports.panverify = async (req, res) => {
  try {
    const { service, itemId, task, essentials } = req.body;

    if (!service || !itemId || task != "verification" || !essentials) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request body" });
    }

    const itemIdVerify = jwt.verify(itemId, process.env.JWT_SECRET)
      if(itemIdVerify.fldID ==='95601'){

        const { name, pan, fuzzy, panStatus } = essentials;
        
        const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
        
        if (!name || !fuzzy || !panStatus || !isValidPAN(pan)) {
          return res.status(400).json({
            error: "Missing personal verification fields in the request body"
          });
        }

        return 
          // Return Yes or No
          //using Data from database matching panNumber to Name
        
       }else {
          // res.staus(400).json({ success: false, message: "Invalid details" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};









exports.panDOB = async (req, res) => {
    try {
    const { service, itemId, task, essentials } = req.body;

    if (!service || !itemId || task != "verification" || !essentials) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request body" });
    }

    const itemIdVerify = jwt.verify(itemId, process.env.JWT_SECRET)
      if(itemIdVerify.fldID ==='95601'){
            
        const { name,DOB, pan, fuzzy, panStatus } = essentials;
        
        const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
        
        if (!name ||!DOB ||!fuzzy || !panStatus || !isValidPAN(pan)) {
          return res.status(400).json({
            error: "Missing personal verification fields in the request body"
          });
        }

        return 
          // Return Yes or No
          //using Data from database matching panNumber to Name
        
       }else {
          res.staus(400).json({ success: false, message: "Invalid details" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.pandetails = async (req, res) => {
  try {
    const { service, itemId, task, essentials } = req.body;

    if (!service || !itemId || task != "verification" || !essentials) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request body" });
    }

    const itemIdVerify = jwt.verify(itemId, process.env.JWT_SECRET)
      if(itemIdVerify.fldID ==='95601'){
            
        const { pan, fuzzy, panStatus } = essentials;
        
        const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
        
        if ( !fuzzy || !panStatus || !isValidPAN(pan)) {
          return res.status(400).json({
            error: "Missing personal verification fields in the request body"
          });
        }

        return 
          // Return details of PanCard
          //using Data from database matching panNumber to Name
        
       }else {
          res.staus(400).json({ success: false, message: "Invalid details" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};