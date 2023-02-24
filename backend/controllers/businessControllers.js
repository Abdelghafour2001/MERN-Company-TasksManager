const Business = require('../models/businessModel');
const Company = require('../models/companyModel');
const User = require('../models/userModel');
const Employee = require('../models/employeeModel');


// @desc   Get all businesses of a company
// @route  GET /api/businesses/company/:id
// @access Private
const getAllBusinesses = async (req, res) => {
    const { id } = req.params;

    try {
        // Populate employees object with user info to found bussinesses
        const businesses = await Business.find({ company: id });

        if (!businesses) {
            return res.status(400).json({
                msg: 'Businesses not found'
            });
        }

        return res.status(200).json(businesses);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Create business
// @route  POST /api/businesses/
// @access Private
const createBusiness = async (req, res) => {
    const { name, address, city, state, zip, phoneNumber, workHours, positions, type, companyId } = req.body;

    if (!companyId) {
        return res.status(400).json({
            msg: 'Company ID is required'
        });
    }

    if (!name || !address || !city || !state || !zip || !phoneNumber) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    try {
        // Check if company exists
        const company = await Company.findById(companyId);

        if(!company) {
            return res.status(400).json({
                msg: 'Company not found'
            });
        }

        // Check if user is owner of company
        if (!company.owners.includes(req.user._id)) {
            return res.status(400).json({
                msg: 'You are not an owner of this company'
            });
        }

        const business = new Business({
            user: req.user._id,
            company: company._id,
            name,
            type,
            positions,
            address,
            city,
            state,
            zip,
            workHours,
            phoneNumber
        });

        await business.save();

        const employee = new Employee({
            user: req.user._id,
            company: company._id,
            business: business._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
        });

        await employee.save();

        return res.status(200).json(business);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Update business
// @route  PUT /api/businesses/:id
// @access Private
const editBusiness = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id).populate('company').exec();

        if (!business) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        if (!business.company.owners.includes(req.user._id)) {
            return res.status(400).json({
                msg: 'You are not authorized to edit this business'
            });
        }

        const editBusiness = await Business.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.status(200).json(editBusiness);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @desc   Delete business
// @route  DELETE /api/businesses/:id
// @access Private
const deleteBusiness = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id).populate('company').exec();

        if (!business) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        if (!business.company.owners.includes(req.user._id)) {
            return res.status(400).json({
                msg: 'You are not authorized to delete this business'
            });
        }

        const deletedBusiness = await business.remove();

        return res.status(200).json(deletedBusiness);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


module.exports = {
    getAllBusinesses,
    createBusiness,
    editBusiness,
    deleteBusiness
}