import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './index.css';

// function for product cards
const ProductCard = (props) => {
    const { product } = props
    const {_id, title, price, image} = product
    return (
        <li key={_id} className='product-card'>
            
                <img src={image} alt={title} className='product-card-image'/>
                <h2 className='product-card-title'>{title}</h2>
                <p className='product-card-price'>Price: {price}/-</p>
                <Link to={`/product-details/${_id}`} className='text-decoration-none'>
                    <Button variant='primary w-100'>View More</Button>
                </Link>
        </li>
    )
}

export default ProductCard
