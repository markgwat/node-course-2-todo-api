require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose} = require('../db/mongoos');
var {Todo,User} = require('./model');

var app = express();
// Heroku
const port = process.env.PORT;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log('server started on '+port)
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
});
// GET REQUEST /todos/234234234
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    // validate ID
    if(!ObjectID.isValid(id)) {
        // respond with 404 if bad
        return res.status(404).send();
    }
    // Request by id to Todo
    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }else{
            return res.send(todo);
        }
    }, (e) => {
        // error 400
        return res.status(400).send();
    });
    
        //s    res.send(req.params);
});

// DELETING 
app.delete('/todos/:id', (req, res) => {
    // Get Id 
    var id = req.params.id;
    // validate ID
    if(!ObjectID.isValid(id)) {
        // respond with 404 if bad
        return res.status(404).send();
    }
    // remove Todo by ID
    Todo.findOneAndDelete( {_id:id} ).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }else{
            return res.send({todo:todo});
        }

    }, (e) => {
        return res.status(400).send();
    })
});


// PATCHING
app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    // validate ID
    if(!ObjectID.isValid(id)) {
        // respond with 404 if bad
        return res.status(404).send();
    }
    if(_.isBoolean(body.complete) && body.completed) {
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });
 
});

// POST users
app.post('/users', (req, res) => {
    
    var body = _.pick(req.body, ['email', 'password']);
    
    var user = new User(body);
    user.save().then((user) => {
       return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch( (e) => {
        res.status(400).send(e);
    });

});

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
