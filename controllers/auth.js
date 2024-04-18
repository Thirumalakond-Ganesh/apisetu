const jwt=require('jsonwebtoken');
// const JWT_SECRET = 'secret';

const users = [{ username: 'admin', password: 'password' }];


// Function to generate JWT token
const gToken = (username) => {
    const token = jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token);
    console.log(username);

    return token;
};

// API endpoint to handle POST request for login
exports.generateToken= (req, res) => {

    try {
        const { username, password } = req.body;
    
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            // Generate token
            const token = gToken(username);
            res.cookie("token",token).json({ token,username});
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message })
        
    }
    
};