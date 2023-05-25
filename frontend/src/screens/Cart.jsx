import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import * as Icon from "react-bootstrap-icons";

export default function CartScreen() {
  const [cart, setCart] = useState([]);
  const [productCount, setProductCount] = useState([]);
  var total = 0;

  useEffect(() => {
    const getCartItems = async () => {
      await fetch("http://localhost:5000/api/cart")
        .then(response => {
          if (!response.ok)
            throw Error(response.statusText);
          return (response.json());
        })
        .then((res) => {
          setCart(res);
          setProductCount(res.map((product) => product.count));
          console.log(cart);

        })
        .catch(err => {
          console.log(err);
        });
    }
    getCartItems();

  }, []);

  //const cartItens = cart.filter(cart => cart.count > 0);

  const handleItemDelete = async (product) => {
    console.log("Delete handled");
    const { data } = await axios.delete("http://localhost:5000/api/cart/" + product._id);
    const newCartItens = cart.filter(s => s._id != product._id);

    //console.log(data, newProducts);
    setCart([...newCartItens]);
    /*return { "message": "Item removed Successfully!",
             "products": newProducts };*/
    return { "message": "Item removed Successfully!" };
  }

  const handleItemQuantityUpdate = async (product) => {

    if (product.count > 0) {
      const { data } = await axios.put("http://localhost:5000/api/cart/" + product._id, product);
      console.log(data);
      const index = cart.indexOf(product);
      cart[index] = { ...product, originalCount: product.count };
      //console.log(products);
      setCart([...cart]);
      return { "message": "Item updated Successfully!" };
    }
    else
      handleItemDelete(product);

  }

  const handleItemAdd = async (product) => { //post request adds something to the database.
    /*   console.log(newProduct); */
    if ((product.count - product.originalCount) < product._doc.countInStock) {
      product.count = product.count + 1;
      //product.count = product.countInStock;
      /*console.log(product);
      const { data } = await axios.put("http://localhost:5000/api/cart/" + product._id, product);
      console.log(data);
      console.log("add Handled");*/
      const index = cart.indexOf(product);
      cart[index] = { ...product };
      //console.log(products);
      setCart([...cart]);
      //return { "message": "Item updated Successfully!" };
    }
    else
      return alert("Reached max quantity!");

  }

  const handleItemSubtract = async (product) => { //post request adds something to the database.
    /*   console.log(newProduct); */
    product.count = product.count > 0 ? product.count - 1 : 0;
    /*const { data } = await axios.put("http://localhost:5000/api/cart/" + product._id, product);
    console.log("subtract Handled");*/
    const index = cart.indexOf(product);
    cart[index] = { ...product };
    //console.log(products);
    setCart([...cart]);
    //return { "message": "Item updated Successfully!" };
  }

  if (cart.length === 0) {
    return (<><h1>Cart Screen</h1>
      <a href="/">Back to Home</a><br /><p>No Products found in cart,add items first</p></>)
  }
  else
    return (
      <div>
        <h1>Cart Screen</h1>
        {
          cart.map((product, index) => (
            <div key={product._id} className="card container my-3">
              <button className='ms-auto bg-danger' onClick={() => handleItemDelete(product)}><Icon.Trash style={{ fontSize: "25px" }} /></button>
              <div className="row">
                <div className="col-sm-8">
                  <img className="image-fluid" height={100} src={product._doc.image} alt={product._doc.name} />
                  <div className="card-body align-content-start">
                    <Link key={product._id} to={`/product/${product._id}/${product._doc.brand}`}><h2>{product._doc.name}</h2></Link>
                    <h3><p className='text-wrap text-start'>{product._doc.description}</p></h3>

                  </div>
                </div>
                <div className="col-sm-4 h-100" style={{ "height": "50px" }}>
                  <label className='form-label'>Quantity:</label>
                  <div className="input-group col-sm-2 mb-3">
                    <div className="input-group-prepend h-75">
                      <button type="button" className='btn btn-primary' onClick={() => handleItemAdd(product)}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </button>
                    </div>
                    <input className="form-control h-75  text-center" type="number" name="quantity" readOnly value={product.count} min={0} max={product.countInStock}></input>
                    <div className="input-group-append h-75">
                      <button className="btn btn-secondary" type="button" onClick={() => handleItemSubtract(product)}><i className="fa fa-minus" aria-hidden="true"></i></button>
                    </div>
                  </div>
                  <br />
                  {
                    (product.count != productCount[index]) ? (
                      <button className="btn btn-primary" type="button" onClick={() => handleItemQuantityUpdate(product)}>Update Quantity</button>
                    ) : null
                  }
                  <br />
                  <br />
                  <div className="price">${product._doc.price} per each item <br />Total = ${product._doc.price * product.count}</div>
                  <div hidden>{total += product._doc.price * product.count}</div>
                </div>
              </div>
            </div>
          ))
        }
        <div className="button-wrapper my-2" data-tippy-content="Click to copy button 63">
          <button className="button-63" role="button">Procced to Checkout ${Math.round(total, 2)}</button>
        </div>
      </div >
    );
}