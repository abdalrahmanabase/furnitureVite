import React from 'react'
import Footer from '../Footer'
import Navbar from "../Navbar"
import Mheader from './Mheader';
import LoginRegister from './LoginRegister ';
import Ssection2 from '../shop/Ssection2';

const Myaccount=()=> {
return (
    <div>
        <Navbar/>
        <Mheader/>
        <LoginRegister/>
        <Ssection2/>
        <Footer/>
    </div>
)
}

export default Myaccount;