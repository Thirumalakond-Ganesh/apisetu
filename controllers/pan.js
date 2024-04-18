const jwt = require("jsonwebtoken");
const { itemId } = require("./itemId");
const JWT_SECRET_ITEM = "secretItemId";
const jwt = require("jsonwebtoken");
const field = [
  { pan: "95601", aadhaar: "95602", gst: "95603", voterId: "95604" },
];

exports.panverify = async (req, res) => {
  try {
    const { service, itemId, task, essentials } = req.body;

    if (!service || !itemId || task != "verification" || !essentials) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request body" });
    }

    const { name, number, fuzzy, panStatus } = essentials;

    const itemIdVerify = jwt.verify(
      token,
      process.env.JWT_SECRET_ITEM,
      (err, decoded) => {
        if (err) {
          console.error("JWT verification failed:", err.message);
          return;
        } else return decoded;
      }
    );
    if (itemId === field[0].pan) {
      // Return Yes or No
      //using Data from database matching panNumber to Name
    } else {
      res.staus(400).json({ success: false, message: "Invalid details" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.panDOB = async (req, res) => {
  try {
    const { service, itemId, task, essentials } = req.body;

    if (!service || !itemId || task != "checkDOB" || !essentials) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request body" });
    }

    const { DOB, number, fuzzy, panStatus } = essentials;

    const itemIdVerify = jwt.verify(
      token,
      process.env.JWT_SECRET_ITEM,
      (err, decoded) => {
        if (err) {
          console.error("JWT verification failed:", err.message);
          return;
        } else return decoded;
      }
    );
    if (itemId === field[0].pan) {
      // Return Yes or No
      //using Data from database matching panNumber to DateOfBirth
    } else {
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

    const { name, number, fuzzy, panStatus } = essentials;

    const itemIdVerify = jwt.verify(
      token,
      process.env.JWT_SECRET_ITEM,
      (err, decoded) => {
        if (err) {
          console.error("JWT verification failed:", err.message);
          return;
        } else return decoded;
      }
    );
    if (itemId === field[0].pan) {
      // Return Yes or No
      //using Data from database matching panNumber to Name
    } else {
      res.staus(400).json({ success: false, message: "Invalid details" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
