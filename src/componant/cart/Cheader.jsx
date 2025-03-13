import React from 'react'
import { Link } from 'react-router-dom'

import "./Cartheader.css"

const Cheader=()=> {
return (
    <div className='cartheader'>
        <div className='carthead'>
            <img src="/imgs/Group 55cc.png" alt='...'/>
            <p><Link to='/'>Home</Link> <i class="fa-solid fa-angle-right"></i>  <Link to={location.pathname}>Cart</Link> </p>
        </div>
    </div>
)
}

export default Cheader;