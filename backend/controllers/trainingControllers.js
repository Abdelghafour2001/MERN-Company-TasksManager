const Training = require('../models/trainingModel');
const Company = require('../models/companyModel');



// @route   GET api/training/
// @desc    Get trainings
// @access  Private
const getTrainings = async (req, res) => {
    try {
        const { company, positions } = req.query;

        const trainings = await Training.find({
            company: company,
            positions: { $in: positions }
        });

        res.status(200).json(trainings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   POST api/training/
// @desc    Create a training
// @access  Private
const createTraining = async (req, res) => {
    try {
        const company = await Company.findById(req.body.company);

        if (!company) {
            return res.status(400).json({ msg: 'Company not found' });
        }

        if(company.owners.includes(req.user._id.toString())) {
            const newTraining = new Training({
                title: req.body.title,
                user: req.user._id,
                company: req.body.company,
                positions: req.body.positions,
                sections: req.body.sections
            });

            await newTraining.save();

            res.status(200).json(newTraining);
        } else {
            return res.status(400).json({ msg: 'You are not authorized to create trainings for this company' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   PUT api/training/:id
// @desc    Update a training
// @access  Private
const updateTraining = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);

        if (!training) {
            return res.status(400).json({ msg: 'Training not found' });
        }

        const company = await Company.findById(training.company);

        if (!company) {
            return res.status(400).json({ msg: 'Company not found' });
        }

        if(company.owners.includes(req.user._id)) {
            const updatedTraining = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });

            res.status(200).json(updatedTraining);
        } else {
            return res.status(400).json({ msg: 'You are not authorized to update trainings for this company' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @route   DELETE api/training/:id
// @desc    Delete a training
// @access  Private
const deleteTraining = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);

        if (!training) {
            return res.status(400).json({ msg: 'Training not found' });
        }

        const company = await Company.findById(training.company);

        if (!company) {
            return res.status(400).json({ msg: 'Company not found' });
        }

        if(company.owners.includes(req.user._id)) {
            await Training.findByIdAndRemove(req.params.id);

            res.status(200).json({ msg: 'Training removed' });
        } else {
            return res.status(400).json({ msg: 'You are not authorized to delete trainings for this company' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


module.exports = {
    getTrainings,
    createTraining,
    updateTraining,
    deleteTraining
};