import React from 'react'
import Ssection2 from '../shop/Ssection2';
import Footer from '../Footer'
import Navbar from "../Navbar"
import Checkheader from './Checkheader';
import './Cksection1.css'
import Cksection1 from './Cksection1';
import Cksection2 from './Cksection2';


const Checkout=()=> {
return (
    <div>
        <Navbar/>
        <Checkheader/>
        <div className='cksecs'>
            <Cksection1/>
            <Cksection2/>
        </div>
        <Ssection2/>
        <Footer/>
    </div>
)
}

export default Checkout