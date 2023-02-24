const mongoose = require('mongoose');


const type = ['time-off', 'issue', 'request', 'complaint', 'other'];
const status = ['pending', 'resolved', 'approved', 'rejected'];


const ticketSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    anonymous: {
        type: Boolean,
        required: false
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: type,
        required: true
    },
    status: {
        type: String,
        enum: status,
        default: 'pending'
    },
}, { timestamps: true });


module.exports = mongoose.model('Ticket', ticketSchema);