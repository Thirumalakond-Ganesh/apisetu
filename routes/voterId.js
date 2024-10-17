const express=require("express");
const { voteridverify } = require("../controllers/voterid");

const router=express.Router();


router.route("/voterId/voterIdVerification").post(voteridverify);

module.exports=router;