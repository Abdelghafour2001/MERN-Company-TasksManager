const mongoose = require('mongoose');
const Company = require('./companyModel');

const businessSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    workHours: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    positions: [{
        title: {
            type: String,
            required: false
        },
        color: {
            type: String,
            default: '#2a74d3'
        }
    }],
    shiftPresets: [{
        label: {
            type: String,
            required: false
        },
        startTime: {
            type: String,
            required: false
        },
        endTime: {
            type: String,
            required: false
        },
    }],
}, { timestamps: true });


// remove business from company when is deleted
businessSchema.pre('remove', async function (next) {
    try {
        const company = await Company.findById(this.company);

        if (!company) {
            return next(new Error('Company not found'));
        }

        company.businesses.pull(this._id);
        await company.save();
        
        next();
    } catch (err) {
        next(err);
    }
});


// add business to company on create
businessSchema.post('save', async function () {
    const company = await Company.findById(this.company);
    if(company && !company.businesses.includes(this._id)) {
        company.businesses.push(this._id);
        company.save();
    }
})


module.exports = mongoose.model('Business', businessSchema);