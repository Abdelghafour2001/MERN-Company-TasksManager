const Task = require('../../models/task/taskModel');
const TaskList = require('../../models/task/taskListModel');
const Employee = require('../../models/employeeModel');


// @route   GET api/tasks/:taskListId?date=yyyy-mm-dd&business=businessId
// @desc    Get a task
// @access  Private
const getAllTasksForList = async (req, res) => {
    try {
        const tasks = await Task.find({
            taskList: req.params.taskListId,
            business: req.query.business,
            completedDate: {
                $gte: new Date(req.query.date).setHours(0, 0, 0, 0), // req.query.date from frontend in format yyyy-mm-dd
                $lt: new Date(req.query.date).setHours(23, 59, 59, 999)
            }
        }).populate('completedBy');

        return res.status(200).json(tasks);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};


// @route   GET api/tasks
// @desc    Get get Recent User Tasks is limited of 10
// @access  Private
const getRecentUserTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ completedBy: req.user.id }).limit(10).sort({ completedDate: -1 });

        return res.status(200).json(tasks);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};


// @route   POST api/tasks
// @desc    Create a task
// @access  Private
const createTask = async (req, res) => {
    try {
        const taskList = await TaskList.findById(req.params.taskListId);

        if (!taskList) {
            return res.status(400).json({ msg: 'Task List not found' });
        }

        // check if task was already completed for this day
        const task = await Task.findOne({
            taskItem: req.body.taskItem,
            taskList: req.params.taskListId,
            business: req.body.business,
            completedDate: {
                $gte: new Date(req.body.completedDate.split('T')[0]).setHours(0, 0, 0, 0),
                $lt: new Date(req.body.completedDate.split('T')[0]).setHours(23, 59, 59, 999)
            }
        }).populate('completedBy');

        if (task) {
            return res.status(400).json({ msg: `Task already completed for this day by ${task.completedBy.firstName} ${task.completedBy.lastName}` });
        }

        const newTask = new Task({
            taskItem: req.body.taskItem,
            taskList: taskList._id,
            business: req.body.business,
            completedDate: req.body.completedDate,
            completedBy: req.user,
        });

        await newTask.save();
        return res.status(200).json(newTask);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server Error' });
    }
}


// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(400).json({ msg: 'Task not found' });
        }
        
        if (task.completedBy.toString() === req.user._id.toString()) {
            await task.remove();
            return res.status(200).json(task);
        } else {
            return res.status(400).json({ msg: 'You are not authorized to delete a task' });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server Error' });
    }
}


module.exports = {
    getAllTasksForList,
    getRecentUserTasks,
    createTask,
    deleteTask
};