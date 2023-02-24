const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getCompanyEmployees,
    getUserEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeControllers');


router.route('/')
    .post(protect, createEmployee);

router.route('/user')
    .get(protect, getUserEmployees);

router.route('/company/:id')
    .get(protect, getCompanyEmployees);

    router.route('/:id')
    .put(protect, updateEmployee)
    .delete(protect, deleteEmployee);


module.exports = router;