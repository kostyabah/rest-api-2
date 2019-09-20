// import express server
const express = require ('express');

// import Express router
const router = express.Router();

// import ninjas.js file
const Ninja = require('../models/ninja');

// get a list of ninjas from the db
router.get('/ninjas', function(req, res, next){ // request, response and callback argument to the middleware function
   
   // 
    Ninja.aggregate([{

       //Outputs elemets in order of nearest to farthest from a specified point
       $geoNear: {

        near: {
            type: 'Point',
            coordinates: [
                parseFloat(req.query.lng), // request longitude from ninja 
                parseFloat(req.query.lat) // request latitude from ninja
            ]},

        distanceField: "dist.calculated",

        maxDistance: 100000, // max distance that ninjas are seen by function that renders available ninjas

        spherical: true, // 2d index is spherical '2dsphere'
    },
}]).then(function(ninjas){ //if everything i ok send response
    res.send(ninjas);
}).catch(next); // catch the error
});

// add a new ninja to the db
router.post('/ninjas', function(req, res, next){ // request, response and callback argument to the middleware function
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});

// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){ // request, response and callback argument to the middleware function
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    }).catch(next);
});

// delete a ninja from the db
router.delete('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});

module.exports = router;