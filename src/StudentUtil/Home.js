import React from 'react';
import './Home.css';
import {AiOutlineArrowRight} from 'react-icons/ai';
import bd from './svgs/blob.svg'
import bd1 from './svgs/blob1.svg'
import bd3 from './svgs/blob2.svg'
import bd2 from './svgs/blob3.svg'
function Home() {
    return (   <div id='homediv'>
        <h1 id='homeheader'>Welcome to Roary's Shelter</h1>
        <h1 id='homeSH'>Students, sign in to your account in order to access resources and to place, view, and manage orders. </h1>
      <button id='mhomebtn'>
        Continue
          
        <AiOutlineArrowRight/>
      </button>
       
    </div> );
}

export default Home;