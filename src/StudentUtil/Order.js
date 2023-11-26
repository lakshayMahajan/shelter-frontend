import React, { useContext, useState,useEffect } from 'react';

import axios from 'axios';
import CartContext from '../Context/CartContext';
import AuthContext from '../Context/AuthContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Order.css';

function Order() {
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
 return(
  <div id='orderbg'>
    <Popup trigger={<button id='neworder'>

+ New Order
</button>} modal>
{close => (
  <div>
    <div id='header'>New Order</div>
    <section id='orderforms'>
        
      <form onSubmit={handleFormSubmit}>
      <div>
                     Date:   <div></div>
                    <input id='studentdate'type="date" value={selectedDate} onChange={handleDateChange} required />
                </div>
        <div>
          Select Categories:
          <div>
            {categories.map(category => (
              <div>
              <label  key={category._id}>
                <input 
                
                  type="checkbox" 
                  value={category.name} 
                  onChange={handleCategoryChange} 
                  checked={selectedCategories.includes(category.name)}
                />
                {category.name}
              </label>
              </div>
            ))}
          </div>
        </div>
        <br />
        <div>
          
          <textarea id='studentnote' placeholder='Add a Note' value={note} onChange={handleNoteChange} required />
        </div>
        <br />
        <div id='formbuttons'>
        <button  onClick={close} id='modifybutton1'>Cancel Order</button>
        <button  id='modifybutton' type="submit">Submit Form</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </section>
    </div>
)}
  </Popup>

   <div id='orderscard'>
  <div id='oclabel'>
    <h4 id='ocll'>Requested Items</h4>
    <h4 id='ocll'>Date</h4>
    <h4 id='ocll'>Status</h4>
    <h4 id='ocll'>Locker Info</h4>
  </div>
  <div id='ordercarddiv'>
   <div id='ordercard'>
   <div className='ocinfo' id='items'>
   <h4 id='ocol'>Item</h4>
   <h4 id='ocol'>Item</h4>
   <h4 id='ocol'>Item</h4>
   <h4 id='ocol'>Item</h4>
    </div>
    <div id='status' className='ocinfo' >
    <h4 id='ocol'>September 27, 2023</h4>
   
       </div>
    <div id='modifybuttons' className='ocinfo2'> 
    <h4 id='ocolp'>PENDING</h4>
    </div>
    <div id='modifybuttons' className='ocinfo3'> 
    <h4 id='ocol'>JXXX</h4>
    <h4 id='ocol'>XX-XX-XX</h4>
    </div>
    <div id='modifybuttons' className='ocinfo4'> 
    <Popup trigger={ <button id='modifybutton'>Change Date</button>}
    modal>
      {close => (
        <div>
      <div id='header'>Update Date</div>
  <section id='orderforms'>
  <div>
                     Date:   <div></div>
                    <input id='studentdate'type="date" value={selectedDate} onChange={handleDateChange} required />
                </div>
                <div id='formbuttons'>
        <button  onClick={close} id='modifybutton1'>Cancel Change</button>
        <button  id='modifybutton' type="submit">Submit Update</button>
        </div>
  </section>
  </div>
)}
    </Popup>
   
    <button id='modifybutton1'>Cancel Order</button>
    </div>
    
    </div>
    <br id='cardbreak' />
   </div>
   
   </div>
   
  </div>
  );
}

export default Order;
