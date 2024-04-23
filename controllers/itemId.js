const jwt=require('jsonwebtoken');

const JWT_SECRET = 'secret';
const JWT_SECRET_ITEM = 'secretItemId';
const users = [{username: 'admin',password: 'password'}];
const fields =[{pan:"95601"},{aadhaar:"95602"},{gst:"95603"},{voterId:"95604"}];

const gitemIdToken = (fldID) => {
    try {
        const itoken = jwt.sign({ fldID }, process.env.JWT_SECRET,{noTimestamp: true });
        console.log('Generated token:', itoken);
        return itoken;
    } catch (error) {
        console.error('Error generating token:', error.message);
        throw new Error('Token generation failed');
    }
};

exports.itemId =async (req,res)=>{

try {
    const {token,username,fieldID}=req.body;

    if(!token || !username || !fieldID){
        return res.status(401).json({success:"false",message:"Unauthorized Credentials"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { usernamee } = decoded;
    if(username !== req.body.username) {
        return res.status(401).json({ success: false, message: 'Invalid token for the user' });
    }
else{
    console.log(decoded);

const field = fields.find(f => f.pan === fieldID);
// console.log(field)
if (!field) {
    return res.status(404).json({ success: false, message: "Field not found" });
}
const itoken = gitemIdToken(fieldID);
res.json({ success: true, message: 'Token is valid', decoded ,itoken});

}
}


catch (error) {
    res.status(500).json({ success: false, message: error.message });
}
}




