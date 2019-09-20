// import mongoose | mongoose manages relationship between data and provides schema validation
const mongoose = require('mongoose');

// creating the Schema that maps to our MongoDB colection
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({
    
    type: {

        // type string
        type: String,

        // location type must be 'Point'
        default: 'Point' 
    },

    // define coordinates template 
    coordinates: {

        // coordinates are an array on numbers (longitude, latitude)
        type: [Number],

        // define two-dimensional plane navigation, pay attention to: https://miro.medium.com/max/1464/1*GMGQWKkMnSdB4674zOTopg.png
        index: '2d'
    }
});

// create ninja Schema & model
const NinjaSchema = new Schema({
    // name filed template
    name: {
        // name type
        type: String,
        // name field can't be empty
        required: [true, 'Name field is required']
    },
    // rank model
    rank: {
        // type string
        type: String
    },
    // ninja status
    available: {
        // type boolean
        type: Boolean,
        // default status if not specified in POST request
        default: false,
        // field not required
        required: false
    },

    geometry: GeoSchema
});

const Ninja = mongoose.model('ninja', NinjaSchema);

// export encapsulated code
module.exports = Ninja;
