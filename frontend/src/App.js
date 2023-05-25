import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import NewProductForm from "./screens/NewProductForm.jsx";
import Cart from "./screens/Cart";
import Home from "./screens/Home";
import ProductScreen from "./screens/ProductScreen.jsx";
import axios from "axios";
import product from "./components/Product.js";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar.js";
// import the library
import { library } from "@fortawesome/fontawesome-svg-core";
// import your icons
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Profile from "./screens/Profile.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [productToShow, setProductToShow] = useState([]);
  const [newProduct, setNewProduct] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      await fetch("http://localhost:5000/api/ProductsInfo")
        .then((res) => res.json())
        .then((res) => {
          /* console.log(res); */
          setProducts(res);
          console.log(products);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getProducts();
  }, []);

  const handleAdd = async () => {
    //post request adds something to the database.
    /*   console.log(newProduct); */
    const { data } = await axios.post(
      "http://localhost:5000/api/ProductsInfo",
      newProduct
    );
    //how to validate the data fron the client without making another get request from the database.
    if (typeof data === "object") {
      const productDB = data;
      console.log(productDB);
      const newProducts = [...products, newProduct];
      setProducts([...newProducts]);
    } else {
      console.log("Can Not Add object");
    }
  };

  return (
    <BrowserRouter>
      <div className="container-fluid d-flex flex-column vh-100">
        <Navbar />
        <main>
          <div className="panel panel-lined panel-hovered">
            <Routes>
              <Route
                path="/newProduct"
                render={() => (
                  <NewProductForm newProduct={newProduct} onAdd={handleAdd} />
                )}
              />
              <Route path="/cart" element={<Cart />} />
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/product/:id/:name" element={<ProductScreen />} />
              <Route
                path="/"
                exact
                element={
                  <Home products={products} productToShow={productToShow} />
                }
              />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </main>
        <footer className="container-fluid bg-dark mt-auto">
          <div className="text-center my-auto text-white">
            &copy;2021 All right reserved
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
library.add(fas, far);
