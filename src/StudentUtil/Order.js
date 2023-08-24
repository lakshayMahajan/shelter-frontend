import React, { useContext, useState } from 'react';
import axios from 'axios';
import CartContext from '../Context/CartContext';
import AuthContext from '../Context/AuthContext';

function Order() {
  const { cart } = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract object IDs from cart items for the order
    const itemsInOrder = cart.map(product => product._id); 

    try {
      const response = await axios.post(`${process.env.REACT_APP_CLUB_API}/user/order`, {
        items: itemsInOrder,
        user: auth.user.localAccountId,
        date: date,
        order:itemsInOrder
      });

      if (response.status === 200) {
        alert('Order successfully created!');
      } else {
        alert('Error creating order!');
      }
    } catch (error) {
      console.error('Error:', error.response.data.message);
      alert('Error creating order. Please check console for more details.');
    }
  };

  return (
    <div>
      <h1>Create Order</h1>
      <h3>Your Cart:</h3>
      <ul>
        {cart.map(item => (
          <li key={item._id}>{item.name} (Quantity: {item.quantity})</li>  // Assuming cart items have a 'name', 'quantity', and '_id' property.
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date: </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}

export default Order;
