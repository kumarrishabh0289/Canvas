const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var kafka = require('../kafka/client');
const Product = require('../models/product');


router.get('/kafka', (req, res, next) => {

    kafka.make_request("product", req, function(err, result){
        if(err){
            console.log("Error in adding question.", err);
        }
        else{                
            console.log("Property details saved successfully.", result);
            res.status(200).json(result);
        }
    });
    
});

router.get('/profile', (req, res, next) => {
    //We'll just send back the user details and the token
    res.json({
      message : 'You made it to the secure route',
      user : req.user,
      token : req.query.secret_token
    })
  });

// router.get('/', (req, res, next) => {
//     Product.find()
//         .exec()
//         .then(docs => {
//             console.log(docs);
//             res.status(200).json(docs);
//         })
//         .catch(err =>{
//             console.log(err);
//             res.status(500).json({
//                 error:err
//             })
//         })
   
// });

router.post('/', (req, res, next) => {
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: "Handling POST  to /product",
        CreatedProduct:product
    });
});

router.get('/', (req, res, next)=>{
    const id = req.query.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
        console.log("From database",doc);
        if (doc){
            res.status(200).json(doc);
        }
        else {
            res.status(404).json({message:"not a valid ID"});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })
        
});

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Error:err
            });
        });
});

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propname] = ops.value;
    }
    Product.update({_id : id}, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});
module.exports = router;