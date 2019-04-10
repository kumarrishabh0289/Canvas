const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const productRoutes = require('./api/routes/products');
const userRoutes = require('./api/routes/user');
const profileRoutes = require('./api/routes/profile');
const courseRoutes = require('./api/routes/course');
const enrollRoutes = require('./api/routes/enroll');

const SecretprofileRoutes = require('./api/routes/secretprofile');
var passport = require("passport");
var passportJWT = require("passport-jwt");

require('./api/auth/auth');



mongoose.connect('mongodb+srv://rishabh53:' +
process.env.MONGO_PASSWORD+ 
'@cluster0-dvu2r.mongodb.net/canvas?retryWrites=true',
{
    useNewUrlParser: true
}
);
mongoose.set('useCreateIndex', true)
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


app.use(passport.initialize());



var passport = require("passport");



app.post("/secret", passport.authenticate('jwt', { session : false }), function(req, res){

    console.log("success",req.body.data);
    
    res.json({'message': "Success"});
  });

app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/secretprofile', passport.authenticate('jwt', { session : false }),  SecretprofileRoutes);
app.use('/profile',  profileRoutes);
app.use('/course',  courseRoutes);
app.use('/enroll',  enrollRoutes);

app.use((req, res, next) => {
    const error = new Error('Api not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;