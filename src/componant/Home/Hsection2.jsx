import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./Hsection2.css";

const Hsection2 = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('api/products') 
            .then((response) => {
                setProducts(response.data.products); 
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    return (
        <div className="hsec2">
            <h2>Top Picks For You</h2>
            <p>Find a bright idea to suit your taste with our great selection of suspension, floor, and table lights.</p>
            
            <div className="sec2cont">
                <div className="proconth">
                    {products?.slice(0, 4).map((product) => (
                        <div className="product" key={product.id}>
                            <Link to={`/singleproduct/${product.id}`}>
                                {product.images && product.images.length > 0 ? (
                                    <img src={product.images[0].image} alt={product.title} />
                                ) : (
                                    <img src="/default-image.jpg" alt="Default Product" />
                                )}
                            </Link>
                            <p>{product.title}</p>
                            <h3>Price: ${product.price}</h3>
                        </div>
                    ))}
                </div>
            </div>

            <button>View More</button>
        </div>
    );
};

export default Hsection2;
