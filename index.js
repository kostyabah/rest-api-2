// import express server | js framework for server-side network applications
const express = require('express');

// library used as middleware used for handling Node.js requests
const bodyParser = require('body-parser');

// import mongoose | mongoose manages relationship between data and provides schema validation
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
var promise = mongoose.connect('mongodb://localhost/ninjago', {

  // added to skip deprecation error
  useMongoClient: true,
});

// using promise and global to use mongoose anywhere as Async when writing mongoose
mongoose.Promise = global.Promise;

//set up static files
app.use(express.static('public'));

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    
// to see properties of message in our console
console.log(err);

// 422 status: request that  is well-formed, however, due to semantic errors it is unable to be processed
res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 4000, function(){ // use port 4000 unless there exists a preconfigured port
    console.log('now listening for requests');
});
