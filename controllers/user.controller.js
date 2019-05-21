
const controller = {};
const User = require('../models/User.model');

controller.listUsers = (_req, res) => {
    User
        .find({})
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({status: false, msg: 'Could not get list of users'});
        });
};

controller.getUser = (req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({ status: false, msg: 'Provide id to get user info '});
    } else {
        User
            .findById(id)
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({status: false, msg: 'Could not get user with id: ' + id});
            });
    }
};

controller.delete = (req, res) => {
    const { id } = req.params;
    if (!id){
        return res.status(400).json({ status: false, msg: 'Provide id to delete user'});
    } else {
        User
            .findByIdAndDelete(id)
            .then(() => {
                res.json({status: true, msg: 'User deleted with id: ' + id});
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({status: false, msg: 'Could not delete user with id: ' + id});
            })
    }
};

controller.update = (req, res) => {
    const { id } = req.params;
    if (!id){
        return res.status(400).json({ status: false, msg: 'Provide id to update user'});
    } else {
        User 
            .findByIdAndUpdate(id, { upsert: true, new: true })
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({status: false, msg: 'Could not update user with id: ' + id});
            })
    }
};

module.exports = controller;