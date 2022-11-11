const { connect, connection } = require('mongoose');
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

connect( process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/claimsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;