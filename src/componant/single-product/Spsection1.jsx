import React, { useEffect, useState } from 'react';
import api from '../../redux/api'; // ✅ use api instance
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync } from '../../redux/cartSlice';
import { fetchWishlistAsync, toggleWishlistAsync } from "../../redux/wishlistSlice";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const { wishlist, loading: wishlistLoading } = useSelector((state) => state.wishlist);
    const { status } = useSelector((state) => state.cart);

    // ✅ Fetch Product
    useEffect(() => {
        setIsLoading(true);
        api.get(`/products/${id}`)
            .then((response) => {
                setProduct(response.data.product);
                setIsLoading(false);
            })
            .catch(() => {
                toast.error("Failed to fetch product details. Please try again later.");
                setIsLoading(false);
            });
    }, [id]);

    // ✅ Handle popup scroll lock
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

    // ✅ Add To Cart
    const handleAddToCart = () => {
        if (!product) return;

        if (!localStorage.getItem("token")) {
            toast.error("You must be logged in to add items to the cart.");
            navigate('/login');
            return;
        }

        dispatch(addToCartAsync({ productId: product.id, quantity }))
            .unwrap()
            .then(() => {
                toast.success("Item added to cart successfully!");
                openPopup();
            })
            .catch((error) => {
                if (error.message === "User not authenticated") {
                    navigate('/login');
                    return;
                }
                toast.error(error.message || "Failed to add item to cart. Please try again.");
                if (error.message !== "User not authenticated") {
                    openPopup();
                }
            });
    };

    const handleToggleWishlist = () => {
        if (!product) return;
        if (!localStorage.getItem("token")) {
            toast.error("You must be logged in to add items to the wishlist.");
            navigate('/login');
            return;
        }
        dispatch(toggleWishlistAsync(product));
    };
    

    useEffect(() => {
        dispatch(fetchWishlistAsync());
    }, [dispatch]);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const isInWishlist = product ? wishlist.some((item) => item.product_id === product.id) : false;
    const subtotal = (product?.price * quantity).toFixed(2);

    const viewCart = () => navigate('/cart');
    const checkout = () => navigate('/checkout');

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
            <ToastContainer position="top-right" autoClose={3000} />
            <p className='sidepar'>
                <Link to='/'>Home</Link><i className="fa-solid fa-chevron-right"></i> 
                <Link to='/Shop'>Shop</Link><i className="fa-solid fa-chevron-right"></i> 
                <span>|{product.title}</span>
            </p>

            <div className="mainspcont">
                <div className="spimg">
                    <div className="smallspimg">
                        {['thumbnail1', 'thumbnail2', 'thumbnail3', 'thumbnail4'].map((thumb, i) => (
                            <div key={i}><img src={product?.images?.[0]?.[thumb]} alt={product?.title} loading="lazy" /></div>
                        ))}
                    </div>
                    <div className="largeimg">
                        <img src={product?.images?.[0]?.image || "/default-image.jpg"} alt={product?.title || "Product"} loading="lazy" onError={(e) => { e.target.src = "/default-image.jpg"; }} />
                    </div>
                </div>

                <div className="spwrite">
                    <h1 className='protitle'>{product.title}</h1>
                    <div className="staricons">
                        {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
                        <p>5.0 stars</p>
                    </div>
                    <h4>Price: ${product.price}</h4>
                    <p className='description'>{product.description}</p>

                    <h5>Colors</h5>
                    <div className='spcolors'>
                        {['brown', 'black', 'blue', 'gray', 'yellow'].map((color, i) => (
                            <div key={i} className="colors" style={{ backgroundColor: color }}></div>
                        ))}
                    </div>

                    <h5>Size</h5>
                    <div className='sizesdiv'>
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size, i) => (
                            <div key={i} className="size">{size}</div>
                        ))}
                    </div>

                    <div className="spbuy">
                        <div className="quantity">
                            <button onClick={handleDecrease} disabled={quantity <= 1}>-</button>
                            <span>{quantity}</span>
                            <button onClick={handleIncrease}>+</button>
                        </div>

                        <button onClick={handleAddToCart} className='cartbtn' disabled={status === "loading"}>
                            {status === "loading" ? "Adding..." : "Add to Cart"}
                        </button>
                        <button onClick={handleToggleWishlist} className="wishlist-btn" disabled={wishlistLoading}>
                            <i className="fa-solid fa-heart" style={{ color: isInWishlist ? "red" : "gray" }}></i>
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Spsection1;
