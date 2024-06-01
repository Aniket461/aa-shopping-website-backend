const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        required: true
    }, 
    qty:{
        type:Number,
        required:true,
    }, 
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
    
}) 
  
module.exports = Product = new mongoose.model("Product", productSchema)