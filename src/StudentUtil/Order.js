import React, { useContext, useState } from 'react';
import axios from 'axios';
import CartContext from '../Context/CartContext';
import AuthContext from '../Context/AuthContext';
import './Order.css';

function Order() {
 return(
  <div id='orderbg'>
   <button id='neworder'>

    + New Order
   </button>
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
    <button id='modifybutton'>Change Date</button>
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
