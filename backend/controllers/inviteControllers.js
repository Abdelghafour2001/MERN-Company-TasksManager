const Employee = require('../models/employeeModel');
const Business = require('../models/businessModel');
const User = require('../models/userModel');
const Invite = require('../models/inviteModel');
const Company = require('../models/companyModel');


// @desc   Get all users invites
// @route  GET /api/invites/
// @access Private
const getUserInvites = async (req, res) => {
    try {
        const invites = await Invite.find({
            receiver: req.user.email,
            status: 'pending'
        })
        .populate('company')

        const invitesSent = await Invite.find({
            sender: req.user._id,
            status: 'pending'
        })

        const company = await Company.findOne({user: req.user});
        const invitesCompany = await Invite.find({
            receiver: company?.email,
            status: 'pending'
        })
        .populate('sender')

        res.status(200).json({invites, invitesCompany, invitesSent});
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Server Error'
        });
    }
}


// @desc   Create invite
// @route  POST /api/invites/
// @access Private
const createInvite = async (req, res) => {
    try {
        if(req.body.to === 'company') {
            const company = await Company.findOne({email: req.body.receiver});

            if (!company) {
                return res.status(400).json({
                    msg: 'Company does not exist'
                });
            }

            const invite = await Invite.findOne({ sender: req.user._id, status: 'pending', company: company });

            if (invite) {
                return res.status(400).json({
                    msg: 'You have already sent an invite to this company'
                });
            }

            const newInvite = new Invite({
                sender: req.user._id,
                receiver: req.body.receiver,
                company: company,
                to: req.body.to
            });

            await newInvite.save();

            res.status(200).json({
                msg: 'Invite sent successfully',
                invite: newInvite
            });
        } else if(req.body.to === 'user') {
            const user = await User.findOne({email: req.body.receiver});

            if (!user) {
                return res.status(400).json({
                    msg: 'User does not exist'
                });
            }

            const company = await Company.findById(req.body.company);

            if (!company) {
                return res.status(400).json({
                    msg: 'Company does not exist'
                });
            }

            if(!company.owners.includes(req.user._id)) {
                return res.status(400).json({
                    msg: 'You are not an owner of this company'
                });
            }

            const invite = await Invite.findOne({ sender: req.user._id, receiver: req.body.receiver, status: 'pending' });

            if (invite) {
                return res.status(400).json({
                    msg: 'You have already sent an invite to this user'
                });
            }

            const newInvite = new Invite({
                sender: req.user._id,
                receiver: req.body.receiver,
                to: req.body.to,
                company: req.body.company
            });

            await newInvite.save();

            res.status(200).json({
                msg: 'Invite sent successfully',
                invite: newInvite
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Server Error'
        });
    }
}


// @desc   Update invite
// @route  PUT /api/invites/:id
// @access Private
const updateInvite = async (req, res) => {
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            msg: 'Please enter status. (pending, accepted, rejected)'
        });
    }

    try {
        const invite = await Invite.findById(req.params.id);

        if (!invite) {
            return res.status(400).json({
                msg: 'Invite does not exist'
            });
        }
        const company = await Company.findOne(invite.company);

        if(!company) {
            return res.status(400).json({
                msg: 'Company does not exist'
            });
        }
        
        if(invite.to === 'company') {
            if (company.owners.includes(req.user._id)) {
                return res.status(400).json({
                    msg: 'You are not allowed to update this invite'
                });
            }
    
            invite.status = status;
    
            await invite.save();

            if(invite.status === 'accepted') {
                company.employees.push(invite.sender);
                await company.save();
            }
    
            res.status(200).json({
                msg: `Invite ${invite.status} successfully`,
                invite
            });

        } else if (invite.to === 'user') {
            if (invite.receiver !== req.user.email) {
                return res.status(400).json({
                    msg: 'You are not allowed to update this invite'
                });
            }

            invite.status = status;

            await invite.save();

            if(invite.status === 'accepted') {
                company.employees.push(req.user);
                await company.save();
            }

            res.status(200).json({
                msg: `Invite ${invite.status} successfully`,
                invite
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Server Error'
        });
    }
}


// @desc   Delete invite
// @route  DELETE /api/invites/:id
// @access Private
const deleteInvite = async (req, res) => {
    try {
        const invite = await Invite.findById(req.params.id);

        if (!invite) {
            return res.status(400).json({
                msg: 'Invite does not exist'
            });
        }

        if (invite.sender.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                msg: 'You are not allowed to delete this invite'
            });
        }

        await invite.remove();

        res.status(200).json(invite);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Server Error'
        });
    }
}


module.exports = {
    getUserInvites,
    createInvite,
    updateInvite,
    deleteInvite
}