const mongoose = require('mongoose');
const env = require('../config/environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "error connecting to database"));

db.once('open', function(){
    console.log('Successfully connected to the database');
});

module.exports = db;