
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};
// Add method/s
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    
   // user.tokens.push({access, token});
    user.tokens = user.tokens.concat([{
        access,
        token
    }]);


    return user.save().then(() => {
        return token;
    });
};
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
         decoded = jwt.verify(token,'abc123');
         console.log(decoded);
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
    
};
// Encrypt password in middleware
UserSchema.pre('save', function (next){
    var user = this;
    if(user.isModified('password')){
       
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
        
    } else{
        next();
    }
});

var User = mongoose.model('User', UserSchema);
// User 
// var User = mongoose.model('User', {
//     email: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true,
//         unique: true,
//         validate: {
//             validator: (value) => {
//                 return validator.isEmail(value);
//             },
//             message: '{VALUE is not a valid email'
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 6
//     },
//     tokens: [{
//         access: {
//             type: String,
//             required: true
//         },
//         token: {
//             type: String,
//             required: true
//         }
//     }]
// });


module.exports = {Todo,User,UserSchema};