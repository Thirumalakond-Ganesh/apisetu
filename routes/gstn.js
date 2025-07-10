const express=require("express");
const { gstnverify, GSTData } = require("../controllers/gstn");

const router=express.Router();


router.route("/gstn/gstnverification").post(gstnverify);
router.route("/gstn-data").get(GSTData);


module.exports=router;