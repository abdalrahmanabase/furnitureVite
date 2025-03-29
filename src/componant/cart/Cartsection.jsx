import React, { useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCartItemsAsync,
  removeFromCartAsync,
  updateQuantityAsync,
  clearCartAsync,
} from "../../redux/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cartsection.css";

const Cartsection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Get cart data from Redux store
  const { cartItems = [], totalPrice = 0, status, error } = useSelector((state) => state.cart);

  // ✅ Fetch cart items when the component mounts
  useEffect(() => {
    dispatch(fetchCartItemsAsync()).unwrap().catch(() => {
      toast.error("Failed to fetch cart items. Please try again.");
    });
  }, [dispatch]);

  // ✅ Handle removing an item from the cart
  const handleRemoveItem = useCallback((id) => {
    dispatch(removeFromCartAsync(id))
      .unwrap()
      .then(() => toast.success("Item removed from cart."))
      .catch(() => toast.error("Failed to remove item from cart."));
  }, [dispatch]);

  // ✅ Handle updating the quantity of a cart item
const handleUpdateQuantity = useCallback((id, newQuantity) => {
  if (newQuantity < 1) return;
  dispatch(updateQuantityAsync({ cartItemId: id, quantity: newQuantity }))
    .unwrap()
    .then(() => toast.success("Quantity updated."))
    .catch(() => toast.error("Failed to update quantity."));
}, [dispatch]);


  // ✅ Handle clearing the entire cart
  const handleClearCart = useCallback(() => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCartAsync())
        .unwrap()
        .then(() => toast.success("Cart cleared successfully!"))
        .catch(() => toast.error("Failed to clear cart."));
    }
  }, [dispatch]);

  // ✅ Handle checkout
  const handleCheckout = useCallback(() => navigate("/checkout"), [navigate]);

  // ✅ Memoized total price
  const formattedTotalPrice = useMemo(() => totalPrice.toFixed(2), [totalPrice]);

  // ✅ Loading & Error States
  if (status === "loading") {
    return (
      <div className="loading-indicator">
        <div className="spinner"></div>
        <p>Loading cart details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="big-cart">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <h2>Your cart is empty.</h2>
        ) : (
          cartItems.map(({ id, product, quantity }) => (
            <div className="cart-item" key={id}>
              <img
                  src={product?.images?.[0]?.image || "/default-image.jpg"}
                  alt={product?.title || "Product"}
                  loading="lazy"
                  onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-image.jpg";
                  }}
              />

              <div className="cart-details">
                <h3>{product?.title}</h3>
                <p>Price: ${product?.price}</p>
                <p>Quantity: {quantity}</p>
                <div className="quantity-button">
                  <button
                    onClick={() => handleUpdateQuantity(id, quantity - 1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <button onClick={() => handleUpdateQuantity(id, quantity + 1)} aria-label="Increase quantity">
                    +
                  </button>
                </div>
                <button onClick={() => handleRemoveItem(id)} className="delete-button" aria-label="Remove item">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-footer-carts">
          <div className="cart-totals">
            <h1>Cart Totals</h1>
            <h3>
              Total Price: <span>$ {formattedTotalPrice}</span>
            </h3>
          </div>
          <div className="cart-actions">
            <button onClick={handleCheckout} className="checkout-button-cart">
              Checkout
            </button>
            <button onClick={handleClearCart} className="checkout-button-cart">
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cartsection;
