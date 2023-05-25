//import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { Link } from 'react-router-dom';
import Product from '../components/Product';


export default function HomeScreen({products}) {
      return (
        <div>
             <div className="row center">
                 {products.map((product) => (
                  <div key={product._id} className="col-sm-3">
                  <Product key={product._id} product={product}></Product>
                  </div>
              ))}
                
            </div>
         
        </div>
      );
    }