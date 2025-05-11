import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ServiceDetail.css';

const LawnCare = ({ onBook, service, userLoggedIn }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const handleBookNow = () => {
    if (!selectedSize) {
      setError('Please select a lawn size before proceeding.');
      return;
    }

    if (!userLoggedIn) {
      setError('Please log in to book this service.');
      return;
    }

    setError('');
    onBook(); // Proceed to next step
  };

  const lawnSizes = [
    'Under 500 sq. ft.',
    '500 to 1000 sq. ft.',
    '1000 to 3000 sq. ft.',
    'Over 3000 sq. ft.'
  ];

  return (
    <div className="service-detail">
      <h1>{service?.name || 'Lawn Care'}</h1>

      <div className="detail-card">
        <div className="rating">
          <div className="rating-score">4.7</div>
          <div className="rating-label">
            <div>Average rating</div>
          </div>
        </div>

        <div className="section">
          <h2>Pricing</h2>
          <div className="pricing">
            <div>
              <p className="price-primary">₹1200 for servicing cost</p>
              <p className="price-secondary">+₹100 for door service</p>
            </div>
            <button className="more-info" onClick={() => setShowInfo(true)}>
              More information
            </button>
          </div>
        </div>

        <div className="section">
          <h2>What's included</h2>
          <p className="description">
            Our expert lawn care team will mow, trim, and edge your lawn to perfection. We also remove clippings and ensure your lawn stays healthy and green.
          </p>
          <p className="duration">1 person</p>
        </div>

        <div className="section">
          <h2>How large is your lawn?</h2>
          <div className="room-options">
            {lawnSizes.map((option) => (
              <label key={option} className="room-option">
                <input
                  type="radio"
                  name="lawn-size"
                  className="room-radio"
                  value={option}
                  checked={selectedSize === option}
                  onChange={() => setSelectedSize(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>

        <p className="info-note">⚠️ Check prices in "More information" before clicking on Book now.</p>

        <button onClick={handleBookNow} className="book-button">
          Book now
        </button>
      </div>

      {showInfo && (
        <div className="more-info-modal">
          <div className="modal-content">
            <h2>{service?.name || 'Lawn Care'} – Pricing Details</h2>
            <ul className="furniture-pricing-list">
              <li><strong>Under 500 sq. ft.:</strong> ₹1200 </li>
              <li><strong>500 to 1000 sq. ft.:</strong> ₹1500 </li>
              <li><strong>1000 to 3000 sq. ft.:</strong> ₹1800 </li>
              <li><strong>Over 3000 sq. ft.:</strong> ₹2200 </li>
            </ul>
            <button className="close-modal" onClick={() => setShowInfo(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

LawnCare.propTypes = {
  onBook: PropTypes.func.isRequired,
  service: PropTypes.shape({
    name: PropTypes.string
  }),
  userLoggedIn: PropTypes.bool.isRequired
};

export default LawnCare;
