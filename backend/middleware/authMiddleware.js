const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    // Check if authorization header is set
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            msg: 'Not authorized'
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, ''+process.env.JWT_SECRET);

        // Set user to req.user
        req.user = await User.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Not authorized'
        });
    }
};


module.exports = {
    protect
};