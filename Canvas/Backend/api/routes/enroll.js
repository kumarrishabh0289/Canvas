const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Enroll = require('../models/enroll');


router.get('/', (req, res, next) => {
    Enroll.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
   
});

router.get('/one', (req, res, next) => {
    Enroll.findOne().sort({ enroll_id: 'desc', _id: -1 }).limit(1)
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
   
});

router.post('/', (req, res, next) => {
    
    const enroll = new Enroll({
        _id : new mongoose.Types.ObjectId(),
        permission:  req.body.permission,
        course_id: req.body.course_id,
        student : req.body.student,
        status: req.body.status,
        enroll_id:req.body.enroll_id,
    });
    enroll
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: "Enrollment Done",
        
    });
});

module.exports = router;