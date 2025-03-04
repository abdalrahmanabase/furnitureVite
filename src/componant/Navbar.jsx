import React from "react";
import "../componant/Navbar.css"
import { Link } from "react-router-dom";

const Navbar=()=>{
return(
    <div>
        <nav>
            <div className="div1"></div>
            <div className="navlist">
                <ul >
                    <li  >
                    <Link to='/'>Home</Link>
                    </li>
                    <li  >
                    <Link to='/Shop'>Shop</Link>
                    </li>
                    <li  >
                    <Link to='/Contact'>Contact</Link>
                    </li>
                    <li>
                    <Link to='/Blog'>Blog</Link>
                    </li>
                    
                </ul>
            </div>
            <div className="icons">
                <Link to='/Login'> <i class="fa-regular fa-user"></i></Link>
                <Link to='/'><i class="fa-solid fa-magnifying-glass"></i></Link>
                <Link to='/'><i class="fa-regular fa-heart"></i></Link>
                <Link to='/Cart'><i class="fa-solid fa-cart-shopping"></i></Link>
            </div>
        </nav>
    </div>
)
}

export default Navbar;

                