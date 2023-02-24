const mongoose = require('mongoose');

const status = ['pending', 'accepted', 'rejected'];

const inviteSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    to: {
        type: String,
        required: true,
        enum: ['company', 'user'],
    },
    status: {
        type: String,
        default: 'pending',
        enum: status,
    }
}, { timestamps: true });


module.exports = mongoose.model('Invite', inviteSchema);