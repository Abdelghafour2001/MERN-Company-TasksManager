const mongoose = require('mongoose');


const status = ['pending', 'accepted'];
const receiver = ['business', 'company'];


const globalMessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: false
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    receiver: {
        type: String,
        enum: receiver,
        required: true
    },
    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
        required: false
    },
    status: {
        type: String,
        enum: status,
        default: 'pending',
    },
    isImportant: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        required: false
    }
}, { timestamps: true });


module.exports = mongoose.model('GlobalMessage', globalMessageSchema);