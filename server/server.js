var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('../db/mongoos');
var {Todo,User} = require('./model');

var app = express();
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('server started on 3000')
})
// POST ADDING A TO DO
app.post('/todos', (req, res) => {
    var todo = new Todo({
            text:req.body.text,
            completed: true,
            completedAt: Date.now()
        });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
        
    console.log(req.body);
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
})

module.exports = { app };
// var newTodo = new Todo({
//     text:'Coooked breakfast',
//     completed: true,
//     completedAt: Date.now()
// });

// newTodo.save().then(() => {
//     console.log('Saved');
// }, (e) => {
//     console.log('Unable to Save');
// });



// var newUser = new User({
//     email: 'mark@mark.com'
// });
// newUser.save().then(() => {
//     console.log('saved user')
// }, (e) => {
//     console.log('Error saving user')
// });
