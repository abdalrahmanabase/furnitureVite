import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlistAsync, toggleWishlistAsync } from "../../redux/wishlistSlice";
import "./Wsection.css";

const Wsection = () => {
  const dispatch = useDispatch();
  const { wishlist, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlistAsync());
  }, [dispatch]);

  const handleToggleWishlist = (product) => {
    if (!product?.id) return; // prevent broken calls
    dispatch(toggleWishlistAsync(product));
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

      {loading ? (
        <p className="text-gray-500">Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {wishlist.map((item) => {
            const product = item.product || {}; // fallback if product is null
            return (
              <div key={item.product_id} className="flex items-center bg-white p-4 shadow-md rounded-lg">
                <img
                  src={product.image_url || "/imgs/default.png"}
                  alt={product.title || "Product"} // fallback title
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{product.title || "No title"}</h3>
                  {product.price && <p className="text-sm text-gray-600">${product.price}</p>}
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  onClick={() => handleToggleWishlist(product)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wsection;
