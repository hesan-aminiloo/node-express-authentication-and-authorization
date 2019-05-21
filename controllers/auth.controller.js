
const controller = {};
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const config = require('config');

controller.register = (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email){
        return res.status(400).send({ status: false, msg: 'Data is incomplete' });
    } else {
        User
            .find({ email })
            .then(users => {
                if (users.length){
                    return res.status(409).send({ status: false, msg: 'User already exists'});
                } else {
                    const user = new User(req.body);
                    user
                        .save()

                        .then(newUser => res.json(newUser))

                        .catch(err => {
                            console.log(err);
                            return res.status(500).send({ status: false, msg: 'Error creating the user'});
                        });
                }
            });
    }
};

controller.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password ){
        return res.status(400).send({ status: false, msg: 'Please enter email or username and password to login' });
    } else {
        User
            .findOne({ email })
            .then(user => {
                if(!user){
                    return res.status(404).send({ status: false, msg: 'User not found!' });
                } else {
                    user.comparePassword(password, function(err, isMatch){
                        if (err) throw new Error(err);
                        if(!err && isMatch){
                            let claims = {
                                expiresIn: '1h',
                                issuer: 'node-express-auth',
                                audience: 'hesanam.com'
                            };
                            jwt.sign({ username: user.username, email: user.email }, config.get('secret'), claims, (err, token) => {
                                if (err) throw new Error(err);
                                return res.json({ status: true, token });
                            });
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(500).send({ status: false, msg: 'Error in login' });
            });
    }
};

module.exports = controller;