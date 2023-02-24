const mongoose = require('mongoose');


const trainingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    positions: [{
        type: String,
        required: false
    }],
    sections: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        items: [{
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: false
            },
            video: {
                type: String,
                required: false
            },
        }]
    }],
}, { timestamps: true });


module.exports = mongoose.model('Training', trainingSchema);