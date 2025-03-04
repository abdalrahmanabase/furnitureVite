import React from 'react'
import "./Mheader.css"

const Mheader=()=> {
return (
    <div className='mheader'>
        <div className='mhead'>
            <img src={require("../imgs/Group 55p.png")} alt='...'/>
            <p>Home <i class="fa-solid fa-angle-right"></i>   My Account</p>
        </div>
    </div>
)
}

export default Mheader;