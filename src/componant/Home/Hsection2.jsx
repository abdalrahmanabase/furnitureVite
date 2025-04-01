import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../redux/api"; // Ensure you're using the configured API instance
import "./Hsection2.css";

const Hsection2 = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('/products')  // Use the correct API instance
            .then((response) => {
                setProducts(response.data?.products || []); // Use a fallback
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setProducts([]); // Prevents UI from breaking
            });
    }, []);

    return (
        <div className="hsec2">
            <h2>Top Picks For You</h2>
            <p>Find a bright idea to suit your taste with our great selection of suspension, floor, and table lights.</p>
            
            <div className="sec2cont">
                <div className="proconth">
                    {products.length > 0 ? (
                        products.slice(0, 4).map((product) => (
                            <div className="product" key={product.id}>
                                <Link to={`/singleproduct/${product.id}`}>
                                    {product.images && product.images.length > 0 ? (
                                        <img src={product.images[0].image} alt={product.title} />
                                    ) : (
                                        <img src="/default-image.jpg" alt="Default Product" />
                                    )}
                                </Link>
                                <p>{product.title}</p>
                                <h3> ${product.price}</h3>
                            </div>
                        ))
                    ) : (
                        <p>No products available</p> // Show a message when no data is available
                    )}
                </div>
            </div>

            <button className="shop-button"><Link to="/Shop">View More</Link></button>
        </div>
    );
};

export default Hsection2;
