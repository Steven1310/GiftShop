const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/GiftShop");

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: String,
    required: [true, "The first name is required kindly specify one"],
  },
  count: { type: Number, required: true },
  originalCount: { type: Number, required: true },
  /*name: {
    type: String,
    required: [true, "The product name is required, please specify one"],
  },
  category: {
    type: String,
    required: [true, "The cathegory name is required, please specify one"],
  },
  image: {
    type: String,
    required: [true, "The image name is required, please specify one"],
  },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  countInStock: { type: Number, required: true },*/
});

//compiling the schema into model
const Cart = mongoose.model("Cart", cartSchema);

//Insert several documents using modelName.insertMany(array of documents)
cartArray = [
  new Cart({
    user: "xyz",
    name: "Nike Wmns Air Max 90",
    category: "Fashion",
    image: "p1.jpg",
    price: 411,
    count: 3,
    brand: "Nike",
    description: "high quality product",
    countInStock: 15,
  }),
  new Cart({
    user: "xyz",
    name: "Shower and body set",
    category: "Spa",
    image: "p2.jpg",
    price: 30,
    count: 5,
    brand: "Lush Canada",
    description: "relaxation  product",
    countInStock: 15,
  }),
  new Cart({
    user: "xyz",
    name: "Wireless In-Ear Headphones",
    category: "Tech",
    image: "p3.jpg",
    price: 220,
    count: 15,
    brand: "JBl",
    description: "high quality sound product",
    countInStock: 15,
  }),
];
//console.log(cartArray);

async function insertAll() {
  let result = await Cart.insertMany(cartArray, (err) => {
    console.log(err);
  });
  // use result here
}

//insertAll();

module.exports = Cart;
