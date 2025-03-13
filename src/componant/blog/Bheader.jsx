import React from 'react'
import './Bheader.css'

const Bheader=()=> {
return (
    <div className='blogheader'>
        <div className='bloghead'>
            <img src="/imgs/Group 55blog.png" alt='...'></img>
            <p><Link to='/'>Home</Link> <i class="fa-solid fa-angle-right"></i>  <Link to={location.pathname}>Blog</Link> </p>
        </div>
    </div>
)
}

export default Bheader