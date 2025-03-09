// import React from 'react';
// import { useSelector } from 'react-redux';
// import './Cksection2.css';

// const Cksection2 = () => {
//     const cartProducts = useSelector((state) => state.cart.cartProducts);
//     const totalPrice = useSelector((state) => state.cart.totalprice);

//     return (
//         <div className="checkout-page">
//             <div className="checkout-summary firstsub">
//                     <span>Product</span>
//                     <span>Subtotal</span>
//                 </div>
//             <div className="checkout-items">
//                 {cartProducts.map((item) => (
//                     <div className="checkout-item" key={item.id}>
//                         <p>{item.title} x {item.quantity}</p>
//                         <p>Rs. {(item.price * item.quantity).toFixed(2)}</p>
//                     </div>
//                 ))}
//                 <div className="checkout-summary total">
//                     <span>Total</span>
//                     <span>Rs. {totalPrice.toFixed(2)}</span>
//                 </div>
//             </div>
//             <div className="payment-options">
//                 <div className="payment-option">
//                     <input type="radio" name="payment" id="bank" />
//                     <label htmlFor="bank">Direct Bank Transfer</label>
//                 </div>
//                 <p className="payment-description">
//                     Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
//                 </p>
//                 <div className="payment-option">
//                     <input type="radio" name="payment" id="cod" />
//                     <label htmlFor="cod">Cash On Delivery</label>
//                 </div>
//             </div>
//             <p className="privacy-policy">
//                 Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our<br/> <span>privacy policy</span>.
//             </p>
//             <button  className="place-order-button" >Place Order</button>
//         </div>
//     );
// };

// export default Cksection2;

