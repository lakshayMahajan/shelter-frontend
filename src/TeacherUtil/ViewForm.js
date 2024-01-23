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
  <div id='cateback'>
      <div id='tpicker'>
        <div id='catpick'>
          <FaPlus id='pickimage'/>
          Categories
        </div>
        <div id='catpickh' href='tview'>
        <FaClipboard id='pickimage'/>
        Orders
        </div>
      </div>
      <div id='catecard'>
        <div id='catetop'>
      <h3>Locker #</h3>
      <h3>Date</h3>
      <h3> </h3>
        </div>
        <div id='orderdiv'>
          <h6 id='orderlocker'>XXXXXX</h6>
          <h6 id='orderdate'>XX/XX/XX</h6>
          <Popup trigger={<h6 id='orderview'>View/Manage</h6> 
} modal>
{close => (
   <div>
   <div id='header'>View/Manage</div>
   <section id='orderforms'>
       
     <form >
      <div>
        Student ID#: XXXXXX
      </div>
      <div>
        Locker#: XXXXXX
      </div>
      <div>
        Note: 
      </div>
     <div>
                    Date:   <div></div>
                   <input id='studentdate'type="date" value='2024-01-01' required />
               </div>
       <div>
         Selected Categories:
         <div>
          <h1>Category 1</h1>
          <h1>Category 2</h1>
          <h1>Category 3</h1>
         </div>
       </div>
       <br />
       <div>
         
         <textarea id='studentnote' placeholder='Add a Note' required />
       </div>
       <br />
       <div id='formbuttons'>
       <button  onClick={close} id='modifybutton1'>Cancel Update</button>
       <button  id='modifybutton' type="submit">Save and Close</button>
       </div>
     </form>
    
   </section>
   </div>
)}
 </Popup>
        </div>
      </div>
     </div>
      
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
              <strong>StudentNote:{form.note}</strong>
             
              {/* <input
                type="text"
                value={form.note}
                onChange={(e) => handleNoteChange(index, e)}
              /> */}
            </label>
            <br/>
            <label>
              <strong>TeacherNote:</strong>
              <input
                type="text"
                value={form.teacherNote}
                onChange={(e) => handlTeacherNoteChange(index, e)}
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

export default ViewForm;
