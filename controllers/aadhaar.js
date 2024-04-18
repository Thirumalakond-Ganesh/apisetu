const { itemId } = require("./itemId");
const JWT_SECRET = 'secret';
const JWT_SECRET_ITEM = 'secretItemId';
const field =[{pan:"95601",aadhaar:"95602",gst:"95603",voterId:"95604"}];


exports.aadhaarverify=async (req,res)=>{
    
    try {
        const {service,itemId,accessToken,task,essentials}=req.body;
        const {name,number}=essentials;
        
        const accessTokenIsValid= jwt.verify (accessToken ,JWT_SECRET)
        const itemIdisValid =jwt.verify(itemId,JWT_SECRET_ITEM);
              
        if(accessTokenIsValid && itemIdisValid){
            return
        }
        if(accessTokenIsValid && itemIdisValid){
            return
        }
        
    } catch (error) {
        
    }   
}



exports.aadhaardetails=async (req,res)=>{

    try {

        
    } catch (error) {
        
    }
}