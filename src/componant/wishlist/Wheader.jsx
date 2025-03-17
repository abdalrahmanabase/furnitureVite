import React from 'react'
import { Link } from 'react-router-dom'

import "./Wheader.css"
const Wheader=()=> {
return (
    <div className='wheader'>
        <div className='shead'>
            <img src="/imgs/Group 55.png" alt='...'></img>
            <p><Link to='/'>Home</Link> <i class="fa-solid fa-angle-right"></i>  <Link to={location.pathname}>Wishlist</Link> </p>
        </div>
    </div>
)
}

export default Wheader;