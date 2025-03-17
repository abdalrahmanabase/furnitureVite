import React from "react";
import { Link } from "react-router-dom";
import "./Bheader.css";

const Bheader = () => {

    return (
        <div className="blogheader">
            <div className="bloghead">
                <img src="/imgs/Group 55blog.png" alt="Blog Header" />
                <p>
                    <Link to="/">Home</Link> 
                    <i className="fa-solid fa-angle-right"></i>    
                    <Link to={location.pathname}>Blog</Link>
                </p>
            </div>
        </div>
    );
};

export default Bheader;
