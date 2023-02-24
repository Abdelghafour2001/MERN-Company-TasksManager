const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getUserInvites,
    createInvite,
    updateInvite,
    deleteInvite
} = require('../controllers/inviteControllers');


router.route('/')
    .get(protect, getUserInvites)
    .post(protect, createInvite);

router.route('/:id')
    .put(protect, updateInvite)
    .delete(protect, deleteInvite);


module.exports = router;