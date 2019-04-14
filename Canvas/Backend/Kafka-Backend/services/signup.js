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


    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: message.body.email,
        name: message.body.name,
        password: mystr,
        role: message.body.role
    });
    user
        .save()
        .then(result => {
            console.log(result);

            const profile = new Profile({
                _id: new mongoose.Types.ObjectId(),
                email: message.body.email,
                image: "",
                mobile: "",
                about: "",
                city: "",
                country: "",
                company: "",
                school: "",
                hometown: "",
                languages: "",
                gender: "",

            });
            profile
                .save()
                .then(doc => {
                    console.log("Profile Created");
        
                        callback(null, {message:"User Created Sucessfully"});
        
                })
                .catch(err => {
                    callback(err, null);
                })
            })
            .catch(err => {
                callback(err, null);
            })



}

exports.handle_request = handle_request;