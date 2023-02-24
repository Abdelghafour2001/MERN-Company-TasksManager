const TaskList = require('../../models/task/taskListModel');
const Employee = require('../../models/employeeModel');
const Company = require('../../models/companyModel');
const Business = require('../../models/businessModel');


// @route   GET api/tasks/list/business
// @desc    Get all task lists for a company
// @access  Private
const getAllCompanyTaskLists = async (req, res) => {
    try {
        const company = await Company
        .findOne({ 
            employees: req.user._id,
        })
        .populate('businesses');

        const totalBusinesses = [];

        if(company.owners.includes(req.user._id)) {
            company.businesses.forEach(business => {
                totalBusinesses.push(business);
            });
        } else {
            const userEmployee = await Employee.find(
                { 
                    user: req.user._id,
                    company: company._id,
                    isManager: true 
                }).populate('business');
            
            userEmployee.forEach(employee => {
                totalBusinesses.push(employee.business);
            });
        }

        const taskLists = await TaskList
        .find({ 
            businesses: { $in: totalBusinesses }
        })
        .populate('businesses');

        return res.status(200).json(taskLists);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @route   GET api/tasks/list/user
// @desc    Get all task lists for a user
// @access  Private
const getAllUserTaskLists = async (req, res) => {
    try {
        const userEmployee = await Employee.find({ user: req.user._id});

        if (!userEmployee || userEmployee.length === 0) {
            return res.status(200).json(null);
        }

        const taskLists = await TaskList
            .find({ company: userEmployee[0].company })
            .populate('businesses');

        const userLists = [];

        taskLists.forEach(taskList => {
            userEmployee.forEach(employee => {
                if (taskList.businesses.find(business => business._id.toString() === employee.business.toString()) && taskList.positions.includes(employee.position)) {
                    const userTaskList = {
                        ...taskList._doc,
                        businesses: taskList.businesses.filter(business => business._id.toString() === employee.business.toString()),
                        positions: [employee.position]
                    }
                    userLists.push(userTaskList);
                }
            });
        });

        return res.status(200).json(userLists);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @route   GET api/tasks/list/search
// @desc    Search for task lists
// @access  Private
const searchTaskLists = async (req, res) => {
    try {
        const { business } = req.query;
        const taskLists = await TaskList.find({
            businesses: business
        }).populate('businesses');

        return res.status(200).json(taskLists);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @route   POST api/tasks/list
// @desc    Create a task list
// @access  Private
const createTaskList = async (req, res) => {
    try {
        const { businesses, positions, title, frequency, color, taskItems, company } = req.body;

        const companyObj = await Company.findById(company);

        if (!companyObj) {
            return res.status(400).json({msg: 'Company not found'});
        }

        const employee = await Employee.findOne({ user: req.user._id, company: company._id, isManager: true });

        if(
            employee ||
            companyObj.owners.includes(req.user._id)
        ) {
            const taskList = await TaskList.create({
                businesses,
                company,
                positions,
                title,
                frequency,
                color,
                taskItems,
                createdBy: req.user._id
            });

            const newTaskList = await taskList.save();

            return res.status(200).json(newTaskList);
        } else {
            return res.status(400).json({msg: 'You are not authorized to create a task list'});
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @route   PUT api/tasks/list/:id
// @desc    Update a task list
// @access  Private
const updateTaskList = async (req, res) => {
    try {
        const taskList = await TaskList.findById(req.params.id).populate('businesses');

        if (!taskList) {
            return res.status(400).json({msg: 'Task list not found'});
        }

        const company = await Company.findById(taskList.company);

        if (!company) {
            return res.status(400).json({msg: 'Company not found'});
        }

        const employee = await Employee.findOne({ user: req.user._id, business: taskList.businesses, isManager: true });

        if(
            (employee) || company.owners.includes(req.user._id)
        ) {
            if(req.body.action === 'addTaskItem') {
                taskList.taskItems.push(req.body.taskItem);
            } else if(req.body.action === 'removeTaskItem') {
                // Remove task item from task list by task item _id
                taskList.taskItems = taskList.taskItems.filter(taskItem => taskItem._id.toString() !== req.body.taskItemId);
            } else {
                const updatedTaskList = await TaskList.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('businesses');

                return res.status(200).json(updatedTaskList);
            }
            
            await taskList.save();

            return res.status(200).json(taskList);
        } else {
            return res.status(400).json({msg: 'You are not authorized to update a task list'});
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


// @route   DELETE api/tasks/list/:id
// @desc    Delete a task list
// @access  Private
const deleteTaskList = async (req, res) => {
    try {
        const employee = await Employee.findOne({ user: req.user._id, business: req.body.business }).populate('company');

        if (!employee) {
            return res.status(400).json({msg: 'You are not an employee of this business'});
        }

        if(employee.isManager || employee.company.owners.includes(req.user._id)) {
            const taskList = await TaskList.findById(req.params.id);

            if (!taskList) {
                return res.status(400).json({msg: 'Task list not found'});
            }

            await taskList.remove();

            return res.status(200).json({taskList, msg: 'Task list deleted'});
        } else {
            return res.status(400).json({msg: 'You are not authorized to delete a task list'});
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }
}


module.exports = {
    getAllCompanyTaskLists,
    getAllUserTaskLists,
    searchTaskLists,
    createTaskList,
    updateTaskList,
    deleteTaskList
}