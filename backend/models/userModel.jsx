const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/GiftShop/User");

const userSchema= new mongoose.Schema({
    name: { type: String, required: [true, "The fisrt name is required, please specify one"]},
    email: {type: String, required: [true, "The email is required, please specify one"], unique:true},
    password: { type: String, required: true },
  //  isAdmin: { type: Boolean, default: false, required: true}
  });

  const User = mongoose.model('User', userSchema);

  const user = new User({
    name: "John",
    email:"Smith@gmail.com",
    password:"1234"
   // isAdmin:true
})

user.save();

user.save((err)=>
{
    if(err) console.log(err);
})
console.log(user);

export default User;