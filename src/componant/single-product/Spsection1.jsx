import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import './Spsection1.css';
import './Sppopup.css'

const Spsection1 = () => {
    const { id } = useParams(); // Get product ID from URL parameters
    const [product, setProduct] = useState(null); 
    const [quantity, setQuantity] = useState(1);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`api/products/${id}`)
            .then(response => {
                setProduct(response.data.product);
            })
            .catch(error => {
                console.error("Error fetching product data:", error);
            });
    }, [id]);

    useEffect(() => {
        document.body.style.overflow = isPopupOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isPopupOpen]);

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleaddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
        openPopup();
    };

    if (!product) {
        return (
            <div className="loading-indicator">
                <div className="spinner"></div>
                <p>Loading products...</p>
            </div>
        );
    }

    // popup
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const subtotal = (product.price * quantity).toFixed(2);

    const viewCart = () => navigate('/cart'); 
    const checkout = () => navigate('/checkout'); 
    const continueShopping = () => navigate('/Shop');
return (
    <div>
        <p className='sidepar'>Home <i className="fa-solid fa-chevron-right"></i> Shop<i className="fa-solid fa-chevron-right"></i> <span>|{product.title}</span> </p>
        <div className="mainspcont">
        <div className="spimg">
            
            <div className="smallspimg">
                <div><img src={product.thumbnail1} alt={product.title} /></div> 
                <div><img src={product.thumbnail2} alt={product.title} /></div> 
                <div><img src={product.thumbnail3} alt={product.title} /></div> 
                <div><img src={product.thumbnail4} alt={product.title} /></div> 
            </div>
            <div className="largeimg">
                <img src={product.image} alt={product.title} />
            </div>
        </div>
        <div className="spwrite">
            <h1 className='protitle'>{product.title}</h1>
            <div className="staricons">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <p>5.0 stars</p>
            </div>
            <h4>Price: ${product.price}</h4>
            <p className='description'>{product.description}</p>

            <h5>Colors</h5>
            <div className='spcolors'>
                <div className="colors" style={{ backgroundColor: 'brown' }}></div>
                <div className="colors" style={{ backgroundColor: 'black' }}></div>
                <div className="colors" style={{ backgroundColor: 'blue' }}></div>
                <div className="colors" style={{ backgroundColor: 'gray' }}></div>
                <div className="colors" style={{ backgroundColor: 'yellow' }}></div>
            </div>

            <h5>Size</h5>
            <div className='sizesdiv'>
                <div className="size">S</div>
                <div className="size">M</div>
                <div className="size">L</div>
                <div className="size">XL</div>
                <div className="size">XXL</div>
            </div>

            <div className="spbuy">
                <div className="quantity">
                    <button onClick={handleDecrease} disabled={quantity <= 1}>-</button>
                    <input type="number" value={quantity } min="1"  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} ></input>
                    <button onClick={handleIncrease}>+</button>
                </div>
                <button onClick={handleaddToCart} className='cartbtn'>Add to Cart</button>
            </div>
            </div>
        </div>
        {isPopupOpen && (
        <div className="popup">
            <div onClick={closePopup} className="overlay"></div>
            <div className="popup-content">
                <div className='titlepopup'>
                <h2>Shopping Cart</h2>
                <button className="close-popup" onClick={closePopup}><i class="fa-solid fa-circle-xmark"></i></button>
                </div>
                <div className='productslist'>
                <div className='productpp'>
                    <img src={product.image} alt={product.title} />
                    <div className='productinfo'>
                    <h6>{product.title}</h6>
                    <p>{quantity}<i class="fa-solid fa-xmark"></i>${product.price}</p>
                    </div>
                </div>
                </div>
                <div className='suptotal'><p>Subtotal <span>${subtotal}</span></p></div>
                <div className='popupbtn'>
                    <button onClick={viewCart}>View Cart</button>
                    <button onClick={checkout}>Checkout</button>
                    <button onClick={continueShopping}>Continue Shopping</button>
                </div>
                
            </div>
        </div>
        )}
    </div>
);
};

export default Spsection1;
