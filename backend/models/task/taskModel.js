const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    taskItem: {
        type: String,
        required: true
    },
    taskList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskList',
        required: true
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    completedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completedDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Task', taskSchema);