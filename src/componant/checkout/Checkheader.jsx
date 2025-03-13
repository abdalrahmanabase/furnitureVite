import React from 'react'
import { Link } from 'react-router-dom'

import '../blog/Bheader.css'

const Checkheader=()=> {
return (
    <div className='blogheader'>
        <div className='bloghead'>
            <img src="/imgs/Group 55 check.png" alt='...'></img>
            <p><Link to='/'>Home</Link> <i class="fa-solid fa-angle-right"></i>  <Link to={location.pathname}>Checkout</Link> </p>
        </div>
    </div>
)
}

export default Checkheader