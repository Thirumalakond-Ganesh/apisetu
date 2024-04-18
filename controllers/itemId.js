const jwt=require('jsonwebtoken');

const JWT_SECRET = 'secret';
const JWT_SECRET_ITEM = 'secretItemId';
const users = [{username: 'admin',password: 'password'}];
const fields =[{pan:"95601",aadhaar:"95602",gst:"95603",voterId:"95604"}];

const gitemIdToken = (fieldID) => {
    const itoken = jwt.sign({ fieldID }, process.env.JWT_SECRET_ITEM);
    return itoken;
};

exports.itemId =async (req,res)=>{

try {
    const {token,username,fieldID}=req.body;

    if(!token || !username || !fieldID){
        return res.status(401).json({success:"false",message:"Unauthorized Credentials"})
    }


    const decodedTest= jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (decoded.username !== username) {
            return res.status(401).json({ success: false, message: "Invalid token for the user" });
        } 
        res.json({msg:"dasa"});
    })
        

        const field = fields.find(f => f.pan === fieldID);

        if (!field) {
            return res.status(404).json({ success: false, message: "Field not found" });
        }
        // Generate token
        const itoken = gitemIdToken(fieldID);
        res.json({ itoken});
        res.status(401).json({ error: 'Invalid username or password' });

}
catch (error) {
    res.status(500).json({ success: false, message: error.message });
}
}




