import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './componant/Home/Home.jsx';
import Shop from './componant/Shop/Shop';
import Singleproduct from './componant/single-product/Singleproduct';
import Contact from './componant/Contact/Contact';
import Cart from './componant/Cart/Cart';
import Checkout from './componant/Checkout/Checkout';
import Blog from './componant/Blog/Blog';
import Login from './componant/my-account/Login';
import Register from './componant/my-account/Register';
import { Provider } from 'react-redux';
import store from './redux/store.js';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/singleproduct/:id" element={<Singleproduct />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Blog" element={<Blog />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
