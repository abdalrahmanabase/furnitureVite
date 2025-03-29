import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './componant/Home/Home.jsx';
import Shop from './componant/shop/Shop.jsx';
import Singleproduct from './componant/single-product/Singleproduct.jsx';
import Contact from './componant/contact/Contact.jsx';
import Cart from './componant/cart/Cart.jsx';
import Checkout from './componant/checkout/Checkout.jsx';
import Blog from './componant/blog/Blog.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Wishlist from './componant/wishlist/Wishlist.jsx';
import Myaccount from './componant/my-account/Myaccount.jsx';
import Editprofle from './componant/my-account/Editprofle.jsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/singleproduct/:id" element={<Singleproduct />} />
            <Route path="/Login" element={<Myaccount/>} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/editprofile' element={<Editprofle/>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
