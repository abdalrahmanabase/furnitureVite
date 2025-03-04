import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from '../../redux/cartSlice';
import './Cartsection.css';
import { Link } from 'react-router-dom';

const Cartsection = () => {
    const cartProducts = useSelector((state) => state.cart.items); // Ensure it matches cartSlice state
    const totalPrice = useSelector((state) => state.cart.totalPrice); // Ensure consistency in state naming
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(removeFromCart(id)); // Dispatching action to remove item from cart
    };

    return (
        <div className="big-cart">
            <div className="cart-container">
                {cartProducts.length === 0 ? (
                    <h2>Your cart is empty.</h2>
                ) : (
                    cartProducts.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.thumbnail} alt={item.title} />
                            <div className="cart-details">
                                <h4>{item.title}</h4>
                                <p>Price: $ {item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => handleDelete(item.id)} className="delete-button">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="cart-footer-carts">
                <h1>Cart Totals</h1>
                <h3>Total Price: ${totalPrice}</h3>
                <button className="checkout-button-cart">
                    <Link to="/Checkout">Checkout</Link>
                </button>
            </div>
        </div>
    );
};

export default Cartsection;
