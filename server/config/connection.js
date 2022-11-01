const { connect, connection } = require('mongoose');
//const mongoose = require('mongoose');
require('dotenv').config();

connect( 'mongodb://127.0.0.1:27017/claimsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;