import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    mobileNumber: '', // Mobile number field included
  });

  const [statusMessage, setStatusMessage] = useState('');

  // Fetch the logged-in user's mobile number from localStorage
  useEffect(() => {
    const storedMobileNumber = localStorage.getItem('mobileNumber');
    if (storedMobileNumber) {
      setFormData((prev) => ({ ...prev, mobileNumber: storedMobileNumber }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.mobileNumber) {
        setStatusMessage('User not logged in. Please log in to submit feedback.');
        return;
      }

      // Construct the payload matching the backend's expected fields
      const payload = {
        fullname: formData.name,
        emailId: formData.email,
        feedback: formData.message,
        mobileNumber: formData.mobileNumber,
      };

      const response = await axios.post('http://localhost:9090/homeservice1/api/contact/submit', payload);

      if (response.status === 200 || response.status === 201) {
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '', mobileNumber: formData.mobileNumber });
      } else {
        setStatusMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setStatusMessage('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="contact-container">
      <div className="main-contact">
        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-field">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-field">
              <label>Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-field">
              <label>Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here"
                rows="5"
                required
              />
            </div>
            <div className="form-field">
              <label>Your Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                readOnly
              />
            </div>
            <button type="submit" className="send-button">
              Send Message
            </button>
          </form>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>

        <div className="contact-info-section">
          <h1>Contact Us</h1>
          <p className="subtitle">We'd love to hear from you!</p>

          <div className="contact-details">
            <div className="contact-item">
              <h3>Email</h3>
              <p>info@homeservicepro.com</p>
            </div>
            <div className="contact-item">
              <h3>Phone</h3>
              <p>+91 7036185654</p>
            </div>
            <div className="contact-item">
              <h3>Location</h3>
              <p>Vijayawada, Andhra Pradesh</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-section">
        <div className="footer-column">
          <h4>Service Team</h4>
          <p>Address:</p>
          <p>Vijayawada, Andhra Pradesh</p>
          <p>Support:</p>
          <p>+91 7036185654</p>
          <p>info@homeservicepro.com</p>
        </div>
        <div className="footer-column">
          <h4>Quick Links</h4>
          <a href="#">Follow Us</a>
          <a href="#">Join Our Community</a>
          <a href="#">Explore Our Blog</a>
          <a href="#">FAQs</a>
        </div>
        <div className="footer-column">
          <h4>Help & Support</h4>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Feedback</a>
          <a href="#">Help Center</a>
        </div>
      </div>
    </div>
  );
};
