import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BookingForm.css';

export const BookingForm = ({ service, onConfirm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!name || !phone || !address || !date || !time) {
      setError('Please fill out all fields.');
      return;
    }

    setError('');
    setLoading(true);

    const bookingData = {
      fullname: name,
      mobileNumber: phone,
      address: address,
      serviceName: service?.name,
      dateOfService: date,
      timeOfService: time,
      serviceDescription: service?.description || 'A premium service experience tailored to your preferences.',
      paymentMethod: 'Cash On Delivery',
      bookingStatus: 'Confirmed',
    };

    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const savedBooking = await response.json();
        alert('Booking successful!');
        onConfirm(savedBooking);
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.message || 'Failed to book the service.');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking">
      <div className="booking-container">
        <div className="form-container">
          <h2>Book Your Service</h2>
          <div className="form">
            <div className="form-group">
              
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
            
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              
              <input
                type="text"
                value={service?.name || ''}
                readOnly
                className="readonly"
              />
            </div>
            <div className="form-group">
             
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Select date"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
             
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Enter time"
                required
                disabled={loading}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <p className="booking-note">
              📌 <strong>Note:</strong> Please read all service prices carefully before booking.
            </p>

            <button
              className="confirm-button"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>

        <div className="promo-container">
          <img src="takeaction.png" alt="Promo" className="promo-image" />
          <h2 className="promo-title">Take Action Now!</h2>
          <p className="promo-subtext">
            Fill out the form to get started. Quick, easy, and secure.
          </p>
          <div className="promo-benefits">
            <h3>Why Choose Haven Hands?</h3>
            <ul>
              <li>🛠 Trusted local professionals</li>
              <li>📅 Hassle-free scheduling</li>
              <li>💰 Transparent pricing</li>
              <li>📞 24/7 customer support</li>
              <li>🛡 Quality guarantee</li>
              <li>🔒 Safe and secure</li>
            </ul>
          </div>
          <div className="promo-quote">
            <p>“Your service brought peace of mind to our home. Booking was seamless and fast.”</p>
            <span>– Happy Customer</span>
          </div>
        </div>
      </div>

      <div className="steps-container">
        <h3>How It Works</h3>
        <p className="steps-subtext">A simple guide to booking your service and viewing your profile.</p>
        <div className="steps">
          <div className="step">
            <img src="filldetails.png" alt="Fill details" className="step-image" />
            <div className="step-content">
              <h4>Step 1: Fill Details</h4>
              <p>Complete the form with your information to secure your booking.</p>
            </div>
          </div>
          <div className="step">
            <img src="confirm.png" alt="Confirm booking" className="step-image" />
            <div className="step-content">
              <h4>Step 2: Confirm Booking</h4>
              <p>Review your details and confirm your booking with a click.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BookingForm.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onConfirm: PropTypes.func.isRequired,
};
