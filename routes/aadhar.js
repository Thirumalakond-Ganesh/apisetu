const express=require("express");
const { aadharverify} = require("../controllers/aadhar");

const router=express.Router();


router.route("/aadhar/aadharverification").post(aadharverify);
// router.route("/aadhar/verifydob").post(panDOB);
// router.route("/aadhar/aadhardetails").post(pandetails);

module.exports=router;