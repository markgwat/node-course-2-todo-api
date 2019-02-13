const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';
var passhas='';
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        passhas = hash;
    })
})

bcrypt.compare(password, passhas, (err, res) => {
    console.log(res);
})



var data = {
    id: 10
};
var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log(decoded);


// var message = ' I ASM SU PA MAN ';
// var hash = SHA256(message).toString();
// console.log(message, hash);
// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesalt').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data)+'somesalt').toString();
// if(resultHash === token.hash){
//     console.log('Verified');
// } else {
//     console.log('Not working');
// }