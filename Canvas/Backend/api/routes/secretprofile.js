const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Profile = require('../models/profile');
var kafka = require('../kafka/client');


router.get('/', (req, res, next) => {
    Profile.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

router.get('/email', (req, res, next)=>{
    const email = req.query.email;
    Profile.findOne({ email: email })
        .exec()
        .then(doc => {
        console.log("From database",doc);
        if (doc){
            res.status(200).json(doc);
        }
        else {
            res.status(404).json({message:"not a valid Email ID"});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })
        
});

router.get('/kafkaprofile', (req, res, next)=>{
    kafka.make_request("profile", req, function(err, result){
        if(err){
            console.log("Error in adding question.", err);
        }
        if (result){
            console.log("from Kafka",result);
            res.status(200).json(result);
        }
        else {
            res.status(404).json({message:"not a valid Profile"});
        }
    });
        
});




module.exports = router;