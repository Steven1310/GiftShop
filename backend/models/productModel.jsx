const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/GiftShop");

const productSchema= new mongoose.Schema({
  

    
        name: {type:String, required: [true, "The product name is required, please specify one"]},
        category:{type:String, required:[true, "The cathegory name is required, please specify one"]},
        image:{type:String, required: [true, "The url name is required, please specify one"]},
        price: {type:Number, required:true},
        countInStock:{type:Number, required:true},
        brand: {type:String, required:true},
        rating: {type:Number, required:true},
        numReviews: {type:Number, required:true},
        description: {type:String, required:true},
  });

  const newProduct = mongoose.model('Product', productSchema);

  
module.exports = newProduct;