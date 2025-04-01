import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../redux/api";  // Import the custom API instance
import "../shop/Ssection1.css";

const Ssection1 = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch products and categories
    useEffect(() => {
        setLoading(true);
        api.get("products")  // Fetch products using the custom api instance
            .then((response) => {
                setProducts(response.data.products);
                setFilteredProducts(response.data.products);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });

        api.get("categories")  // Fetch categories using the custom api instance
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    // Function to update displayed products based on filters and sorting
    const updateProducts = () => {
        let updatedProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchInput.toLowerCase())
        );

        if (selectedCategory) {
            updatedProducts = updatedProducts.filter(product => product.category.name === selectedCategory);
        }

        if (sortOption === "nameAsc") {
            updatedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "nameDesc") {
            updatedProducts.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOption === "priceAsc") {
            updatedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === "priceDesc") {
            updatedProducts.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(updatedProducts);
    };

    // Update products when filters change
    useEffect(() => {
        updateProducts();
    }, [searchInput, sortOption, selectedCategory]);

    return (
        <div className="productsmain">
            {/* Filters and Sorting */}
            <div className="filterandsearch">
                {/* Category Filter */}
                <div className="filretdiv">
                    <label>Category: </label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">All </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>

                {/* Sort Options */}
                <div className="filretdiv">
                    <i className="fa-solid fa-sliders"></i>
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="">All </option>
                        <option value="nameAsc">Name Ascending</option>
                        <option value="nameDesc">Name Descending</option>
                        <option value="priceAsc">Price Ascending</option>
                        <option value="priceDesc">Price Descending</option>
                    </select>
                </div>

                {/* Search */}
                <div className="searchdiv">
                    <p>Shown Products: <span className="counter">{filteredProducts.length}</span></p>
                    <input
                        type="text"
                        placeholder="Search products"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </div>

            {/* Loading Indicator */}
            {loading ? (
                <div className="loading-indicator">
                    <div className="spinner"></div>
                    <p>Loading products...</p>
                </div>
            ) : (
                <div id="products-box" className="productbox">
                    {filteredProducts.slice(0, 16).map((product) => (
                        <div className="productdiv" key={product.id}>
                            <div className="productimg">
                                <Link to={`/singleproduct/${product.id}`}>
                                    {product.images && product.images.length > 0 ? (
                                        <img src={product.images[0].image} alt={product.title} />
                                    ) : (
                                        <img src="/default-image.jpg" alt="Default Product" />
                                    )}
                                </Link>
                            </div>
                            <div className="productdell">
                                <h4>{product.title}</h4>
                                <p>${product.price}</p>
                                <button>
                                    <Link to={`/singleproduct/${product.id}`}>View Product</Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Ssection1;
