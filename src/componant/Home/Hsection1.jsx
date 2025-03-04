import React from "react";
import { Link } from "react-router-dom";
import "./Hsection1.css"

const Hsection1=()=>{
    return(
        <div className="hsec1">
            <div className="piccont ">
                <img src="/imgs/Granite square side table 1.png" alt="..."></img>
                <h2>Side table</h2>
                <button><Link to="/Shop">View More</Link></button>
            </div>
            <div className="piccont">
                <img src="/imgs/Cloud sofa three seater + ottoman_3 1.png" alt="..."></img>
                <h2>Side table</h2>
                <button><Link to="/Shop">View More</Link></button>
            </div>
        </div>
    )
}
export default Hsection1;   