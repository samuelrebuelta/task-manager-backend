const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../../config')

exports.createToken = function (user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(1, 'year').unix()
    }

    return jwt.sign(payload, config.SECRET_TOKEN);
}