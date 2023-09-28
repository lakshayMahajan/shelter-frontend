import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/forms');
        setSubmissions(response.data);
      } catch (error) {
        setMessage(`Error fetching submissions: ${error.response.data.message}`);
      }
    };
    fetchSubmissions();
  }, []);

  const handleDateChange = async (id, e) => {
    try {
      const date = e.target.value; // date is a string in the format "YYYY-MM-DD"

      // Fetch a random locker
      const lockerResponse = await axios.get('http://localhost:4000/products/random-locker');
      const locker = lockerResponse.data;
        console.log(locker);
        console.log(date);
    //   // Update the locker's availability date
    console.log(`http://localhost:4000/products/update-locker-date/${locker._id}`);
      await axios.put(`http://localhost:4000/products/update-locker-date/${locker._id}`, { newDate: date });

      // Update the submission with the date, approval status, and locker ID
      await axios.patch(`http://localhost:4000/user/forms/${id}`, { 
        date, 
        approved: true, 
        locker: locker._id 
      });
      
      setSubmissions(submissions.map(sub => (
        sub._id === id ? { ...sub, date, approved: true, locker: locker } : sub
      )));
      setMessage('Date set, order approved, and locker assigned successfully!');
    } catch (error) {
      setMessage(`Error updating date and assigning locker: ${error.response.data.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/user/forms/${id}`);
      setSubmissions(submissions.filter(sub => sub._id !== id));
      setMessage('Submission deleted successfully!');
    } catch (error) {
      setMessage(`Error deleting submission: ${error.response.data.message}`);
    }
  };

  return (
    <div>
        <h1> ViewForm</h1>
      {submissions.map(submission => (
        <div key={submission._id}>
          <p>Categories: {submission.categories.join(', ')}</p>
          <p>Note: {submission.note}</p>
          <label>
            Set Date:
            <input 
              type="date" 
              value={submission.date ? submission.date.split('T')[0] : ''} 
              onChange={(e) => handleDateChange(submission._id, e)} 
            />
          </label>
          <button onClick={() => handleDelete(submission._id)}>Delete</button>
        </div>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ViewSubmissions;
