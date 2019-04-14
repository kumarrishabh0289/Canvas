const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');
var jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {

    kafka.make_request("login", req, function (err, result) {
        if (err) {
            console.log("Error in adding question.", err);
        }
        if (result) {

            console.log("login Successfull.", result);
            res.cookie('cookie', 'cookie', { maxAge: 900000, httpOnly: false, path: '/' });

            const body = { user: result.name };
            const token = jwt.sign({ user: body }, 'rishabh');
            res.status(200).json({
                email: result.email,
                name: result.name,
                role: result.role,
                jwt: 'Bearer ' + token,
            });
        }
        else {
            res.status(404).json({ message: "not a valid ID" });
        }
    });

});

router.post('/signup', (req, res, next) => {

    kafka.make_request("signup", req, function (err, result) {
        if (err) {
            console.log("Error in adding question.", err);
        }
        if (result) {

            console.log("User Created Successfull.", result);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("User Created");

        }
        else {
            res.status(404).json({ message: "not a valid Inputs" });
        }
    });

});



module.exports = router;