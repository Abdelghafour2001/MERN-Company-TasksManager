const mongoose = require('mongoose');

const frequency = ['daily', 'weekly', 'monthly', 'once'];

const taskListSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    businesses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    }],
    positions: [{
        type: String,
        required: true
    }],
    frequency: {
        type: String,
        enum: frequency,
        required: true
    },
    repeat: [{
        type: String,
        required: false
    }],
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: false,
        default: '#2a74d3'
    },
    taskItems: [{
        _id: {
            type: mongoose.Types.ObjectId,
            default: mongoose.Types.ObjectId(),
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
    }],
}, { timestamps: true });


module.exports = mongoose.model('TaskList', taskListSchema);