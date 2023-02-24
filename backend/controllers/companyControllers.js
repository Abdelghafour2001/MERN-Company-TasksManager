const Company = require('../models/companyModel');
const User = require('../models/userModel');
const Employee = require('../models/employeeModel');


// @desc   Get all user company
// @route  GET /api/companies/user/
// @access Private
const getUserCompany = async (req, res) => {
    try {
        const company = await Company.findOne({employees: req.user._id}).populate('businesses').populate('employees').exec();

        if (!company) {
            return res.status(400).json({
                msg: 'Company not found'
            });
        }
    
        return res.status(200).json(company);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Create company
// @route  POST /api/companies
// @access Private
const createCompany = async (req, res) => {
    const { name, email, logo, website } = req.body;

    if(!name || !email ) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    // Check if user exists
    const user = await User.findById(req.user);

    if(!user) {
        return res.status(400).json({
            msg: 'User not found'
        });
    }

    const company = await Company.findOne({user: user._id});

    if(company) {
        return res.status(400).json({
            msg: 'User already has a company'
        });
    }

    const newCompany = new Company({
        user: req.user._id,
        name,
        email,
        logo,
        website,
    });

    // Add user to company as its owner and employee
    newCompany.employees.push(user);
    newCompany.owners.push(user);

    await newCompany.save();

    return res.status(200).json(newCompany);
}


// @desc   Update company
// @route  PUT /api/companies/:id
// @access Private
const editCompany = async (req, res) => {
    const { id } = req.params;

    try {
        const company = await Company.findById(id);

        if (!company) {
            return res.status(400).json({
                msg: 'Company not found'
            });
        }

        if(!company.owners.includes(req.user._id)) {
            return res.status(400).json({
                msg: 'You are not authorized to edit this company'
            });
        }

        const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {new: true});

        return res.status(200).json(updatedCompany);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Delete company
// @route  DELETE /api/companies/:id
// @access Private
const deleteCompany = async (req, res) => {
    const { id } = req.params;

    try {
        const company = await Company.findByIdAndDelete(id);

        if (!company) {
            return res.status(400).json({
                msg: 'Company not found'
            });
        }

        if(!company.owners.includes(req.user._id)) {
            return res.status(400).json({
                msg: 'You are not authorized to delete this company'
            });
        }

        return res.status(200).json(company);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Change user role
// @route  POST /api/companies/:id/changeRole
// @access Private
const changeRole = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).populate('employees').exec();

        if (!company) {
            return res.status(400).json({
                msg: 'Company not found'
            });
        }

        if(company.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                msg: 'You are not authorized to change role'
            });
        }

        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(400).json({
                msg: 'User not found'
            });
        }

        if(req.body.role === 'employee') {
            company.owners.pull(req.body.userId);
        } else if(req.body.role === 'owner') {
            company.owners.push(req.body.userId);
        } else {
            return res.status(400).json({
                msg: 'Invalid role'
            });
        }

        await company.save();

        return res.status(200).json(company);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Remove user from company
// @route  POST /api/companies/:id/removeUser
// @access Private
const removeUser = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).populate('employees').exec();

        if (!company) {
            return res.status(400).json({
                msg: 'Company not found'
            });
        }

        if(!company.owners.includes(req.user._id)) {
            return res.status(400).json({
                msg: 'You are not authorized to remove user'
            });
        }

        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(400).json({
                msg: 'User not found'
            });
        }

        company.employees.pull(req.body.userId);

        await company.save();

        return res.status(200).json(company);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


module.exports = {
    getUserCompany,
    createCompany,
    editCompany,
    deleteCompany,
    changeRole,
    removeUser,
}