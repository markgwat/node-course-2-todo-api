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
    // deleteMany
    // db.collection('Todos').deleteMany({text: 'mooo',completed: true}).then((result) => {
    //     console.log(result);
    // })

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'mooo',completed: true}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    db.collection('Todos').findOneAndDelete({text: 'mooo',completed: true}).then((result) => {
         console.log(result);
     });

    // 

    client.close();
});