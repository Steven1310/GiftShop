import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
//import data from '../data';
import { useParams } from 'react-router';
import axios from "axios";

const ProductScreen = () => {
  const { name } = useParams();
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [imageDataLength, setImageDataLength] = useState(0);
  const apiKey = "24363872-1c183d0c3fe09e90f063b47e2";
  const path = "https://pixabay.com/api/";
  console.log(id);
  console.log(name);
  const url = `${path}?q=${name.split(" ")[0]}&key=${apiKey}&per_page=5`;
  //console.log(productitemtemp)



  useEffect(() => {
    fetch(url)
      .then(response => {
        if (!response.ok)
          throw Error(response.statusText);
        return (response.json());


      }).then(imageData1 => {
        setImageData(imageData1);
        setImageDataLength(imageData1.hits.length);

      }).catch((error) => {
        console.log("Looks like there was a problem", error);
      });
    async function getProduct() {
      const res = await fetch("http://localhost:5000/api/Product/" + id);
      const data = await res.json();
      setProduct(data);
      console.log(data);
    }
    getProduct();
  }, []);


  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async (productItem) => {
    console.log(productItem, productItem._id);
    var newProductItem = {};
    newProductItem.product = productItem;
    newProductItem.user = "xyz";
    newProductItem.count = quantity;
    //product.count = product.countInStock;
    //console.log(product);
    const { data } = await axios.post("http://localhost:5000/api/cart/", newProductItem);
    console.log(data);
    console.log("add Handled");
    //productItem.countInStock = productItem.countInStock - quantity;
    //const { data1 } = await axios.put("http://localhost:5000/api/product/" + productItem._id, productItem.countInStock);
    alert("Item added to cart Successfully!");

  }

  /*if (!product) {
    return <div><p>Loading ...</p><img src="/images/loader.gif"/></div>;
  }*/
  return (
    <div id='content'>
      {
        <>
          <div className="row top">
            <h1>{product.name}</h1>
            <div className="col-4">
              <img className="large" src={product.image} alt={product.name}></img>
            </div>
            <div className="col-4">
              <ul>
                <li>Description: <p>{product.description}</p></li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
              </ul>
              <div className='row'>
                {
                  imageDataLength > 0 && (
                    imageData.hits.map((product) => (
                      <div key={product.id} className="col-sm-4">
                        <img className="w-100 h-100 img-fluid" src={product.previewURL} />
                      </div>

                    ))
                  )
                }

              </div>
            </div>
            <div className="col-4">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="text-success">In Stock</span>
                        ) : (
                          <span className="text-danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {
                    product.countInStock > 0 && (
                      <>
                        <li>
                          <div className="row">
                            <div>Quantity</div>
                            <div>
                              <select
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}>
                                {[...Array(product.countInStock).keys()].map(
                                  (item) => (
                                    <option key={item + 1} value={item + 1}>{item + 1}</option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        </li>
                        <li>
                          <a href="/"><button className="primary block" onClick={() => handleAddToCart(product)}>Add to Cart</button></a>
                        </li>
                      </>
                    )
                  }


                </ul>
              </div>
            </div>

          </div>
          <div className='row'>

            <div className='col-2'>


              {/*
                imageDataLength > 0 && (
                  <>
                    <p>Customer who bought this also bought</p>
                    {
                      imageData.hits.map((product) => (
                        <div key={product.id} className="card container">

                          <img className="medium" src={product.previewURL} alt={product.type} />
                        </div>

                      )
                      )
                    }
                  </>
                ) ||(

                  <p>No matching Item found</p>
                )
                  */
              }


            </div>
          </div>
        </>

      }

    </div>
  );
}
export default ProductScreen;