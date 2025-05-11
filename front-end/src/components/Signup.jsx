import React, { useState } from 'react';
import './Login.css';

export const Signup = ({ onSignupSuccess }) => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedPhone = phoneNumber.trim();
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      alert('Please enter a valid username.');
      return;
    }

    if (/^\d{10}$/.test(trimmedPhone)) {
      try {
        const response = await fetch('http://localhost:8080/api/login/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: trimmedUsername,
            mobileNumber: trimmedPhone,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Signup successful:', data);
          onSignupSuccess(); // Navigate to services page
        } else if (response.status === 409) {
          const errorData = await response.json();
          alert(errorData.error || 'Mobile number already exists.');
        } else {
          alert('Signup failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during signup:', error);
        alert('Unable to signup. Please try again later.');
      }
    } else {
      alert('Please enter a valid 10-digit mobile number.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>SIGNUP</h1>
        <p className="login-subtitle">
          "We are here to help with all your home service needs!"
        </p>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="phone-input"
            required
            autoFocus
          />
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your mobile number"
            className="phone-input"
            maxLength={10}
            pattern="\d{10}"
            required
          />
          <br />
          <button type="submit" className="login-button">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};
