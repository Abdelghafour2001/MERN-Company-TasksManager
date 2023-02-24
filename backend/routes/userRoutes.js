const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    editUser,
    getUser
} = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');


router.route('/').get(protect, getUser).put(protect, editUser).post(registerUser);
router.route('/login').post(loginUser);


module.exports = router;