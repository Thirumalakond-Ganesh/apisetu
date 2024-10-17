const express=require("express");
const { gstnverify } = require("../controllers/gstn");

const router=express.Router();


router.route("/gstn/gstnverification").post(gstnverify);


module.exports=router;