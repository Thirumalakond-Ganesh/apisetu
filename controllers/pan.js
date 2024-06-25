// const { itemId } = require("./itemId");
const jwt = require("jsonwebtoken");
const axios=require("axios");
const fields =[{pan:"95601"},{aadhaar:"95602"},{gst:"95603"},{voterId:"95604"}];
const data = require('../DataPan.json');


exports.panverify = async (req, res) => {
  try {
    const { service, itemId, task, essentials } = req.body;

    if (!service || !itemId || task !== "verification" || !essentials) {
      return res.status(400).json({ error: "Missing required fields in the request body" });
    }

    const itemIdVerify = jwt.verify(itemId, process.env.JWT_SECRET);
    if (itemIdVerify.fldID === '95601') {
      const { pan, fuzzy, panStatus } = essentials;
      console.log("true fldID");
      const isValidPAN = (pan) => {
        // /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);

        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        if (!panRegex.test(pan)) {
          return false;
        }
        for (let i = 0; i < 3; i++) {
          const currentChar = pan.charCodeAt(i);
          const nextChar = pan.charCodeAt(i + 1);
          const nextNextChar = pan.charCodeAt(i + 2);
      
          if (nextChar === currentChar + 1 && nextNextChar === nextChar + 1) {
            return false;
          }
        }
        return true;    
    
    }
      
      if (!isValidPAN(pan) || !fuzzy || !panStatus) {
        console.log(pan);
        return res.status(400).json({ error: "Missing personal verification fields in the request body" });
      } else {
        // const response = await axios.post('https://sandbox.surepass.io/api/v1/pan/pan', {
        // const response = await axios.post('https://pandbox.purepass.io/api/v1/pan/pan', {
        //   id_number: pan 
        // }, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json',
        //     'Authorization': `Bearer ${process.env.SUREPASS_TOKEN}`
        //  
        // });
        // console.log(response.data);
        // return res.status(201).json({ data: response.data });


        const panD = data.panData;
        const panFinder = panD.find(p => p.data.pan_number === pan);
        if(panFinder){
          console.log(panFinder);
          return res.status(201).json(panFinder);
        }
        else{
          return res.status(422).json({
            data: {
                client_id: "pan_ochoZzshxfGtvHqNQcik",
                pan_number: pan,
                full_name: null,
                category: "person"
            },
            status_code: 422,
            success: false,
            message: "Invalid PAN",
            message_code: null
        });
        }
     
      }
    } else {
      return res.status(500).json({ error: "Not Valid details" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




// exports.panverify = async (req, res) => {
//   try {
//     const { service, itemId, task, essentials } = req.body;

//     if (!service || !itemId || task !== "verification" || !essentials) {
//       return res
//         .status(400)
//         .json({ error: "Missing required fields in the request body" });
//     }

//     const itemIdVerify = jwt.verify(itemId, process.env.JWT_SECRET);
//     if (itemIdVerify.fldID === '95601') {
//       const { pan, fuzzy, panStatus } = essentials;
//       console.log("true firldID")
//       const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
      
//       if (!isValidPAN(pan) || !fuzzy || !panStatus ) 
//       {
//         console.log(pan);
//         return res.status(400).json({
//           error: "Missing personal verification fields in the request body"
//         });
//       }
//       else{ 
//         console.log(pan);

//       const response = await axios.post('https://sandbox.surepass.io/api/v1/pan/pan', {
//         id_number: pan 
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMzk1MzQ4NiwianRpIjoiNjAwYzk1YzUtMjhkMi00OTBkLWIxOTMtNThkNGM4MzlkOGI5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2Lm5taXRAc3VyZXBhc3MuaW8iLCJuYmYiOjE3MTM5NTM0ODYsImV4cCI6MTcxNTI0OTQ4NiwiZW1haWwiOiJubWl0QHN1cmVwYXNzLmlvIiwidGVuYW50X2lkIjoibWFpbiIsInVzZXJfY2xhaW1zIjp7InNjb3BlcyI6WyJ1c2VyIl19fQ.bknLKmz5DrUGJ3ytg4GQl_X0wa9CZwRxxV36ZRYwaIQ'
//         }
//       });
      
//       console.log(response.data);
//       return res.status(201).json({ data: response.data });
//     } }
//     else {
//       return res.status(500).json({ error: "Not Valid details" });
//       }
//     }
//   catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };







// exports.panverify = async (req, res) => {
//   try {
//     const { service, itemId, task, essentials } = req.body;

//     if (!service || !itemId || task != "verification" || !essentials) {
//       return res
//         .status(400)
//         .json({ error: "Missing required fields in the request body" });
//     }

//     const itemIdVerify = jwt.verify(itemId, process.env.JWT_SECRET)
//       if(itemIdVerify.fldID ==='95601'){

//         const { name, pan, fuzzy, panStatus } = essentials;
        
//         const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
        
//         if (!name || !fuzzy || !panStatus || !isValidPAN(pan)) {
//           return res.status(400).json({
//             error: "Missing personal verification fields in the request body"
//           });

//               const response = await axios.post('https://kyc-api.aadhaarkyc.io/api/v1/pan/pan', {
//                 id_number: {pan}
//               }, {
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Accept': 'application/json',
//                   'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMzk1MzQ4NiwianRpIjoiNjAwYzk1YzUtMjhkMi00OTBkLWIxOTMtNThkNGM4MzlkOGI5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2Lm5taXRAc3VyZXBhc3MuaW8iLCJuYmYiOjE3MTM5NTM0ODYsImV4cCI6MTcxNTI0OTQ4NiwiZW1haWwiOiJubWl0QHN1cmVwYXNzLmlvIiwidGVuYW50X2lkIjoibWFpbiIsInVzZXJfY2xhaW1zIjp7InNjb3BlcyI6WyJ1c2VyIl19fQ.bknLKmz5DrUGJ3ytg4GQl_X0wa9CZwRxxV36ZRYwaIQ',

//                 }
//               });
//               return res.status(201).json({data:response.data});
//               console.log(response.data);
              
//           }
                
//        }else {
//           // res.staus(400).json({ success: false, message: "Invalid details" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };





exports.panDOB = async (req, res) => {
    try {
    const { service, itemId, task, essentials } = req.body;

    if (!service || !itemId || task != "verification" || !essentials) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request body" });
    }

    const itemIdVerify = jwt.verify(itemId, process.env.JWT_SECRET)
      if(itemIdVerify.fldID ==='95601'){
            
        const { name,DOB, pan, fuzzy, panStatus } = essentials;
        
        const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
        
        if (!name ||!DOB ||!fuzzy || !panStatus || !isValidPAN(pan)) {
          return res.status(400).json({
            error: "Missing personal verification fields in the request body"
          });
        }

        return 
          // Return Yes or No
          //using Data from database matching panNumber to Name
        
       }else {
          res.staus(400).json({ success: false, message: "Invalid details" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.pandetails = async (req, res) => {
  try {
    const { service, itemId, task, essentials } = req.body;

    if (!service || !itemId || task != "verification" || !essentials) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request body" });
    }

    const itemIdVerify = jwt.verify(itemId, process.env.JWT_SECRET)
      if(itemIdVerify.fldID ==='95601'){
            
        const { pan, fuzzy, panStatus } = essentials;
        
        const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
        
        if ( !fuzzy || !panStatus || !isValidPAN(pan)) {
          return res.status(400).json({
            error: "Missing personal verification fields in the request body"
          });
        }

        return 
          // Return details of PanCard
          //using Data from database matching panNumber to Name
        
       }else {
          res.staus(400).json({ success: false, message: "Invalid details" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};