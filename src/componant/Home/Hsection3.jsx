import React from "react";
import { Link } from "react-router-dom";
import "./Hsection3.css"

const Hsection3=()=>{
    return(
        <div className="hsec3">
            <img src="/imgs/Asgaard sofa 1.png" alt="..."/>
            <div className="sec3write">
                <h4>New Arrivals</h4>
                <h2>Asgaard sofa</h2>
                <button><Link to="/singleproduct/16">Order Now</Link></button>
            </div>
        </div>
    )
}
export default Hsection3;  