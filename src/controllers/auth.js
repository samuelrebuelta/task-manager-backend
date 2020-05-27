const User = require('../models/user');
const service = require('../services/index');
const config = require('../../config');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const moment = require('moment');


// Sign up
exports.signUp = function signUp(req, res) {
    const { userName, password } = req.body;
    User.exists({ userName }).then(alreadyExists => {
        if (!alreadyExists) {
            const newUser = new User({ userName, password });
            newUser.save()
                .then((result) => {
                    const token = service.createToken(newUser);
                    res.status(200).json({ message: 'User created successfully', token, result });
                })
                .catch(error => res.status(400).json({ message: 'Error', error }));
        } else {
            res.status(401).send('This user name already exists');
        }
    })
}

// Sign in
exports.signIn = async function signIn(req, res) {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) return res.status(401).send('The username doesn´t exists');

    bcrypt.compare(password, user.password, (err, signIn) => {
        if (err) return res.status(401).send('Something was wrong');
        if (signIn) {
            const token = service.createToken(user);
            return res.status(200).json({ message: `Welcome back, ${userName}`, token })
        } else {
            return res.status(401).send('Wrong password');
        }
    });
}

// Verify token
exports.isAuth = function (req, res, next) {
    const token = req.headers['access-token'].split(' ')[1];
    if (token) {
        const payload = jwt.verify(token, config.SECRET_TOKEN);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'The token has expired' });
        }
        req.user = payload.sub;
        next();
    } else {
        return res.status(401).send('Unauthorized request.');
    }
}