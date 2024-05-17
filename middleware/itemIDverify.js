const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const { itemId } = req.body;

  if (!itemId) {
    return res.status(400).json({ error: 'Missing itemId in the request body' });
  }

  try {
    const decoded = jwt.verify(itemId, process.env.JWT_SECRET);
    req.decodedItemId = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = verifyJWT;
