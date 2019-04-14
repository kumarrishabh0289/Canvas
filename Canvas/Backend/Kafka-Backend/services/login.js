const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../../api/models/user');
const Profile = require('../../api/models/profile');
var crypto = require('crypto');

mongoose.connect('mongodb+srv://rishabh53:rishu123.@cluster0-dvu2r.mongodb.net/canvas?retryWrites=true',
{
    useNewUrlParser: true
},
{
    poolSize:100
}
);
mongoose.set('useCreateIndex', true)

function handle_request(message, callback){
    

    var cipher = crypto.createCipher('aes-256-ecb', 'password');
    var mystr = cipher.update(message.body.password, 'utf8', 'hex') + cipher.final('hex');

    User.findOne({ email: message.body.username, password:mystr, role:message.body.role })
        .exec()
        .then(doc => {
            console.log("From database", doc);

                callback(null, doc);

        })
        .catch(err => {
            callback(err, null);
        })


}

exports.handle_request = handle_request;