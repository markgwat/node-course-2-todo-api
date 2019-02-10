const mongoose = require('mongoose');
// Setup to use promises
mongoose.Promise = global.Promise;
// Connect to mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ToDoApp');
module.exports = {mongoose}; 