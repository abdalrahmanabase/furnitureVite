import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Bsection1.css';
import '../shop/Ssection1.css';

const Bsection1 = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);

    const API = import.meta.env.VITE_API_URL; // ✅ use from env

    useEffect(() => {
        axios.get(`${API}/blogs`)
            .then(response => {
                setBlogs(response.data.blogs);
                setFilteredBlogs(response.data.blogs);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });

        axios.get(`${API}/categories`)
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    useEffect(() => {
        updateBlogs();
    }, [searchInput, sortOption, selectedCategory]);

    const updateBlogs = () => {
        let updatedBlogs = blogs.filter(blog =>
            blog.title.toLowerCase().includes(searchInput.toLowerCase())
        );

        if (selectedCategory) {
            updatedBlogs = updatedBlogs.filter(blog => blog.category.name === selectedCategory);
        }

        if (sortOption === "titleAsc") {
            updatedBlogs.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "titleDesc") {
            updatedBlogs.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOption === "dateAsc") {
            updatedBlogs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } else if (sortOption === "dateDesc") {
            updatedBlogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        setFilteredBlogs(updatedBlogs);
    };

    return (
        <div className="blogmain">
            <div className="filterandsearch">
                <div className="filretdiv">
                    <label>Category: </label>
                    <select onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filretdiv">
                    <label>Sort By: </label>
                    <select onChange={(e) => setSortOption(e.target.value)}>
                        <option value="">All</option>
                        <option value="titleAsc">Title (A-Z)</option>
                        <option value="titleDesc">Title (Z-A)</option>
                        <option value="dateAsc">Date (Oldest First)</option>
                        <option value="dateDesc">Date (Newest First)</option>
                    </select>
                </div>
                <div className="searchdiv">
                    <p>Shown Blogs: <span className="counter">{filteredBlogs.length}</span></p>
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </div>

            <div className="blogposts">
                {loading ? (
                    <div className="loading-indicator">
                        <div className="spinner"></div>
                        <p>Loading blogs...</p>
                    </div>
                ) : filteredBlogs.length > 0 ? (
                    filteredBlogs.map(blog => (
                        <div className="blogpost" key={blog.id}>
                            <img src={blog.image || "/imgs/default.png"} alt={blog.title} />
                            <div className="blog1">
                                <span><i className="fa-solid fa-user"></i> {blog.author}</span>
                                <span><i className="fa-solid fa-calendar"></i> {new Date(blog.created_at).toLocaleDateString()}</span>
                                <span><i className="fa-solid fa-tag"></i> {blog.category.name}</span>
                            </div>
                            <div className="blogdescription">
                                <h2>{blog.title}</h2>
                                <p>{blog.content}</p>
                            </div>
                            <button>Read more</button>
                        </div>
                    ))
                ) : (
                    <p>No blogs found.</p>
                )}
            </div>
        </div>
    );
};

export default Bsection1;
