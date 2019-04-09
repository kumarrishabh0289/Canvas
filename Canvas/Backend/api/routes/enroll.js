const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Enroll = require('../models/enroll');
const Course = require('../models/course');


router.get('/', (req, res, next) => {
    Enroll.find()
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

router.get('/one', (req, res, next) => {
    Enroll.findOne().sort({ enroll_id: 'desc', _id: -1 }).limit(1)
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

router.post('/', (req, res, next) => {

    Course.findOne({ course_id: req.body.course_id })
        .exec()
        .then(course => {
            console.log("From database", course);
            if (course) {

                var capacity = course.capacity;
                var waiting = course.waiting;
                var current_wait = course.current_wait;
                current_wait = current_wait + 1;
                var total_enroll = course.total_enroll;
                total_enroll = total_enroll + 1;
                if (total_enroll >= capacity) {
                    console.log("Class is Full");
                    if (current_wait >= waiting) {
                        console.log("Exceeded Max wait limit for this class");
                        res.status(201).json({
                            message: "Exceeded Max wait limit for this class"

                        });


                    }
                    else {
                        console.log("available for waitlist, Current Waitlist", current_wait);
                        Enroll.findOne().sort({ enroll_id: 'desc', _id: -1 }).limit(1)
                        .exec()
                        .then(docs => {
                            console.log(docs);
                            var enroll_id = Number(docs.enroll_id) + 1;
                            const enroll = new Enroll({
                                _id: new mongoose.Types.ObjectId(),
                                permission: req.body.permission,
                                course_id: req.body.course_id,
                                student: req.body.student,
                                status: "waitlist",
                                enroll_id: enroll_id,
                            });
                            enroll
                                .save()
                                .then(result => {

                                    console.log(result);

                                    Course.update({ course_id: req.body.course_id }, { $set: {current_wait:current_wait} })
                                        .exec()
                                        .then(result => {
                                            console.log(result);
                                         
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.status(500).json({
                                                error: err
                                            });
                                        });
                                })
                                .catch(err => console.log(err));
                            res.status(201).json({
                                message: "Enrollment Done With Wait-List",
                                current_wait: current_wait,

                            });

                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            })
                        })
                    }
                }
                else {
                    console.log("Avalable for Enroll, Current Status:", total_enroll);
                    Enroll.findOne().sort({ enroll_id: 'desc', _id: -1 }).limit(1)
                        .exec()
                        .then(docs => {
                            console.log(docs);
                            var enroll_id = Number(docs.enroll_id) + 1;
                            const enroll = new Enroll({
                                _id: new mongoose.Types.ObjectId(),
                                permission: req.body.permission,
                                course_id: req.body.course_id,
                                student: req.body.student,
                                status: "enrolled",
                                enroll_id: enroll_id,
                            });
                            enroll
                                .save()
                                .then(result => {

                                    console.log(result);

                                    Course.update({ course_id: req.body.course_id }, { $set: {total_enroll:total_enroll} })
                                        .exec()
                                        .then(result => {
                                            console.log(result);
                                         
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.status(500).json({
                                                error: err
                                            });
                                        });
                                })
                                .catch(err => console.log(err));
                            res.status(201).json({
                                message: "Enrollment Done",
                                total_enroll: total_enroll,

                            });

                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            })
                        })
                }


            }
            else {
                res.status(404).json({ message: "not a valid Course" });
            }

        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

module.exports = router;