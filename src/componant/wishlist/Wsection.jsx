import React, { useEffect, useState } from "react";
import axios from "axios";
import './Wsection.css';

const Wsection = () => {
    const [wishlist, setWishlist] = useState([]);
    const token = localStorage.getItem("token"); // Get auth token
  
    useEffect(() => {
      fetchWishlist();
    }, []);
  
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(response.data.wishlist?.wishlist_items || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
  
    const removeFromWishlist = async (id) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/wishlistitems/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(wishlist.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error removing item:", error);
      }
    };
  
    return (
      <div className="max-w-3xl mx-auto p-5">
        <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
        {wishlist.length === 0 ? (
          <p className="text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {wishlist.map((item) => (
              <div key={item.id} className="flex items-center bg-white p-4 shadow-md rounded-lg">
                <img
                  src={item.product.image_url || "/imgs/default.png"}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.product.title}</h3>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}

export default Wsection;

