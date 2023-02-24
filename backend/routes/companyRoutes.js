const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getUserCompany,
    createCompany, 
    editCompany, 
    deleteCompany,
    changeRole,
    removeUser
} = require('../controllers/companyControllers');


router.route('/')
    .post(protect, createCompany);
router.route('/user')
    .get(protect, getUserCompany);
router.route('/:id')
    .put(protect, editCompany)
    .delete(protect, deleteCompany);
router.route('/:id/changeRole')
    .post(protect, changeRole);
router.route('/:id/removeUser')
    .post(protect, removeUser);

module.exports = router;