import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import './ViewForm.css'
import Popup from 'reactjs-popup';
import { FaPlus } from 'react-icons/fa';
import { FaClipboard } from 'react-icons/fa';
const ViewForm = ({ userId }) => {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        if(auth.isAuth){
          userId = auth.user.localAccountId;
        }
        const response = await axios.get(`http://localhost:4000/user/forms/`);
        setData(response.data);
        console.log(response.data);
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
  const handlTeacherNoteChange = (index, e) => {
    const newForms = [...forms];
    newForms[index].teacherNote = e.target.value;
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
        approved: form.approved, 
        teacherNote: form.teacherNote
      });
      setError('Form updated successfully!');
    } catch (err) {
      console.log(err);
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div>
    <div id="leftNavBar">
      {/* Add your navigation links or elements here */}
    </div>
  
    <div id="mainContent">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div id='cateback'>
        <div id='tpicker'>
          {/* Other elements */}
        </div>
  
        {data.length > 0 ? (
          data.map((formData, index) => (
            <div key={formData._id} id='catecard'>
              <div id='catetop'>
                <h3>Locker # {formData.locker}</h3>
                <h3>Date {new Date(formData.date).toISOString().split('T')[0]}</h3>
              </div>
              <div id='orderdiv'>
                <h6 id='orderlocker'>{formData.locker}</h6>
                <h6 id='orderdate'>{new Date(formData.date).toISOString().split('T')[0]}</h6>
                <Popup trigger={<h6 id='orderview'>View/Manage</h6>} modal>
                  {close => (
                    <div>
                      <div id='header'>View/Manage</div>
                      <section id='orderforms'>
                        <form>
                          <div>
                            Student ID#: {formData.user}
                          </div>
                          <div>
                            Locker#: {formData.locker}
                          </div>
                          <div>
                            Note: {formData.note}
                          </div>
                          <div>
                            Date: <input id='studentdate' type="date" value={new Date(formData.date).toISOString().split('T')[0]} required />
                          </div>
                          <div>
                            Selected Categories:
                            <div>
                              {formData.categories.map((category, catIndex) => (
                                <h1 key={catIndex}>{category}</h1>
                              ))}
                            </div>
                          </div>
                          <br />
                          <div>
                            <textarea id='studentnote' placeholder='Add a Note' required defaultValue={formData.note} />
                          </div>
                          <br />
                          <div id='formbuttons'>
                            <button onClick={close} id='modifybutton1'>Cancel Update</button>
                            <button id='modifybutton' type="submit">Save and Close</button>
                          </div>
                        </form>
                      </section>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          ))
        ) : (
          <p>No forms submitted.</p>
        )}
      </div>
    </div>
  </div>
  );
};

export default ViewForm;
