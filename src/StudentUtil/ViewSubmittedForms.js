import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
const ViewSubmittedForms = ({ userId }) => {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState('');
  const { auth } = useContext(AuthContext);
  console.log(auth );
  useEffect(() => {
    const fetchForms = async () => {
      try {
        if(auth.isAuth){
          userId = auth.user.localAccountId;
        }
        

        console.log(userId);
        const response = await axios.get(`http://localhost:4000/products/getForm/${userId}`);
        setForms(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    };
    fetchForms();
  }, [userId]);

  return (
    <div>
      <h1>Submitted Forms</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {forms.length > 0 ? (
        forms.map((form, index) => (
          <div key={index}>
            <h2>Form {index + 1}</h2>
            <p><strong>Categories:</strong> {form.categories.join(', ')}</p>
            <p><strong>Note:</strong> {form.note}</p>
            <p><strong>Date:</strong> {new Date(form.date).toLocaleDateString()}</p>
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
