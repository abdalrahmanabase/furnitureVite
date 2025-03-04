import React from "react";
import "../componant/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
return (
    <footer className="footer">
        <div className="footermain">
            <div className="footer-section ">
            <p className="mt">400 University Drive Suite 200 Coral<br/> Gobles,<br/> FL 33134 USA</p>
            </div>
            <div className="footer-section">
            <h4>Links</h4>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li> <Link to='/Shop'>Shop</Link></li>
                <li><Link to='/Contact'>Contact</Link></li>
                <li><Link to="/Blog">Blog</Link></li>
            </ul>
            </div>
            <div className="footer-section">
            <h4>Help</h4>
            <ul>
                <li>Payment Options</li>
                <li>Returns</li>
                <li>Privacy Policies</li>
            </ul>
            </div>
            <div className="footer-section">
            <h4>Newsletter</h4>
            <form>
                <input type="email" placeholder="Enter Your Email Address" className="footer-input"/>
                <button type="submit" className="subscribe-button">
                SUBSCRIBE
                </button>
            </form>
            </div>
        </div>
    <div className="divp"><p>&copy; 2022 Meubel House. All rights reserved</p></div>
    </footer>
);
};

export default Footer;
