import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('request');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const sendOtp = () => {
    if (!identifier) {
      alert('Please enter email or phone number');
      return;
    }
    
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    
    alert(`🔐 Your OTP is: ${randomOtp}\n\nThis would be sent to ${identifier} in production.`);
    setStep('verify');
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      onLogin({ 
        identifier, 
        loginTime: new Date().toLocaleString(),
        isEmail: identifier.includes('@')
      });
    } else {
      alert('❌ Invalid OTP! Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-large">
          <h1>🌾 ELVRE</h1>
          <p>Pure Jaggery • Natural Sweetness</p>
        </div>
        
        {step === 'request' ? (
          <>
            <h2>Welcome to ElVre!</h2>
            <p>Login with Email or Phone Number</p>
            <input
              type="text"
              placeholder="Email or Phone Number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="login-input"
            />
            <button onClick={sendOtp} className="login-btn">
              Send OTP
            </button>
          </>
        ) : (
          <>
            <h2>Verify OTP</h2>
            <p>Enter OTP sent to {identifier}</p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="login-input"
              maxLength="6"
            />
            <button onClick={verifyOtp} className="login-btn">
              Verify & Login
            </button>
            <button onClick={() => setStep('request')} className="back-btn">
              ← Back
            </button>
          </>
        )}
        
        <div className="demo-note">
          <strong>📝 Demo Instructions:</strong><br />
          1. Enter any email or phone (e.g., customer@elvre.in)<br />
          2. Click "Send OTP" - OTP will show in alert box<br />
          3. Enter that OTP and click Verify
        </div>
      </div>
    </div>
  );
}

export default LoginPage;