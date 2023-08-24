import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CartContext from '../Context/CartContext';

function Product() {
  // State to hold the products
  const [products, setProducts] = useState([]);

  // Use the CartContext
  const { cart, setCart } = useContext(CartContext);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productID) => {
    const updatedCart = cart.filter(item => item._id !== productID);
    setCart(updatedCart);
  };

  const isInCart = (productID) => {
    return cart.some(item => item._id === productID);
  };

  // Fetch products on component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_CLUB_API}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    }

    fetchProducts();
  }, []); 

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>Quantity: {product.quantity}</p>
            <p>Category: {product.category}</p>
            <img src={product.image} alt={product.name} />
            <p>Tags: {product.tags.join(', ')}</p>
            <p>Description: {product.description}</p>
            
            {isInCart(product._id) 
              ? <button onClick={() => removeFromCart(product._id)}>Remove from Cart</button>
              : <button onClick={() => addToCart(product)}>Add to Cart</button>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Product;
