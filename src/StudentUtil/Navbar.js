import React, { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import CartContext from '../Context/CartContext';
import './Navbar.css'
import { useMsal } from '@azure/msal-react'; // Ensure you've installed and imported from the correct package
// import './styles.css'; // Import the styles
import { loginRequest } from '../AuthConfig';
import { FaShoppingCart } from "react-icons/fa";


const Navbar = ({ history }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);
  const { instance, accounts } = useMsal();

  function login() {
    instance.loginRedirect(loginRequest).catch(e => {
      console.log(e + "login error");
    });
  }

  function logout() {
    // // Implement your logout logic here
    // instance.logout();
  }

  return (
    <div className="navbar">
      <div id='navtitle'>Roary's Shelter</div>
      <div className="cart">
        <div className="cart-logo"><FaShoppingCart size={28}/></div>
        <div className="cart-count">{cart.length}</div>
      </div>
      {!auth.user ? (
        <button className="linbutton" onClick={login}>
          Login
        </button>
      ) : (
        <button className="linbutton" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
