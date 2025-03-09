import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCartItemsAsync,
  removeFromCartAsync,
  updateQuantityAsync,
  clearCartAsync,
} from "../../redux/cartSlice";
import "./Cartsection.css";

const Cartsection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart data from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const totalPrice = useSelector((state) => state.cart.totalPrice || 0);
  const status = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);

  // Fetch cart items when the component mounts
  useEffect(() => {
    dispatch(fetchCartItemsAsync())
      .unwrap()
      .catch((error) => {
        console.error("Error fetching cart:", error);
        alert(error.message || "Failed to fetch cart items.");
      });
  }, [dispatch]);

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => {
    dispatch(removeFromCartAsync(id))
      .unwrap()
      .catch((error) => {
        alert(error.message || "Failed to remove item from cart.");
      });
  };

  // Handle updating the quantity of a cart item
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantities
    dispatch(updateQuantityAsync({ id, quantity: newQuantity }))
      .unwrap()
      .catch((error) => {
        alert(error.message || "Failed to update quantity.");
      });
  };

  // Handle clearing the entire cart
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCartAsync())
        .unwrap()
        .then(() => {
          alert("Cart cleared successfully!");
        })
        .catch((error) => {
          alert(error.message || "Failed to clear cart.");
        });
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    navigate("/shop");
  };

  // Display loading or error states
  if (status === "loading") {
    return (
      <div className="loading-indicator">
        <div className="spinner"></div>
        <p>Loading cart details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="big-cart">
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <h2>Your cart is empty.</h2>
        ) : (
          cartItems.map((item) => (
            <div className=".cart-item" key={item.id}>
              <img src={item.product?.images?.[0]?.image || "/default-image.jpg"} alt={item.product?.title} />
              <div className="cart-details">
                <h4>{item.product?.title}</h4>
                <p>Price: ${item.product?.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleRemoveItem(item.id)} className="delete-button">
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="quantity-button"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="quantity-button">
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-footer-carts ">
          <div className="cart-totals">
            <h1>Cart Totals</h1>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>
          <div className="cart-actions">
            <button onClick={handleCheckout} className="checkout-button-cart ">
              Checkout
            </button>
            <button onClick={handleClearCart} className="clear-cart-button">
              Clear Cart
            </button>
            <button onClick={handleContinueShopping} className="continue-shopping-button">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cartsection;
