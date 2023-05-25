const ProductModel = require("./models/productModel.jsx");
const Cart = require("./models/cartModel.js");

module.exports = (routeObj) => {
  // req.isAuthenticated is provided from the auth router
  routeObj.app.get("/", (req, res, next) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  });

  routeObj.app.get("/getUserData", routeObj.requiresAuth, (req, res) => {
    console.log("USER " + JSON.stringify(req.oidc.user));
    res.redirect("profile");
  });

  /***List all products***/
  routeObj.app.get("/api/ProductsInfo/", async (req, res) => {
    try {
      //
      ProductModel.find((err, products) => {
        if (err) console.log(err);
        else {
          console.log("Requested Products");
          res.send(products);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  /***Create new Product***/
  routeObj.app.post("/api/ProductsInfo", async (req, res) => {
    try {
      const newProduct = new ProductModel({
        ...req.body,
      });
      newProduct.save((err) => {
        if (err) {
          console.log(err); //maybe suring data validation no name etc...
          res.send(err);
        } else {
          console.log("The document inserted successfully");
          res.send(newProduct);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  /***Get details of a product***/
  routeObj.app.get("/api/product/:id", async (req, res) => {
    debugger;
    try {
      let _id = req.params.id;
      const product = ProductModel.findById(_id, function (err, product) {
        if (err) {
          res.status(404).send({ message: "Product Not Found " + err });
        } else {
          //console.log(product);

          res.send(product);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  const updateProduct = async (id, count) => {
    let result = "";
    try {
      ProductModel.updateOne({ _id: id }, { countInStock: count }, (err) => {
        if (err) {
          console.log(err);
          result = err;
        } else {
          console.log("The product updated successfully");
          result = "The item updated successfully";
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      return result;
    }
  };

  /***Update a specific product***/
  routeObj.app.put("/api/product/:id", async (req, res) => {
    try {
      console.log(req.params);
      let _id = req.params.id;
      //_id = mongoose.Types.ObjectId(_id);
      //console.log(_id);
      console.log(req.body);
      const { countInStock } = req.body;
      let result = updateProduct(_id, countInStock);

      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });

  //READ OPERATION
  /*app.get("/api/cart", async (req, res) => {
    let arr = [];
    try {
      //
      Cart.find((err, cartItem) => {
        if (err) console.log(err);
        else {
          cartItem.forEach((item) => {
            ProductModel.findById(item.product, (err, product) => {
              if (err) {
                throw err;
              } else {
                console.log(product);
                arr.push(product);
              }
            });
          });
          //
        }
      });
    } catch (error) {
      res.status(404);
      arr.push({ message: "Product Not Found " + error });
      console.log(error);
    } finally {
      console.log(arr);
      res.send(arr);
    }
  });*/

  /***Get listings of cart ***/
  routeObj.app.get("/api/cart", async (req, res) => {
    try {
      const cartItems = await Cart.find().exec();
      const arr = await Promise.all(
        cartItems.map(async (item, index) => {
          try {
            const product = await ProductModel.findById(item.product).exec();
            //console.log(product);
            return {
              ...product,
              count: cartItems[index].count,
              originalCount: cartItems[index].count,
              _id: cartItems[index]._id,
            };
          } catch (error) {
            throw error;
          }
        })
      );
      //console.log(arr);
      res.send(arr);
    } catch (error) {
      //console.log(error);
      res.status(404).send({ message: "Products Not Found " + error });
    }
  });

  /***Add Product to Cart***/
  routeObj.app.post("/api/cart", async (req, res) => {
    try {
      debugger;
      const { product, user, count } = req.body;
      console.log(product, user, count);
      const cartItem = new Cart({
        user: user,
        product: product,
        count: count,
        originalCount: count,
      });

      var item = await Cart.find({ product: cartItem.product }).exec();
      console.log("Found item:", item);
      //var item=cartItem.find((item)=>{item.name===cartItem.name})
      if (item.length === 0) {
        cartItem.save((err) => {
          if (err) {
            console.log(err);

            res.send(err);
          } else {
            updateProduct(product._id, product.countInStock - count);
            console.log("The item inserted successfully");

            res.send(cartItem);
          }
        });
      } else {
        Cart.updateOne(
          { _id: item[0]._id },
          { count: item[0].count + cartItem.count },
          (err) => {
            if (err) {
              console.log(err);

              res.send(err);
            } else {
              updateProduct(product._id, product.countInStock - count);
              console.log("The item updated successfully");

              res.send("The item updated successfully");
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  });

  /***Update product in cart***/
  routeObj.app.put("/api/cart/:id", async (req, res) => {
    try {
      //console.log(req.params);
      let _id = req.params.id;
      _id = routeObj.mongoose.Types.ObjectId(_id);
      console.log(_id);

      const cartItem = req.body;
      console.log(cartItem);

      Cart.updateOne(
        { _id: _id },
        { count: cartItem.count, originalCount: cartItem.count },
        (err) => {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log("The item updated successfully");
            updateProduct(
              cartItem._doc._id,
              cartItem._doc.countInStock - cartItem.count
            );
            res.send("The product updated successfully");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  /***Delete product in cart***/
  routeObj.app.delete("/api/cart/:id", async (req, res) => {
    try {
      let _id = req.params.id;
      //_id = mongoose.Types.ObjectId(_id);
      console.log(_id);
      var [item] = await Cart.find({ _id: _id }).exec();
      console.log("Found item:", item, item.length, item.product);
      if (item) {
        const product = await ProductModel.findById(item.product).exec();
        console.log("Found product:", product);
        if (product) {
          console.log("Found product:", product);
          await updateProduct(
            product._id,
            product.countInStock + item.originalCount
          );
          await Cart.deleteOne({ _id: _id }, (err) => {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              console.log("The item deleted successfully");
              res.send("The item deleted successfully");
            }
          });
        } else {
          console.log("Product not found");
          res.status(404).send("Product not found");
        }
      } else {
        console.log("Item not found");
        res.status(404).send("Item not found");
      }
    } catch (error) {
      console.log(error);
    }
  });

  /***Navigate all other routes to client***/
  routeObj.app.get("*", (req, res) => {
    if (process.env.NODE_ENV === "production") {
      res.sendFile(
        routeObj.path.resolve(__dirname, "../frontend/build", "index.html")
      );
    } else {
      res.sendFile(
        routeObj.path.resolve(__dirname, "../frontend/build", "index.html")
      );
    }
  });
};
