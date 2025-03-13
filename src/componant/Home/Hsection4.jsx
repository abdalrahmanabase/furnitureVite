import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Hsection4.css";

const Hsection4 = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/blogs")
            .then(response => {
                setBlogs(response.data.blogs.slice(0, 3)); // Get only the latest 3 blogs
            })
            .catch(error => console.error("Error fetching blogs:", error));
    }, []);

    return (
        <div className="hsec4">
            <h2>Our Blogs</h2>
            <p>Find a bright idea to suit your taste with our great selection</p>
            <div className="sec4cont">
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <div className="blog" key={blog.id}>
                            <img src={blog.image ? blog.image : "/imgs/default.png"} alt={blog.title} />
                            <h3>{blog.title}</h3>
                            <p>
                            <span><i className="fa-solid fa-user"></i> {blog.author}</span>
                            <i className="fa-regular fa-calendar"></i> {new Date(blog.created_at).toLocaleDateString()}
                            </p>
                            <button><Link to={`/blog/${blog.id}`}>Read More</Link></button>
                        </div>
                    ))
                ) : (
                    <p>No blogs available.</p>
                )}
            </div>
            <button className="shop-button"><Link to="/blog">View All Posts</Link></button>
        </div>
    );
};

export default Hsection4;
