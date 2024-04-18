const express=require("express");
const { generateToken } = require("../controllers/auth");
const { itemId } = require("../controllers/itemId");
const router=express.Router();


router.route("/token").post(generateToken);
router.route("/token/verifyItemId").post(itemId);
module.exports=router;