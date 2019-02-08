//const MongoClient = require('mongodb').MongoClient;
// Object destructuring
const {MongoClient, ObjectId} = require('mongodb');
// useful id function
var obj = new ObjectId();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');
    
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Failed to insert', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //   //  _id:123,
    //     name: 'Mark Watson 2',
    //     age: 40,
    //     location: 'Australia'
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Failed insert', err);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // })

    // Insert new doc into Users (name,age, location)
    client.close();
});