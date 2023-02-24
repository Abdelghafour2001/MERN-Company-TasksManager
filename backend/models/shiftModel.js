const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: false
    },
    acceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    scheduledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: false
    },
    endTime: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'bg-primary'
    },
    isConfirmed: {
        type: Boolean,
        default: true
    },
    note: {
        type: String,
        required: false
    }
}, { timestamps: true });


// remove shift from schedule when shift is deleted
// shiftSchema.pre('remove', async function(next) {
//     try {
//         const schedule = await Schedule.findById(this.schedule);

//         if (!schedule) {
//             return next(new Error('No schedule found'));
//         }
        
//         schedule.shifts.pull(this._id);
//         await schedule.save();
//         next();
//     } catch (err) {
//         next(err);
//     }
// });


// add shift to schedule when shift is created
// shiftSchema.post('save', async function(doc, next) {
//     try {
//         const schedule = await Schedule.findById(this.schedule);

//         if (!schedule) {
//             return next(new Error('No schedule found'));
//         }

//         schedule.shifts.push(this._id);
//         await schedule.save();
//         next();
//     } catch (err) {
//         next(err);
//     }
// });



module.exports = mongoose.model('Shift', shiftSchema);