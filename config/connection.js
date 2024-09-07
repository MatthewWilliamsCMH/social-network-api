const { connect, connection } = require('mongoose'); //loads mongoose

const connectionString = 'mongodb://127.0.0.1:27017/social_db'; //sets connectionString variable to "mongodb...."; not strictly necessary; "mongodb..." could be used directly in the connect function.
connect(connectionString);

module.exports = connection;