const mongoose = require('mongoose');
const Business = require('./businessModel');
const Company = require('./companyModel');

const employeeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        default: 'Employee'
    },
    isManager: {
        type: Boolean,
        default: false
    },
    wage: {
        type: Number,
        default: 0
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });


// remove employee from business when employee is deleted
employeeSchema.pre('remove', async function (next) {
    try {
        // if(this.user) {
        //     const company = await Company.findById(this.company);

        //     if (!company) {
        //         return next(new Error('Company not found'));
        //     }

        //     company.employees.pull(this.user);
        //     await company.save();

            next();
        // } else {
        //     next();
        // }
    } catch (err) {
        next(err);
    }
});


// add employee to business on create
employeeSchema.post('save', async function ( doc, next ) {
    try {
        // if(this.user) {
        //     const company = await Company.findById(this.company);

        //     if (!company) {
        //         return next(new Error('Company not found'));
        //     }

        //     if(!company.employees.includes(this.user)) {
        //         company.employees.push(this.user);
        //         await company.save();
        //     }
        //     next();
        // } else {
            next();
        // }
    } catch (err) {
        next(err);
    }
})


module.exports = mongoose.model('Employee', employeeSchema);