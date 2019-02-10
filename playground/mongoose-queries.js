const {ObjectID} = require('mongodb');

const {mongoose} = require('./../db/mongoos');
const {Todo, User} = require('./../server/model');

var id = '5c5e7ec26907296acad0ea86';

if(!ObjectID.isValid(id)) {
    console.log('ID NOT VALID');
}

Todo.find({
    _id: id
}).then((todos) =>{
    if(!todos){
        return console.log('No results');
    } 
    console.log('Todos', todos);
});
Todo.findOne({
    _id: id
}).then((todos) =>{
    if(!todos){
        return console.log('No results');
    }
    console.log('Todo one :', todos);
});
Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log('No results');
    }
    console.log('Todo by ID :', todo);
}, (e) => {
    console.log(e);
});

User.findById("5c5e442b499dc449c146aa89").then((user) => {
    console.log('User', user);
}, (e) => {
    console.log(e);
});
//ObjectId("5c5e442b499dc449c146aa89")