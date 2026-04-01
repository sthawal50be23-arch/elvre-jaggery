import React from 'react';
import './Cart.css';

// 👇 REPLACE THIS WITH YOUR ACTUAL RAZORPAY KEY ID
const RAZORPAY_KEY_ID = 'rzp_test_YOUR_KEY_HERE';

function Cart({ cart, onClose, onRemove, userDetails, onPaymentSuccess }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = total > 500 ? 0 : 40;
  const grandTotal = total + shipping;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    
    if (!isScriptLoaded) {
      alert('Failed to load Razorpay. Please check your internet connection.');
      return;
    }

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: grandTotal * 100,
      currency: 'INR',
      name: 'ELVRE Jaggery',
      description: 'Pure Jaggery Products',
      image: 'https://elvre.in/logo.png',
      prefill: {
        name: userDetails?.identifier || 'Customer',
        email: userDetails?.isEmail ? userDetails.identifier : '',
        contact: !userDetails?.isEmail ? userDetails.identifier : '',
      },
      notes: {
        address: 'ELVRE Jaggery, Haridwar'
      },
      theme: {
        color: '#8B5A2B'
      },
      handler: function(response) {
        alert(`✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}\n\nThank you for your purchase!`);
        
        // Send email confirmation
        sendEmailConfirmation();
        
        onPaymentSuccess();
      },
      modal: {
        ondismiss: function() {
          alert('Payment cancelled');
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const sendEmailConfirmation = () => {
    const orderId = 'ELV' + Date.now();
    alert(`📧 THANK YOU EMAIL\n━━━━━━━━━━━━━━━━━━━━━\nTo: ${userDetails.identifier}\nOrder ID: ${orderId}\nDate: ${new Date().toLocaleString()}\n\nItems:\n${cart.map(item => `• ${item.name} (${item.weight}) - ₹${item.price}`).join('\n')}\n\nSubtotal: ₹${total}\nShipping: ₹${shipping}\nTotal: ₹${grandTotal}\n━━━━━━━━━━━━━━━━━━━━━\n\nThank you for choosing ELVRE!\nDelivery in 3-5 days.\n\nContact: elvreofficals@gmail.com\n+91 7060998050`);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-container" onClick={(e) => e.stopPropagation()}>
          <button className="close-cart" onClick={onClose}>×</button>
          <h2>Your Cart</h2>
          <div className="empty-cart">
            <p>🛒 Your cart is empty</p>
            <button onClick={onClose} className="continue-shopping">Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-cart" onClick={onClose}>×</button>
        <h2>Shopping Cart</h2>
        
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={item.cartId} className="cart-item">
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>{item.weight}</p>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
              <button onClick={() => onRemove(index)} className="remove-item">
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{total}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
          </div>
          <div className="summary-row total">
            <strong>Total:</strong>
            <strong>₹{grandTotal}</strong>
          </div>
          {shipping > 0 && (
            <p className="shipping-note">✨ Add ₹{500 - total} more for free shipping!</p>
          )}
        </div>
        
        <button onClick={handlePayment} className="checkout-btn">
          Pay ₹{grandTotal} with Razorpay 💳
        </button>
        
        <p className="payment-note">🔒 Secure payment powered by Razorpay</p>
      </div>
    </div>
  );
}

export default Cart;