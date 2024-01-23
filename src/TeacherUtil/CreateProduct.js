import React, { useState } from 'react';
import axios from 'axios';
import './CreateCatagory.css'
import Popup from 'reactjs-popup';
import { FaPlus } from 'react-icons/fa';
import { FaClipboard } from 'react-icons/fa';
function CreateProduct() {
  const [productData, setProductData] = useState({
    name: '',
    quantity: '',
    category: '',
    image: '',
    tags: '',
    description: ''
  });

  const handleChange = (event) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let tagsArray = productData.tags.split(',').map(tag => tag.trim());

    let payload = {
      ...productData,
      quantity: Number(productData.quantity),
      tags: tagsArray
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_CLUB_API}/products`, payload);
      
      if (response.status === 200) {
        alert('Product added successfully!');
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      alert('There was an error adding the product.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create Order</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={productData.name} onChange={handleChange} required />

        <label>Quantity:</label>
        <input type="number" name="quantity" value={productData.quantity} onChange={handleChange} required />

        <label>Category:</label>
        <input type="text" name="category" value={productData.category} onChange={handleChange} required />

        <label>Image URL:</label>
        <input type="text" name="image" value={productData.image} onChange={handleChange} required />

        <label>Tags (comma separated):</label>
        <input type="text" name="tags" value={productData.tags} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={productData.description} onChange={handleChange}></textarea>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default CreateProduct;
