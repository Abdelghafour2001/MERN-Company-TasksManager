const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getTrainings,
    createTraining,
    updateTraining,
    deleteTraining
} = require('../controllers/trainingControllers');


router.route('/')
    .get(protect, getTrainings)
    .post(protect, createTraining);

router.route('/:id')
    .put(protect, updateTraining)
    .delete(protect, deleteTraining);


module.exports = router;