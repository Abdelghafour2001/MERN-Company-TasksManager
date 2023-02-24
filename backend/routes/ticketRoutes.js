const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getAllManagerTickets,
    getAllEmployeeTickets,
    createTicket,
    updateTicket,
    deleteTicket,
} = require('../controllers/ticketControllers');


router.route('/manager')
    .get(protect, getAllManagerTickets);

router.route('/employee')
    .get(protect, getAllEmployeeTickets);

router.route('/')
    .post(protect, createTicket);

router.route('/:id')
    .put(protect, updateTicket)
    .delete(protect, deleteTicket);


module.exports = router;