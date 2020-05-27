const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema(
    {
        userName: String,
        password: String
    }, { timestamps: true });

// Password encrypt 
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { next(); }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { next(err); }
            user.password = hash;
            next();
        })
    })
});

module.exports = model('User', userSchema);