const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : String,
    
    image : {
        
        filename: { type: String },
        url: { type: String}
        
    },
    price: Number,
    location: String,
    country:  String,
        
   
});

 
 module.exports = mongoose.model('Listing', listingSchema);