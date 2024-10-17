const mongoose=require("mongoose");

mongoose.set("strictQuery", false);


mongoose.connect('mongodb://localhost:27017/userfilevalidation').then(()=>
    console.log("DataBase Connected Successfully...")).catch((err)=>console.log("errr",err))