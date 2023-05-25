import React from 'react'
import Rating from './Rating';
import { Link } from 'react-router-dom';

export default function product(props) {
  const { product } = props;
  return (
    <div className='card-group'>
      <div key={product._id} className="card border-primary mb-4">
        <Link to={`/product/${product._id}/${product.name}`}>
          <div className='card-header'>
          </div>
          <div className="card-body">
          <img className="card-img-top" src={product.image} alt={product.name} />
          <Rating className="card-img overlay" rating={product.rating} numReviews={product.numReviews}></Rating>
            <h2 className='card-title text-truncate card-link'>{product.name}</h2>
            
            <div className=" card-footer text-end rounded-pill price">${product.price}</div>
          </div>
        </Link>
      </div>

    </div>
  )
}
