const mongoose = require('mongoose');
const config = require('../config')

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('CONNECTED TO DATABASE! :)'))
    .catch((error) => console.log('CONNECTION FAILED! :(', error));