const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getSenderGlobalMessage,
    getAllGlobalMessages,
    createGlobalMessage,
    updateGlobalMessage,
    deleteGlobalMessage,
} = require('../controllers/globalMessageControllers');


router.route('/sender')
    .get(protect, getSenderGlobalMessage);

router.route('/')
    .get(protect, getAllGlobalMessages)
    .post(protect, createGlobalMessage);

router.route('/:id')
    .put(protect, updateGlobalMessage)
    .delete(protect, deleteGlobalMessage);


module.exports = router;