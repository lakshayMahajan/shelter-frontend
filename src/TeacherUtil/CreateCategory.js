import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
        <h1>Create Category</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Category Name:
          <input type="text" value={categoryName} onChange={handleInputChange} required />
        </label>
        <button type="submit">Create Category</button>
      </form>
      {message && <p>{message}</p>}
      <ul>
        {categories.map(category => (
          <li key={category._id}>
            {category.name} <button onClick={() => handleDelete(category._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateCategory;
