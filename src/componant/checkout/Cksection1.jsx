import React, { useState, useEffect } from "react";
import axios from "axios";
import './Cksection1.css'

const Cksection1=()=> {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
      first_name: "",
      last_name: "",
      address_line1: "",
      city: "",
      country: "",
      phone_number: "",
    });
  
    useEffect(() => {
      fetchCheckoutData();
    }, []);
  
    const fetchCheckoutData = async () => {
      try {
        const response = await axios.get("/api/checkout", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setAddresses(response.data.addresses);
        setCartItems(response.data.cartItems);
        setSelectedAddress(response.data.selectedAddress);
      } catch (error) {
        console.error("Error fetching checkout data", error);
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
        console.error("Error selecting address", error);
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
      } catch (error) {
        console.error("Error creating address", error);
      }
    };
  
    const handleConfirmOrder = async () => {
      try {
        await axios.post("/api/checkout/confirm-order", {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Order confirmed successfully!");
      } catch (error) {
        console.error("Error confirming order", error);
      }
    };
  
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <h3>Select Shipping Address</h3>
        <button onClick={() => setShowAddressForm(true)}>Add Address</button>
        {addresses.map((address) => (
          <div key={address.id}>
            <input
              type="radio"
              name="shipping_address"
              checked={selectedAddress?.id === address.id}
              onChange={() => handleSelectAddress(address.id)}
            />
            {address.first_name} {address.last_name}, {address.address_line1}, {address.city}, {address.country}
          </div>
        ))}
  
        {showAddressForm && (
          <form onSubmit={handleCreateAddress}>
            <input
              type="text"
              placeholder="First Name"
              value={newAddress.first_name}
              onChange={(e) => setNewAddress({ ...newAddress, first_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newAddress.last_name}
              onChange={(e) => setNewAddress({ ...newAddress, last_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              value={newAddress.address_line1}
              onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Country"
              value={newAddress.country}
              onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={newAddress.phone_number}
              onChange={(e) => setNewAddress({ ...newAddress, phone_number: e.target.value })}
            />
            <button type="submit">Save Address</button>
          </form>
        )}
  
        <h3>Cart Items</h3>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>{item.product.title} - {item.quantity} x ${item.product.price}</li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
  
        <button onClick={handleConfirmOrder} disabled={!selectedAddress}>Confirm Order</button>
      </div>
    );
  };
  

export default Cksection1


