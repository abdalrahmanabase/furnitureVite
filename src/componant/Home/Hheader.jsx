import React from 'react'
import { Link } from 'react-router-dom'
import "./Hheader.css"
import Navbar from '../Navbar'

const Hheader=()=> {
    return (
        <div className='hbackground'>
            <Navbar/>
            <div className="product-showcase">
            <div className="text-section">
                <h1>Rocket single<br/> seater</h1>
                <button className="shop-button"><Link to="/Shop">Shop Now</Link></button>
            </div>
            <div className="image-section">
                <img src="/imgs/Rocket single seater 1.png" alt="Rocket single seater" />
            </div>
            </div>
        </div>
    )
}

export default Hheader