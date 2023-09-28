import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import { useContext } from 'react';

const SubmitForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const { auth } = useContext(AuthContext);


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

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter(category => category !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
};

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/user/createform', { 
        categories: selectedCategories, 
        user: auth.user.localAccountId,
        note,
        date: selectedDate 
      });
      setMessage('Form submitted successfully!');
      setSelectedCategories([]);
      setNote('');
    } catch (error) {
      setMessage(`Error submitting form: ${error.response.data.message}`);
    }
  };

  return (
    <div>
        <h1>Student Form Submit</h1>
      <form onSubmit={handleFormSubmit}>
      <label>
                    Select Date:
                    <input type="date" value={selectedDate} onChange={handleDateChange} required />
                </label>
        <label>
          Select Categories:
          <div>
            {categories.map(category => (
              <label key={category._id}>
                <input 
                  type="checkbox" 
                  value={category.name} 
                  onChange={handleCategoryChange} 
                  checked={selectedCategories.includes(category.name)}
                />
                {category.name}
              </label>
            ))}
          </div>
        </label>
        <br />
        <label>
          Note:
          <textarea value={note} onChange={handleNoteChange} required />
        </label>
        <br />
        <button type="submit">Submit Form</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SubmitForm;
