import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ServiceDetail.css';

const TVMounting = ({ onBook, service, userLoggedIn }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const handleBookNow = () => {
    if (!selectedSize) {
      setError('Please select the TV size before proceeding.');
      return;
    }

    if (!userLoggedIn) {
      setError('Please log in to book this service.');
      return;
    }

    setError('');
    onBook(); // Proceed to next step
  };

  const tvSizes = ['Under 40 inches', '40 to 60 inches', 'Over 60 inches'];

  return (
    <div className="service-detail">
      <h1>{service?.name || 'TV Mounting'}</h1>

      <div className="detail-card">
        <div className="rating">
          <div className="rating-score">4.8</div>
          <div className="rating-label">
            <div>Average rating</div>
          </div>
        </div>

        <div className="section">
          <h2>Pricing</h2>
          <div className="pricing">
            <div>
              <p className="price-primary">100 for the servicing cost</p>
              <p className="price-secondary">50 for door service </p>
            </div>
            <button className="more-info" onClick={() => setShowInfo(true)}>
              More information
            </button>
          </div>
        </div>

        <div className="section">
          <h2>What's included</h2>
          <p className="description">
            Our TV mounting service includes securely mounting your TV to the wall, concealing cables, and testing the setup to ensure proper functionality.
          </p>
          <p className="duration">1 person</p>
        </div>

        <div className="section">
          <h2>TV Size</h2>
          <div className="room-options">
            {tvSizes.map((option) => (
              <label key={option} className="room-option">
                <input
                  type="radio"
                  name="tv-size"
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

        <button onClick={handleBookNow} className="book-button">
          Book now
        </button>
      </div>

      {showInfo && (
        <div className="more-info-modal">
          <div className="modal-content">
            <h2>TV Mounting – Pricing Details</h2>
            <ul className="furniture-pricing-list">
              <li><strong>Under 40 inches:</strong> 100 </li>
              <li><strong>40 to 60 inches:</strong> 120 </li>
              <li><strong>Over 60 inches:</strong> 150 </li>
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

TVMounting.propTypes = {
  onBook: PropTypes.func.isRequired,
  service: PropTypes.shape({
    name: PropTypes.string
  }),
  userLoggedIn: PropTypes.bool.isRequired
};

export default TVMounting;
