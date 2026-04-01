import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ThankYou from './components/ThankYou';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  // Load cart from browser storage
  useEffect(() => {
    const savedCart = localStorage.getItem('elvre-cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart to browser storage
  useEffect(() => {
    localStorage.setItem('elvre-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleLogin = (userData) => {
    setUserDetails(userData);
    setIsLoggedIn(true);
  };

  const handlePaymentSuccess = () => {
    setShowCart(false);
    setOrderComplete(true);
    setCart([]);
    localStorage.removeItem('elvre-cart');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (orderComplete) {
    return <ThankYou userDetails={userDetails} cart={cart} />;
  }

  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <h1>🌾 ELVRE</h1>
          <p>Medicinally Pure Jaggery</p>
        </div>
        <button className="cart-icon" onClick={() => setShowCart(true)}>
          🛒 <span className="cart-count">{cart.length}</span>
        </button>
      </header>

      <ProductList addToCart={addToCart} />

      {showCart && (
        <Cart 
          cart={cart} 
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          userDetails={userDetails}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

export default App;