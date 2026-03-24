const express=require('express');
require("dotenv").config({path: "config/config.env"});
const bodyParser = require('body-parser');
const cors =require("cors")
const app=express();
const landVerificationRoutes = require("./routes/landVerification");

require("./db/connection")

// app.use(cors(corsOptions));
app.use(cors());

const corsOptions={
    origin:'http://localhost:3001',
    optionsSuccessStatus:200
};

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use("/api", landVerificationRoutes);
app.use("/uploads", express.static("uploads"));
app.use('/api/v1',require("./routes/token"))
app.use('/api/v1',require("./routes/pan"))
app.use('/api/v1',require("./routes/aadhar"))
app.use('/api/v1',require("./routes/voterId"))
app.use('/api/v1',require("./routes/gstn"))
app.use('/api/v1',require("./routes/gstlogs"))
app.use('/api/v1',require("./routes/cibil"))



app.listen(process.env.PORT,()=>{
    console.log(`App is running on PORT ${process.env.PORT}`);
})



