import React, { useState } from 'react';
import './Login.css';

export const Login = ({ onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedNumber = phoneNumber.trim();

    if (/^\d{10}$/.test(trimmedNumber)) {
      setLoading(true); // Show loading indicator
      try {
        const response = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mobileNumber: trimmedNumber }), // Send as an object
        });

        if (response.ok) {
          const result = await response.json();
          alert(result.message || 'Login successful!');
          localStorage.setItem('mobileNumber', trimmedNumber); // Store mobile number in localStorage
          onLoginSuccess(trimmedNumber); // Pass mobile number to parent to indicate login
        } else if (response.status === 401) {
          const errorData = await response.json();
          alert(errorData.error || 'Invalid mobile number. Please sign up.');
        } else {
          alert('Login failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
      } finally {
        setLoading(false); // Hide loading indicator
      }
    } else {
      alert('Please enter a valid 10-digit mobile number.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>LOGIN</h1>
        <p className="login-subtitle">
          "We are here to help with all your home service needs!"
        </p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your mobile number"
            className="phone-input"
            maxLength={10}
            disabled={loading} // Disable input during loading
            required
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};
