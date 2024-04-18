const express=require("express");
const { panverify, pandetails } = require("../controllers/pan");

const router=express.Router();


router.route("/pan/panverification").post(panverify);
router.route("/pan/verifydob").post(panDOB);
router.route("/pan/pandetail").post(pandetails);

module.exports=router;