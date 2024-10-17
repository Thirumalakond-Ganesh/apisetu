const express=require('express');
require("dotenv").config({path: "config/config.env"});
const bodyParser = require('body-parser');
const cors =require("cors")
const app=express();

require("./db/connection")

// app.use(cors(corsOptions));
app.use(cors());

const corsOptions={
    origin:'http://localhost:3000',
    optionsSuccessStatus:200
};

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

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



