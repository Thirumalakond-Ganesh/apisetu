const express=require('express');
require("dotenv").config({path: "config/config.env"});
const bodyParser = require('body-parser');

const app=express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1',require("./routes/token"))
app.use('/api/v1',require("./routes/pan"))



app.listen(process.env.PORT,()=>{
    console.log(`App is running on PORT ${process.env.PORT}`);
})



