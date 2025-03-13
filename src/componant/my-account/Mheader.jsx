import React from 'react'
import { Link } from 'react-router-dom'

import "./Mheader.css"

const Mheader=()=> {
return (
    <div className='mheader'>
        <div className='mhead'>
            <img src="/imgs/Group 55p.png" alt='...'/>
            <p><Link to='/'>Home</Link> <i class="fa-solid fa-angle-right"></i>  <Link to={location.pathname}>Myaccount</Link> </p>
        </div>
    </div>
)
}

export default Mheader;