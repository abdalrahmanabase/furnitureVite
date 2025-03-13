import React from 'react'
import { Link } from 'react-router-dom'

import "./Cheader.css"

const Cheader=()=> {
return (
    <div className='cheader'>
        <div className='chead'>
            <img src="/imgs/Group 55c.png" alt='...'/>
            <p><Link to='/'>Home</Link> <i class="fa-solid fa-angle-right"></i>  <Link to={location.pathname}>Contact</Link> </p>
        </div>
    </div>
)
}

export default Cheader;