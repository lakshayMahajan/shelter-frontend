import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateCatagory.css'
import Popup from 'reactjs-popup';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products');
        setCategories(response.data);
      } catch (error) {
        setMessage(`Error fetching categories: ${error.response.data.message}`);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/products', { name: categoryName });
      setCategories([...categories, response.data]);
      setMessage(`Category ${response.data.name} created successfully!`);
      setCategoryName('');
    } catch (error) {
      setMessage(`Error creating category: ${error.response.data.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/products/${id}`);
      setCategories(categories.filter(category => category._id !== id));
      setMessage('Category deleted successfully!');
    } catch (error) {
      setMessage(`Error deleting category: ${error.response.data.message}`);
    }
  };

  return (
    <div id='cateback'>
      <div id='catecard'>
        <div id='catetop'>
        <h1 id='catehead'>Categories</h1>
        <Popup trigger={  <button id='newcate'>+ New</button>}
    modal>
      {close => (
        <div>
      <div id='header'>New Category</div>
  <section id='orderforms'>
  <div>
    

  <form onSubmit={handleFormSubmit}>
    <div id='cateform'>
        <label>
          
          <input id='studentnote' placeholder='Category Name' type="text" value={categoryName} onChange={handleInputChange} required />
        </label>
       
      
                </div>
                <div id='formbuttons'>
        <button  onClick={close} id='modifybutton1'>Cancel Update</button>
        <button  id='modifybutton' type="submit">Submit Update</button>
        </div>
        </form>

        </div>
        
  </section>
  
  </div>
)}
    </Popup>
       
        </div>
      
      {message && <p>{message}</p>}
      <ul>
        {categories.map(category => (
          <div key={category._id}>
            {category.name} <button onClick={() => handleDelete(category._id)}>X</button>
          </div>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default CreateCategory;
