import React from 'react'
import Navbar from "../Navbar"
import Sheader from './Sheader';
import Ssection1 from './Ssection1';
import Ssection2 from './Ssection2';
import Footer from '../Footer'


const Shop=()=> {
return (
    <div style={{backgroundColor:"#FFFFFF"}}>
        <Navbar/>
        <Sheader/>
        <Ssection1/>
        <Ssection2/>
        <Footer/>
    </div>
)
}

export default Shop;