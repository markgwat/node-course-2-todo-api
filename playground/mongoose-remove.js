const {ObjectID} = require('mongodb');

const {mongoose} = require('../db/mongoos');
const {Todo, User} = require('../server/model');

Todo.remove({}).then((result) => {
    console.log(result)
});

// Todo.findOneAndRemove

//deleteOne, deleteMany, or bulkWrite
// http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#findOneAndDelete
Todo.findOneAndDelete({_id:2342342}).then((result) => {

}, (e) => {
    console.log(e)
})