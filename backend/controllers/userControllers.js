const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Company = require('../models/companyModel');


// @desc    Get user data
// @route   GET /api/users
// @access  Private
const getUser = async (req, res) => {
    const user = await User.findById(req.user)

    if(user) {
        return res.status(200).json({
            _id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            token: req.headers.authorization.split(' ')[1]
        })
    } else {
        return res.status(400).json({
            msg: 'Not authorized'
        })
    }
}


// @desc   Register user
// @route  POST /api/users
// @access Public
const registerUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    // Check if email or password is empty
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    // Check if user exists
    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.status(400).json({
            msg: 'Email already exists'
        });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        email,
        firstName,
        lastName,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: generateToken(user._id)
        });
    } else {
        return res.status(400).json({
            msg: 'Invalid user data'
        });
    }
}


// @desc   Login user
// @route  POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;


    try {
        // Check if user exists
        const user = await User.findOne({ email });
    
        if(user && (await bcrypt.compare(password, user.password))) {
            return res.json({
                _id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                token: generateToken(user._id)
            });
        } else {
            return res.status(400).json({
                msg: 'Invalid user data'
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
}


// @desc    Update user profile
// @route   PUT /api/users
// @access  Private
const editUser = async (req, res) => {
    // Check for user
    if(!req.user) {
        return res.status(400).json({
            msg: 'Please login'
        })
    }

    try {
        const user = await User.findByIdAndUpdate(req.user, req.body, { new: true });
    
        if(!user) {
            return res.status(400).json({
                msg: 'User not found'
            })
        }
    
        return res.status(200).json({
            _id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user?.phoneNumber,
            token: req.headers.authorization.split(' ')[1]
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
}


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, ''+process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    getUser,
    registerUser,
    loginUser,
    editUser,
}