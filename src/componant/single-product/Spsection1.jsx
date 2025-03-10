import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync } from '../../redux/cartSlice';
import './Spsection1.css';
import './Sppopup.css';

const Spsection1 = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    const { status } = useSelector((state) => state.cart);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`http://127.0.0.1:8000/api/products/${id}`)
            .then((response) => {
                setProduct(response.data.product);
                setIsLoading(false);
            })
            .catch(() => {
                alert("Failed to fetch product details. Please try again later.");
                setIsLoading(false);
            });
    }, [id]);
    

    useEffect(() => {
        document.body.style.overflow = isPopupOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isPopupOpen]);

    const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrease = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleAddToCart = () => {
        if (!product) return;
    
        const token = localStorage.getItem("token");
    
        if (!token) {
            alert("You must be logged in to add items to the cart.");
            navigate('/login'); // Redirect only for adding to cart
            return;
        }
    
        dispatch(addToCartAsync({ id: product.id, quantity }))
            .unwrap()
            .then(() => {
                openPopup();
            })
            .catch((error) => {
                alert(error.message || "Failed to add item to cart. Please try again.");
                openPopup();
            });
    };

    const handleAddToWishlist = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must be logged in to add items to the wishlist.");
            navigate('/login'); // Redirect to login if not authenticated
            return;
        }

        setWishlistLoading(true);
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/wishlist/add/${product.id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to add item to wishlist. Please try again.");
        } finally {
            setWishlistLoading(false);
        }
    };
    

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const subtotal = (product?.price * quantity).toFixed(2);

    const viewCart = () => navigate('/cart');
    const checkout = () => navigate('/checkout');
    const continueShopping = () => navigate('/Shop');

    if (isLoading) {
        return (
            <div className="loading-indicator">
                <div className="spinner"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    return (
        <div>
            <p className='sidepar'>Home <i className="fa-solid fa-chevron-right"></i> Shop<i className="fa-solid fa-chevron-right"></i> <span>|{product.title}</span> </p>
            <div className="mainspcont">
                <div className="spimg">
                    <div className="smallspimg">
                        <div><img src={product?.images?.[0]?.thumbnail1} alt={product?.title} loading="lazy" /></div>
                        <div><img src={product?.images?.[0]?.thumbnail2} alt={product?.title} loading="lazy" /></div>
                        <div><img src={product?.images?.[0]?.thumbnail3} alt={product?.title} loading="lazy" /></div>
                        <div><img src={product?.images?.[0]?.thumbnail4} alt={product?.title} loading="lazy" /></div>
                    </div>
                    <div className="largeimg">
                        <img src={product?.images?.[0]?.image || "/default-image.jpg"} alt={product?.title || "Product"} loading="lazy" onError={(e) => { e.target.src = "/default-image.jpg"; }} />
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
                            <input
                                type="number"
                                value={quantity}
                                min="1"
                                max="100"
                                onChange={(e) => {
                                    const value = Math.max(1, Math.min(100, Number(e.target.value)));
                                    setQuantity(value);
                                }}
                            />
                            <button onClick={handleIncrease}>+</button>
                        </div>
                        <button onClick={handleAddToCart} className='cartbtn' disabled={status === "loading"}>
                            {status === "loading" ? "Adding..." : "Add to Cart"}
                        </button>
                        <button onClick={handleAddToWishlist} className="wishlist-btn" disabled={wishlistLoading}>
                            {wishlistLoading ? "Adding to Wishlist..." : "Add to Wishlist"}
                        </button>
                    </div>
                </div>
            </div>
            {isPopupOpen && (
                <div className="popup">
                    <div onClick={closePopup} className="overlay" aria-label="Close popup"></div>
                    <div className="popup-content" role="dialog" aria-labelledby="popup-title">
                        <div className='titlepopup'>
                            <h2 id="popup-title">Shopping Cart</h2>
                            <button className="close-popup" onClick={closePopup} aria-label="Close popup">
                                <i className="fa-solid fa-circle-xmark"></i>
                            </button>
                        </div>
                        <div className='productslist'>
                            <div className='productpp'>
                                <img src={product?.images?.[0]?.image || "/default-image.jpg"} alt={product?.title || "Product"} loading="lazy" onError={(e) => { e.target.src = "/default-image.jpg"; }} />
                                <div className='productinfo'>
                                    <h6>{product.title}</h6>
                                    <p>{quantity} <i className="fa-solid fa-xmark"></i> ${product.price}</p>
                                </div>
                            </div>
                        </div>
                        <div className='suptotal'>
                            <p>Subtotal <span>${subtotal}</span></p>
                        </div>
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