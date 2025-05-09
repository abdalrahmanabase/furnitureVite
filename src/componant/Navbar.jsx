import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../componant/Navbar.css";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL; // ✅ dynamic API base

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      fetchUsername(token);
    }
  }, []);

  const fetchUsername = async (token) => {
    try {
      const response = await fetch(`${API_BASE}/user`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.user_name || "User");
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div>
      <nav>
        <div className="div1"></div>
        <div className="navlist">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Shop">Shop</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
            <li><Link to="/Blog">Blog</Link></li>
          </ul>
        </div>
        <div className="icons">

          {/* ✅ Notice className fix */}
          <div className="user-menu">
            <div>
              <i className="fa-regular fa-user"></i>
            </div>

            <div className="dropdown-menu">
              {isLoggedIn ? (
                <>
                  <p className="dropdown-header">Welcome, {username}</p>
                  <Link to="/">My Orders</Link>
                  <Link to="/editprofile">Edit Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <Link to="/Login">Login</Link>
              )}
            </div>
          </div>

          <Link to="/"><i className="fa-solid fa-magnifying-glass"></i></Link>
          <Link to="/wishlist"><i className="fa-regular fa-heart"></i></Link>
          <Link to="/Cart"><i className="fa-solid fa-cart-shopping"></i></Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
