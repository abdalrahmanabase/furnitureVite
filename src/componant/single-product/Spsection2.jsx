import React, { useEffect, useState } from "react";
import api from '../../redux/api'; // Import your custom api instance
import { Link } from "react-router-dom";
import "./Spsection2.css";

const Spsection2 = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products') // Use your api instance to fetch the products
      .then((response) => {
        setProducts(response.data.products); // Update the state with the fetched products
      })
      .catch((error) => {
        console.error("Error fetching data: ", error); // Handle errors appropriately
      });
  }, []);

  return (
    <div className="spsec2">
      <h2>Related Products</h2>
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
      <button><Link to='/Shop'>View More</Link></button>
    </div>
  );
}

export default Spsection2;
