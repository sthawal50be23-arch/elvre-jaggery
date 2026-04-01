import React from 'react';
import './ThankYou.css';

function ThankYou({ userDetails, cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = total > 500 ? 0 : 40;
  const grandTotal = total + shipping;
  
  const handleEmailSimulation = () => {
    alert(`📧 EMAIL SENT to ${userDetails.identifier}\n\n━━━━━━━━━━━━━━━━━━━━━\n   ELVRE JAGGERY - ORDER CONFIRMATION\n━━━━━━━━━━━━━━━━━━━━━\n\nDear ${userDetails.identifier},\n\nThank you for your order!\n\nOrder ID: ELV${Date.now()}\nDate: ${new Date().toLocaleString()}\n\nItems:\n${cart.map(item => `• ${item.name} - ₹${item.price}`).join('\n')}\n\nTotal: ₹${grandTotal}\n\nDelivery: 3-5 business days\n\nContact: elvreofficals@gmail.com\n+91 7060998050\n━━━━━━━━━━━━━━━━━━━━━`);
  };

  const downloadBill = () => {
    const bill = `ELVRE JAGGERY - TAX INVOICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Order ID: ELV${Date.now()}
Date: ${new Date().toLocaleString()}
Customer: ${userDetails.identifier}
━━━━━━━━━━━━━━━━━━━━━━━━━━━

ITEMS:
${cart.map(item => `${item.name} (${item.weight}) - ₹${item.price}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal: ₹${total}
Shipping: ₹${shipping}
Total: ₹${grandTotal}
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thank you for choosing ELVRE!
Stay healthy, stay natural! 🌾`;
    
    const blob = new Blob([bill], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ELVRE_Bill_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <div className="success-icon">🎉</div>
        <h1>Thank You for Your Order!</h1>
        <p className="thankyou-message">Your order has been confirmed and will be processed shortly.</p>
        
        <div className="bill-summary">
          <h3>Order Confirmation</h3>
          <div className="customer-details">
            <p><strong>Customer:</strong> {userDetails.identifier}</p>
            <p><strong>Order ID:</strong> ELV{Date.now()}</p>
            <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
          </div>
          
          <div className="bill-items">
            <h4>Items Purchased:</h4>
            {cart.map((item, idx) => (
              <div key={idx} className="bill-item">
                <span>{item.name} ({item.weight})</span>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>
          
          <div className="bill-total">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₹{total}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="total-row grand-total">
              <strong>Total Paid:</strong>
              <strong>₹{grandTotal}</strong>
            </div>
          </div>
        </div>
        
        <div className="action-buttons">
          <button onClick={handleEmailSimulation} className="email-btn">
            📧 Send Email Confirmation
          </button>
          <button onClick={downloadBill} className="download-btn">
            📄 Download Bill
          </button>
          <button onClick={() => window.location.reload()} className="shop-again-btn">
            🛍️ Shop Again
          </button>
        </div>
        
        <div className="delivery-info">
          <p>📦 Estimated Delivery: 3-5 business days</p>
          <p>💚 Thank you for choosing natural, healthy sweetness!</p>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;