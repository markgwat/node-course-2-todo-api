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
    // db.collection('Todos').find({
    //     _id: new ObjectId('5c5d0fb7820a06622c8921a0')
    //     }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err)=>{
    //     console.log('Unable to fetch', err)
    // });

    db.collection('Todos').find().count().then((count)=>{
        console.log('Todos count '+count);
    }, (err)=>{
        console.log('Unable to fetch', err)
    });
    
    client.close();
});