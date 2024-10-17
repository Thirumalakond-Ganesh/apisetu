const express=require("express");
const { cibilVerify } = require("../controllers/cibil");

const router=express.Router();


router.route("/cibil").post(cibilVerify);


module.exports=router;