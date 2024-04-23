const jwt = require('jsonwebtoken');
const users = [{ username: 'admin', password: 'password' },
               {username: 'admin123', password: 'password123'}
            ];

const generateToken = (username) => {
    try {
        const token = jwt.sign({ username }, process.env.JWT_SECRET,{noTimestamp: true });
        console.log('Generated token:', token);
        console.log({username});
        return token;
    } catch (error) {
        console.error('Error generating token:', error.message);
        throw new Error('Token generation failed');
    }
};

exports.generateToken = (req, res) => {
    try {
        const { username, password } = req.body;
    
        const user = users.find(u => u.username === username && u.password === password);
        console.log(user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        const token = generateToken(username);
        res.cookie('token', token); 
        res.json({ token, username });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};




































// const jwt=require('jsonwebtoken');
// // const JWT_SECRET = 'secret';

// const users = [{ username: 'admin', password: 'password' }];


// // Function to generate JWT token
// const gToken = (username) => {
//     const token = jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '1h' });
//     console.log(token);
//     console.log(username);

//     return token;
// };

// // API endpoint to handle POST request for login
// exports.generateToken= (req, res) => {

//     try {
//         const { username, password } = req.body;
    
//         const user = users.find(u => u.username === username && u.password === password);
//         if (user) {
//             // Generate token
//             const token = gToken(username);
//             res.cookie("token",token).json({ token,username});
//         } else {
//             res.status(401).json({ error: 'Invalid username or password' });
//         }
        
//     } catch (error) {
//         res.status(500).json({success:false,message:error.message })
        
//     }
    
// };