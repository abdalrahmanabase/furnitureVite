import React from 'react'
import { Link } from "react-router-dom";
import "../shop/Sheader.css"
const Sheader=()=> {
return (
    <div className='Sheader'>
        <div className='shead'>
            <img src="/imgs/Group 55.png" alt='...'></img>
            <p><Link to='/'>Home</Link> <i class="fa-solid fa-angle-right"></i>  <Link to={location.pathname}>Shop</Link> </p>
        </div>
    </div>
)
}

export default Sheader;