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
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectId('5c5d0fb7820a06622c8921a0')
    // }, {
    //     $set: {
    //         text: 'UPDATED'
    //     }
    //     }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });
    

    // 
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectId('5c5d1174b9193962a4e228b7')
    }, {
            $set: {
                name: 'Mark Jolly'
            },
            $inc: {
                age: 1
            }
        }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    client.close();
});