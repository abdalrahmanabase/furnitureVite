import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItemsAsync } from "../../redux/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cksection1.css";
import { Navigate, useNavigate } from "react-router-dom";

const Cksection1 = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    first_name: "",
    last_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    country: "",
    phone_number: "",
    zip_code: "",
    google_map_link: "",
  });

  useEffect(() => {
    dispatch(fetchCartItemsAsync()).catch((error) => {
      toast.error("Failed to fetch cart items!");
    });
    fetchCheckoutData();
  }, [dispatch]);

  const fetchCheckoutData = async () => {
    try {
      const response = await axios.get("/api/checkout", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAddresses(response.data.addresses);
      setSelectedAddress(response.data.selectedAddress);
    } catch (error) {
      toast.error("Failed to load checkout data!");
    }
  };

  const handleSelectAddress = async (id) => {
    try {
      await axios.post(
        "/api/checkout/select-address",
        { shipping_address_id: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setSelectedAddress(addresses.find((addr) => addr.id === id));
    } catch (error) {
      toast.error("Error selecting shipping address!");
    }
  };

  const handleCreateAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/shipping_addresses", newAddress, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAddresses([...addresses, response.data.address]);
      setShowAddressForm(false);
      toast.success("Address added successfully!");
    } catch (error) {
      toast.error("Error creating address!");
    }
  };

  const handleConfirmOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a shipping address before placing your order!");
      return;
    }
  
    try {
      await axios.post(
        "/api/checkout/confirm-order",
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      
      toast.success("Order confirmed successfully! Redirecting to home...");
  
      dispatch(fetchCartItemsAsync());
  
      setTimeout(() => {
        navigate("/");
      }, 2000); 
    } catch (error) {
      toast.error("Failed to confirm order!");
    }
  };
  
  return (
    <div className="checkout-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="shipping_address-container">
        <h2>Billing details</h2>
        <h3>Select Shipping Address</h3>
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`address-card ${selectedAddress?.id === address.id ? "selected" : ""}`}
            onClick={() => handleSelectAddress(address.id)}
          >
            <p>{address.first_name} {address.last_name}</p>
            <p>{address.address_line1}, {address.address_line2}</p>
            <p>{address.city}, {address.state}, {address.country}</p>
            <p>{address.phone_number}</p>
          </div>
        ))}
        <button onClick={() => setShowAddressForm((prev) => !prev)} className="add-address-button">
          {showAddressForm ? "Close Form" : "Add Address"}
        </button>

        {showAddressForm && (
          <form onSubmit={handleCreateAddress}>
            <input type="text" placeholder="First Name" value={newAddress.first_name} onChange={(e) => setNewAddress({ ...newAddress, first_name: e.target.value })} />
            <input type="text" placeholder="Last Name" value={newAddress.last_name} onChange={(e) => setNewAddress({ ...newAddress, last_name: e.target.value })} />
            <input type="text" placeholder="Address" value={newAddress.address_line1} onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })} />
            <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
            <input type="text" placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} />
            <input type="text" placeholder="Country" value={newAddress.country} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })} />
            <input type="text" placeholder="Phone Number" value={newAddress.phone_number} onChange={(e) => setNewAddress({ ...newAddress, phone_number: e.target.value })} />
            <button type="submit">Save Address</button>
          </form>
        )}
      </div>

      <div className="ch-cart-container">
        <h3>Cart Items</h3>
        {cartItems.length > 0 ? (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.product?.title} (x{item.quantity})</td>
                  <td>${(item.quantity * item.product?.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Your cart is empty.</p>
        )}

        <h5>Total <span>${totalPrice.toFixed(2)}</span></h5>
        <button onClick={handleConfirmOrder}  className="orderbutton">Place Order</button>
        
      </div>
      
    </div>
  );
};

export default Cksection1;
