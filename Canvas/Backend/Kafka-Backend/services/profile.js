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
        poolSize: 100
    }
);
mongoose.set('useCreateIndex', true)

function handle_request(message, callback) {


    const email = message.query.email;
    Profile.findOne({ email: email })
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