import React from 'react'
import Ssection2 from '../shop/Ssection2';
import Footer from '../Footer'
import Navbar from "../Navbar"
import Mheader from './Mheader';
import Msection1 from './Msection1';
import LoginRegister from './LoginRegister ';

const Myaccount=()=> {
return (
    <div>
        <Navbar/>
        <Mheader/>
        <LoginRegister/>
        {/* <Msection1/> */}
        <Ssection2/>
        <Footer/>
    </div>
)
}

export default Myaccount