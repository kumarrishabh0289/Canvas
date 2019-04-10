function handle_request(message, callback){
    // Product.find()
    //     .exec()
    //     .then(docs => {
    //         console.log(docs);
            callback(null, {docs:"this is test"});
        // })
        // .catch(err =>{
        //     console.log(err);
        //     // res.status(500).json({
        //     //     error:err
        //     // })
        //     callback(err, null);
        // })
}

exports.handle_request = handle_request;