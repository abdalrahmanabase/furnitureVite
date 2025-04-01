import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../redux/api"; // Use the configured API instance
import "./Hsection4.css";

const Hsection4 = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        api.get("/blogs") // Use the correct API instance
            .then(response => {
                setBlogs(response.data?.blogs?.slice(0, 3) || []); // Use optional chaining with a fallback
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setBlogs([]); // Prevent UI break if request fails
            });
    }, []);

    return (
        <div className="hsec4">
            <h2>Our Blogs</h2>
            <p>Find a bright idea to suit your taste with our great selection</p>
            <div className="sec4cont">
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <div className="blog" key={blog.id}>
                            <img src={blog.image || "/imgs/default.png"} alt={blog.title} />
                            <h3>{blog.title}</h3>
                            <p>
                                <span><i className="fa-solid fa-user"></i> {blog.author || "Unknown"}</span>
                                <i className="fa-regular fa-calendar"></i> {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : "N/A"}
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
