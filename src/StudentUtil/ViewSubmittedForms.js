import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

const ViewSubmittedForms = ({ userId }) => {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState('');
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        if(auth.isAuth){
          userId = auth.user.localAccountId;
        }
        const response = await axios.get(`http://localhost:4000/products/getForm/${userId}`);
        setForms(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    };
    fetchForms();
  }, [userId, auth]);

  const handleNoteChange = (index, e) => {
    const newForms = [...forms];
    newForms[index].note = e.target.value;
    setForms(newForms);
  };

  const handleDateChange = (index, e) => {
    const newForms = [...forms];
    newForms[index].date = e.target.value;
    newForms[index].approved = false; // set approved to false when date changes
    setForms(newForms);
  };

  const handleSave = async (index) => {
    try {
      const form = forms[index];
      console.log(form);
      await axios.patch(`http://localhost:4000/user/forms/${form._id}`, {
        note: form.note,
        date: form.date,
        approved: form.approved // send the approved field in the PATCH request
      });
      setError('Form updated successfully!');
    } catch (err) {
      console.log(err);
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div>
      <h1>Submitted Forms</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {forms.length > 0 ? (
        forms.map((form, index) => (
          <div key={index}>
            <h2>Form {index + 1}</h2>
            <p>
              <strong>Categories:</strong> {form.categories.join(', ')}
            </p>
            <label>
              <strong>Note:</strong>
              <input
                type="text"
                value={form.note}
                onChange={(e) => handleNoteChange(index, e)}
              />
            </label>
            <br />
            <label>
              <strong>Date:</strong>
              <input
                type="date"
                value={new Date(form.date).toISOString().split('T')[0]}
                onChange={(e) => handleDateChange(index, e)}
              />
            </label>
            <br />
            <button onClick={() => handleSave(index)}>Save</button>
            <p><strong>Approved:</strong> {form.approved ? 'Yes' : 'No'}</p>
            <p><strong>Locker ID:</strong> {form.locker}</p>
          </div>
        ))
      ) : (
        <p>No forms submitted.</p>
      )}
    </div>
  );
};

export default ViewSubmittedForms;
