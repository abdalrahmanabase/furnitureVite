import React from "react";
import { Link } from "react-router-dom";
import "./Hsection1.css"

const Hsection1=()=>{
    return(
        <div className="hsec1">
            <div className="piccont ">
                <img src="/imgs/Granite square side table 1.png" alt="..."></img>
                <h2>Granite square side table</h2>
                <button className="shop-button"><Link to="/singleproduct/17">View More</Link></button>
            </div>
            <div className="piccont">
                <img src="/imgs/Mask group.png" alt="..."></img>
                <h2>Trenton modular sofa_3</h2>
                <button className="shop-button"><Link to="/singleproduct/5">View More</Link></button>
            </div>
        </div>
    )
}
export default Hsection1;   