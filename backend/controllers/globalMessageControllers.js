const GlobalMessage = require('../models/globalMessageModel');
const Employee = require('../models/employeeModel');
const Company = require('../models/companyModel');
const Shift = require('../models/shiftModel');


// @route   GET api/globalMessage/sender
// @desc    Get a global message where user is sender
// @access  Private
const getSenderGlobalMessage = async (req, res) => {
    try {
        const senderGlobalMessage = await GlobalMessage.find({ sender: req.user._id, status: 'pending' });

        return res.status(200).json(senderGlobalMessage);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};


// @route   GET api/globalMessage
// @desc    Get all global messages
// @access  Private
const getAllGlobalMessages = async (req, res) => {
    try {
        const employees = await Employee.find({ user: req.user._id });

        if(!employees || employees.length === 0) {
            return res.status(200);
        }

        const businessGlobalMessage = await GlobalMessage.find(
            { 
                business: {
                    $in: employees.map(employee => employee.business)
                },
                receiver: 'business',
                status: 'pending' 
            }
        ).populate({
            path: 'shift',
            populate: {
                path: 'business',
            }
        }).exec();

        const companyGlobalMessage = await GlobalMessage.find(
            { company: employees[0].company, receiver: 'company', status: 'pending' }
            ).populate({
                path: 'shift',
                populate: {
                    path: 'business',
                }
            }).exec();

        return res.status(200).json({
                businessGlobalMessage: businessGlobalMessage.filter(message => message.sender.toString() !== req.user._id.toString()),
                companyGlobalMessage: companyGlobalMessage.filter(message => message.sender.toString() !== req.user._id.toString())
            });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   POST api/globalMessage
// @desc    Create a global message
// @access  Private
const createGlobalMessage = async (req, res) => {
    try {
        if(req.body.receiver === 'business') {
            const employee = await Employee.findOne({ user: req.user._id, business: req.body.business, isManager: true });

            if(!employee) {
                return res.status(400).json({ msg: 'You are not an manager of this business' });
            }

            const newMessage = new GlobalMessage({
                sender: req.user._id,
                business: req.body.business,
                company: req.body.company,
                receiver: req.body.receiver,
                shift: req.body.shift,
                message: req.body.message,
                isImportant: req.body.isImportant
            });

            await newMessage.save();

            return res.status(200).json(newMessage);
        } else if(req.body.receiver === 'company') {
            const company = await Company.findById(req.body.company);

            if(!company || (company && (!company.owners.includes(req.user._id) || company.user.toString() !== req.user._id.toString()))) {
                return res.status(400).json({ msg: 'You are not an owener of this company' });
            }

            const newMessage = new GlobalMessage({
                sender: req.user._id,
                business: req.body.business,
                company: req.body.company,
                receiver: req.body.receiver,
                shift: req.body.shift,
                message: req.body.message,
                isImportant: req.body.isImportant
            });

            await newMessage.save();

            return res.status(200).json(newMessage);
        } else {
            return res.status(400).json({ msg: 'Invalid message receiver' });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   PUT api/globalMessage/:id
// @desc    Update a global message
// @access  Private
const updateGlobalMessage = async (req, res) => {
    try {
        const globalMessage = await GlobalMessage.findById(req.params.id);

        if(!globalMessage) {
            return res.status(400).json({ msg: 'Global message not found' });
        }

        if(!globalMessage.shift) {
            return res.status(400).json({msg: 'There is no shift to update'});
        }

        const shift = await Shift.findById(globalMessage.shift);

        if(!shift || shift.employee) {
            return res.status(400).json({msg: 'Shift not found, or shift is already assigned'});
        }

        shift.acceptedBy = req.user._id;
        await shift.save();

        globalMessage.status = 'accepted';
        await globalMessage.save();

        return res.status(200).json(globalMessage);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   DELETE api/globalMessage/:id
// @desc    Delete a global message
// @access  Private
const deleteGlobalMessage = async (req, res) => {
    try {
        const globalMessage = await GlobalMessage.findById(req.params.id);

        if(!globalMessage) {
            return res.status(400).json({ msg: 'Global message not found' });
        }

        if(globalMessage.sender.toString() !== req.user._id.toString()) {
            return res.status(400).json({ msg: 'You are not the sender of this global message' });
        }

        await globalMessage.remove();

        return res.status(200).json(globalMessage);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


module.exports = {
    getSenderGlobalMessage,
    getAllGlobalMessages,
    createGlobalMessage,
    updateGlobalMessage,
    deleteGlobalMessage,
};