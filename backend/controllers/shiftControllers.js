const Shift = require('../models/shiftModel');
const User = require('../models/userModel');
const Employee = require('../models/employeeModel');
const Business = require('../models/businessModel');
const Company = require('../models/companyModel');


// @desc   GET all shifts for a business
// @route  GET /api/shifts/?business=:business&fromDate=:fromDate&toDate=:toDate
// @access Private
const getAllBusinessShifts = async (req, res) => {
    const { fromDate, toDate, business } = req.query;

    try {
        const employees = await Employee.find({business: business});

        if (!employees) {
            return res.status(400).json({
                msg: 'Employees not found'
            });
        }
        const shifts = await Shift.find(
            {
                business: business, 
                date: {
                    $gte: new Date(fromDate).setHours(0,0,0,0),
                    $lte: new Date(toDate).setHours(0,0,0,0)
                }
            }
        ).populate('acceptedBy');

        if (!shifts) {
            return res.status(400).json({ msg: 'No shifts found' });
        }

        return res.status(200).json({ shifts, employees });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
};


// @desc   GET all users shifts from today with limit of 20
// @route  GET /api/shifts/user/
// @access Private
const getUserShifts = async (req, res) => {
    try {
        const userEmployees = await Employee.find({ user: req.user._id });

        const shifts = await Shift.find({
            date: {
                $gte: new Date().setHours(0,0,0,0),
            },
            employee: {
                $in: userEmployees.map(employee => employee._id)
            }
        }).populate('business').populate('employee').sort({ date: 1 });

        const openShifts = await Shift.find({
            date: {
                $gte: new Date().setHours(0,0,0,0),
            },
            employee: null,
            acceptedBy: null,
            business: {
                $in: userEmployees.map(employee => employee.business)
            }
        }).populate('business').populate('employee').sort({ date: 1 });

        const pickedUpShifts = await Shift.find({
            date: {
                $gte: new Date().setHours(0,0,0,0),
            },
            acceptedBy: req.user._id,
        }).populate('business').populate('employee').sort({ date: 1 });

        if (!shifts && !pickedUpShifts) {
            return res.status(400).json({ msg: 'No shifts found' });
        }

        return res.status(200).json(shifts.concat(pickedUpShifts).concat(openShifts));
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
};


// @desc   GET all manager shifts from today withot limit
// @route  GET /api/shifts/manager/
// @access Private
const getManagerOpenShifts = async (req, res) => {
    try {
        const managerEmployees = await Employee.find({ user: req.user._id, isManager: true });

        // console.log(managerEmployees)
        const shifts = await Shift.find({
            date: {
                $gte: new Date().setHours(0,0,0,0),
            },
            employee: null,
            acceptedBy: null,
            business: {
                $in: managerEmployees.map(employee => employee.business)
            }
        }).populate('business').populate('employee').sort({ date: 1 });

        if (!shifts) {
            return res.status(400).json({ msg: 'No shifts found' });
        }

        return res.status(200).json(shifts);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
};


// @desc   Create a shift
// @route  POST /api/shifts/
// @access Private
const createShift = async (req, res) => {
    const { date, startTime, endTime, business, employee, position } = req.body;

    if(!date || !startTime || !endTime || !business) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    try {
        const businessObj = await Business.findById(business).populate('company');

        if (!businessObj) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        // Check if user is a manager
        const userEmployee = await Employee.findOne({ user: req.user._id, business: business });

        if(!userEmployee) {
            return res.status(400).json({
                msg: 'You are not authorized to update this shift'
            });
        }


        // Check if logged in user is a manager or company owner
        if (userEmployee.isManager || businessObj.company.owners.includes(req.user._id))
        {
            const shift = await Shift.create({
                employee,
                scheduledBy: userEmployee,
                business,
                date,
                position,
                startTime,
                endTime,
            })

            return res.status(200).json(shift);
        } else {
            return res.status(400).json({
                msg: 'You are not authorized to create shift'
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }

}


// @desc   Edit a shift
// @route  PUT /api/shifts/:id
// @access Private
const editShift = async (req, res) => {
    const { id } = req.params;  // id is the shift id

    try {
        const shift = await Shift.findById(id).populate('business').populate('employee').exec();

        if (!shift) {
            return res.status(400).json({
                msg: 'No shift found'
            });
        }

        const business = await Business.findById(shift.business._id).populate('company');

        if (!business) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        // Check if user is a manager
        const userEmployee = await Employee.findOne({ user: req.user._id, business: shift.business._id });

        if(!userEmployee && (!shift.acceptedBy || (shift.acceptedBy && shift.acceptedBy.toString() !== req.user._id.toString()))) {
            return res.status(400).json({
                msg: 'You are not authorized to update this shift'
            });
        }

        // Check if logged in user is a manager or company owner
        if (userEmployee?.isManager || business.company.owners.includes(req.user._id))
        {
            req.body.acceptedBy = req.body.acceptedBy ? req.body.acceptedBy : null;
            const editedShift = await Shift.findByIdAndUpdate(id, req.body, { new: true })
            .populate('business')
            .populate('employee')
            .populate('acceptedBy').exec();

            return res.status(200).json(editedShift);
        }  else if (
            userEmployee?._id.toString() === shift.employee?._id.toString() || 
            (shift.acceptedBy && shift.acceptedBy.toString() !== req.user._id.toString())
        ) { // Check is user is an employee in this shift
            shift.note = req.body.note;
            const editedShift = await shift.save();

            return res.status(200).json(editedShift);
        } else {
            return res.status(400).json({
                msg: 'You are not authorized to update this shift'
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
}


// @desc   Delete a shift
// @route  DELETE /api/shifts/:id
// @access Private
const deleteShift = async (req, res) => {
    const { id } = req.params;  // id is the shift id

    try {
        const shift = await Shift.findById(id);

        if (!shift) {
            return res.status(400).json({
                msg: 'No shift found'
            });
        }

        const business = await Business.findById(shift.business).populate('company');

        if (!business) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        // Check if user is a manager
        const userEmployee = await Employee.findOne({ user: req.user._id, business: shift.business });

        if(!userEmployee) {
            return res.status(400).json({
                msg: 'You are not authorized to delete this shift'
            });
        }

        // Check if logged in user is a manager or company owner
        if (userEmployee.isManager || business.company.owners.includes(req.user._id))
        {
            const deletedShift = await shift.remove();

            return res.status(200).json(deletedShift);
        } else {
            return res.status(400).json({
                msg: 'You are not authorized to delete shift'
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
}


// @desc   Copy previous week's shifts
// @route  POST /api/shifts/copy/:business
// @access Private
const copyPreviousWeekShifts = async (req, res) => {
    const { business } = req.params;
    const { fromDate, toDate, dateControl } = req.body;

    try {
        const businessObj = await Business.findById(business).populate('company');

        if (!businessObj) {
            return res.status(400).json({
                msg: 'Business not found'
            });
        }

        // Check if user is a manager
        const userEmployee = await Employee.findOne({ user: req.user._id, business: business });

        if(!userEmployee) {
            return res.status(400).json({
                msg: 'You are not authorized to update this employee'
            });
        }

        // Check if logged in user is a manager or company owner
        if (userEmployee.isManager || businessObj.company.owners.includes(req.user._id))
        {
            const previousWeekShifts = await Shift.find(
                { business, 
                    date: { 
                        $gte: new Date(fromDate).setHours(0,0,0,0),
                        $lte: new Date(toDate).setHours(0,0,0,0)
                    } 
                }).sort({ date: -1 });

            if(previousWeekShifts.length === 0) {
                return res.status(400).json({
                    msg: 'No shifts found'
                });
            }

            // Add one time to each shift date return new shift but withou _id
            const newShifts = previousWeekShifts.map(shift => {
                const newShift = {
                    date: new Date(
                        (shift.date.setHours(0, 0, 0, 0) + 
                        ((dateControl === 'week' ?
                            7
                        : dateControl === '2week' ?
                            14
                        : dateControl === '4week' ?
                            28
                        : 1)
                        * 24 * 60 * 60 * 1000))
                        ),
                    employee: shift.employee,
                    scheduledBy: shift.scheduledBy,
                    business: shift.business,
                    position: shift.position,
                    startTime: shift.startTime,
                    endTime: shift.endTime,
                    color: shift.color,
                    isConfirmed: shift.isConfirmed,
                }
                return newShift;
            });

            const newShiftsObj = await Shift.insertMany(newShifts);

            return res.status(200).json(newShiftsObj);
        } else {
            return res.status(400).json({
                msg: 'You are not authorized to create shift'
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
}


// @desc   Pick up a shift
// @route  POST /api/shifts/pickup/:id
// @access Private
const pickUpShift = async (req, res) => {
    try {
        const shift = await Shift.findById(req.params.id).populate('business').populate('scheduledBy');

        if (!shift) {
            return res.status(400).json({
                msg: 'No shift found'
            });
        }

        // Check if user is an employee of shift's business
        const userEmployee = await Employee.findOne({ user: req.user._id, business: shift.business });

        if(!userEmployee) {
            return res.status(400).json({
                msg: 'You are not an employee of this business'
            });
        }

        shift.isConfirmed = true;
        shift.employee = userEmployee._id;

        const updatedShift = await shift.save();

        shift.employee = userEmployee;

        return res.status(200).json(updatedShift);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error' });
    }
}


module.exports = {
    getAllBusinessShifts,
    getUserShifts,
    getManagerOpenShifts,
    createShift,
    editShift,
    deleteShift,
    copyPreviousWeekShifts,
    pickUpShift
};