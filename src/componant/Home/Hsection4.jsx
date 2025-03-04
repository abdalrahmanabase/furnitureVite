import React from "react";
import "./Hsection4.css"
import { Link } from "react-router-dom";

const Hsection4=()=>{
    return(
        <div className="hsec4">
            <h2>Our Blogs</h2>
            <p>Find a bright ideal to suit your taste with our great selection</p>
            <div className="sec4cont">
                <div className="blog">
                    <img src="/imgs/Rectangle 13.png" alt="..."/>                   
                    <h3>Going all-in with millennial design</h3>
                    <button><Link to="/Blog"> Read More</Link></button>
                    <p><i class="fa-regular fa-clock"></i>5 min<i class="fa-regular fa-calendar"></i>12th Oct 2022</p>
                </div>
                <div className="blog">
                    <img src="/imgs/Rectangle 14.png" alt="..."/> 
                    <h3>Going all-in with millennial design</h3>
                    <button><Link to="/Blog"> Read More</Link></button>
                    <p><i class="fa-regular fa-clock"></i>5 min<i class="fa-regular fa-calendar"></i>12th Oct 2022</p>
                </div>
                <div className="blog">
                    <img src="/imgs/Rectangle 15.png" alt="..."/>                  
                    <h3>Going all-in with millennial design</h3>
                    <button><Link to="/Blog"> Read More</Link></button>
                    <p><i class="fa-regular fa-clock"></i>5 min<i class="fa-regular fa-calendar"></i>12th Oct 2022</p>
                </div>
            </div>
            <button><Link to="/Blog"> View All Post</Link></button>
        </div>
    )
}
export default Hsection4;   