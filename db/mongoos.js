const mongoose = require('mongoose');
// Setup to use promises
mongoose.Promise = global.Promise;
// Connect to mongodb
mongoose.connect('mongodb://localhost:27017/ToDoApp');
module.exports = {mongoose};