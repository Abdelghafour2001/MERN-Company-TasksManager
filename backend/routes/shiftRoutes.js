const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createShift,
    editShift,
    getAllBusinessShifts,
    getUserShifts,
    getManagerOpenShifts,
    deleteShift,
    copyPreviousWeekShifts,
    pickUpShift,
} = require('../controllers/shiftControllers');


router.route('/')
    .get(protect, getAllBusinessShifts)
    .post(protect, createShift);

router.route('/copy/:business')
    .put(protect, copyPreviousWeekShifts);

router.route('/user')
    .get(protect, getUserShifts);

router.route('/manager')
    .get(protect, getManagerOpenShifts);

router.route('/pickup/:id')
    .post(protect, pickUpShift);

router.route('/:id')
    .put(protect, editShift)
    .delete(protect, deleteShift);



module.exports = router;