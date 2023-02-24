const Ticket = require('../models/ticketModel');
const Business = require('../models/businessModel');
const Employee = require('../models/employeeModel');


// @route   GET api/ticket/manager
// @desc    Get all tickets where user is manager
// @access  Private
const getAllManagerTickets = async (req, res) => {
    try {
        const employee = await Employee.find({ user: req.user._id, isManager: true });

        if(!employee) {
            return res.status(400).json({ msg: 'No employee found' });
        }

        const to = await Ticket.find(
            { business: {
                $in: employee.map(employee => employee.business)
            },
            to: {
                $exists: false
            }
        }).sort({ createdAt: -1 }).limit(10)
        .populate('from')
        .populate('to')
        .populate('business').exec();

        const from = await Ticket.find(
            {
                business: {
                    $in: employee.map(employee => employee.business)
                },
                to: {
                    $exists: true
                }
            }).sort({ createdAt: -1 }).limit(10)
            .populate('from')
            .populate('to')
            .populate('business').exec();

        return res.status(200).json({to, from});
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   GET api/ticket/employee
// @desc    Get all tickets where user is employee
// @access  Private
const getAllEmployeeTickets = async (req, res) => {
    try {
        const to = await Ticket.find({ to: req.user._id }).sort({ createdAt: -1 }).limit(10)
        .populate('from')
        .populate('to')
        .populate('business').exec();
        const from = await Ticket.find({ from: req.user._id }).sort({ createdAt: -1 }).limit(10)
        .populate('from')
        .populate('to')
        .populate('business').exec();

        return res.status(200).json({to, from});
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   POST api/ticket
// @desc    Create a ticket
// @access  Private
const createTicket = async (req, res) => {
    try {
        const business = await Business.findById(req.body.business._id).populate('company');
        
        if(!business) {
            return res.status(404).json({ msg: 'Business not found' });
        }

        if(req.body.to) {
            const ticket = new Ticket({
                from: req.user._id,
                to: req.body.to._id,
                business: business._id,
                message: req.body.message,
                type: req.body.type,
                date: req.body.date,
                anonymous: req.body.anonymous
            });

            await ticket.save();

            ticket.to = req.body.to ? req.body.to : null;
            ticket.business = req.body.business ? business : null;

            return res.status(200).json(ticket);
        } else {
            const ticket = new Ticket({
                from: req.user._id,
                business: business._id,
                message: req.body.message,
                type: req.body.type,
                date: req.body.date,
                anonymous: req.body.anonymous
            });

            await ticket.save();

            ticket.business = business;

            return res.status(200).json(ticket);
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   PUT api/ticket/:id
// @desc    Update a ticket
// @access  Private
const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
        .populate('from')
        .populate('to')
        .populate('business').exec();;

        if(!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }

        if(
            ticket.from._id.toString() !== req.user._id.toString() &&
            (ticket.to && ticket.to._id.toString() !== req.user._id.toString())
        ) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        
        ticket.status = req.body.status;

        await ticket.save();

        return res.status(200).json(ticket);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   DELETE api/ticket/:id
// @desc    Delete a ticket
// @access  Private
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if(!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }

        if(ticket.from.toString() !== req.user._id.toString() || (ticket.to && ticket.to.toString() !== req.user._id.toString())) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await ticket.remove();

        return res.status(200).json(ticket);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


module.exports = {
    getAllManagerTickets,
    getAllEmployeeTickets,
    createTicket,
    updateTicket,
    deleteTicket
}