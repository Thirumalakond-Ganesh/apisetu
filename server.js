const express=require('express');
require("dotenv").config({path: "config/config.env"});
const bodyParser = require('body-parser');
const cors =require("cors")
const app=express();

app.use(cors(corsOptions));
const corsOptions={
    origin:'http://localhost:3000',
    optionsSuccessStatus:200
};

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1',require("./routes/token"))
app.use('/api/v1',require("./routes/pan"))



app.listen(process.env.PORT,()=>{
    console.log(`App is running on PORT ${process.env.PORT}`);
})



