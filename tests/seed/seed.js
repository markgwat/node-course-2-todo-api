const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo, User} = require('./../../server/model');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'andrew@ex.com',
    password: 'password',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id:userOneId, access: 'auth'}, 'abc123').toString()
    }]
},{
    _id: userTwoId,
    email: 'amarkw@ex.com',
    password: 'password'
    
}];

const todos = [{
    _id: new ObjectID(),
    text: 'test one'
},{
    _id: new ObjectID(),
    text: 'test two',
    completed: true,
    completedAt: 333
}]

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
}
const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
}
module.exports = {todos, populateTodos, users, populateUsers};