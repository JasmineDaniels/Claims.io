const { connect, connection } = require('mongoose');
require('dotenv').config();

connect( process.env.MONGODB_TEMP, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;