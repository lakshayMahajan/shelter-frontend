import logo from './logo.svg';
import { useEffect, useState } from "react";
import axios from "axios";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./AuthConfig";
import AuthContext from "./Context/AuthContext";
import CartContext from './Context/CartContext';
import Navbar from './StudentUtil/Navbar';
import CreateProduct from './TeacherUtil/CreateProduct';
import Product from './StudentUtil/Product';
import Order from './StudentUtil/Order';
import CreateCategory from './TeacherUtil/CreateCategory';
import SubmitForm from './StudentUtil/SubmitForm';
import ViewSubmissions from './TeacherUtil/ViewForm';
import ViewSubmittedForms from './StudentUtil/ViewSubmittedForms';
import Home from './StudentUtil/Home';
import './App.css';
function App() {
  const [auth, setAuth] = useState({
    isAuth: false,
    loading: true,
    fetched: false,
  });
  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart, setCart] = useState(initialCart);
  const [clubContext, setClubContext] = useState(null);
  const [shownNotif, setShownNotif] = useState(false);
  const [userClubContext, setUserClubContext] = useState(null);
  const { instance, accounts } = useMsal();
  console.log(`${process.env.REACT_APP_CLUB_API}`);

  useEffect(() => {
    document.title = "HSE Clubs";
    if (accounts[0]) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          const resp = {...response.account, grade: parseInt(response.account.grade)}
          setAuth((prev) => ({
            ...prev,
            token: response.accessToken,
            user: resp,
          }));

          testToken(response.accessToken);
        });
    }

  }, [accounts]);


  async function signOutClickHandler(instance) {
    const selectionRes = await axios.post(
      `${process.env.REACT_APP_CLUB_API}/user`,
      {
        user: auth,
      }
    );
    console.log(selectionRes, "SELECTION RES");
    if (!selectionRes.data.errors) {
      setAuth((prev) => ({
        isAuth: true,
        user: { ...prev.user },
        loading: false,
        fetched: true,
      }));
    }
  
  }

  const testToken = async (token) => {
    const res = await axios.get("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (
      res.data.jobTitle == "12" ||
      res.data.jobTitle == "11" ||
      res.data.jobTitle == "10" ||
      res.data.jobTitle == "9"
    ) {

      setAuth((prev) => ({
        ...prev,
        isAuth: true,
        loading: false,
        fetched: false,
        user: {
          ...prev.user,
          role: "student",
          displayName: `${res.data.givenName} ${res.data.surname}`,
          grade: res.data.jobTitle,
        },
      }));
      console.log(auth);
    }else{
      setAuth((prev) => ({
        ...prev,
        isAuth: true,
        loading: false,
        fetched: false,
        user: {
          ...prev.user,
          role: "teacher",
          displayName: `${res.data.givenName} ${res.data.surname}`,
          grade: res.data.jobTitle,
        },
      }));
    }
   
  };


useEffect(() => {
  const fetchData = async () => {
    if (auth.user && !auth.fetched) {
      console.log("FETCHING");
      try {
     
        const selectionRes = await axios.post(
          `${process.env.REACT_APP_CLUB_API}/user`,
          {
            user: auth,
          }
        );
        console.log(selectionRes, "SELECTION RES");
        if (!selectionRes.data.errors) {
          setAuth((prev) => ({
            isAuth: true,
            user: { ...prev.user },
            loading: false,
            fetched: true,
          }));
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  fetchData();
}, [auth]);
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);
  
  return (
    <div id='app'>
    <AuthContext.Provider value={{ auth, setAuth }}>
      <CartContext.Provider value={{cart,setCart}}>
        <Navbar />
          <CreateCategory />
          <ViewSubmissions />
         <SubmitForm />
          <ViewSubmittedForms />
          <Navbar />
          <Order/>
         
       </CartContext.Provider>
      </AuthContext.Provider >
      </div>
  );
}

export default App;
