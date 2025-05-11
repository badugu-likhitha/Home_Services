import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ServiceDetail.css';

const HouseCleaning = ({ onBook, service, userLoggedIn }) => {
  const [selectedRooms, setSelectedRooms] = useState('');
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const handleBookNow = () => {
    if (!selectedRooms) {
      setError('Please select the number of rooms before proceeding.');
      return;
    }

    if (!userLoggedIn) {
      setError('Please log in to book this service.');
      return;
    }

    setError('');
    onBook(); // Proceed to next step
  };

  const roomOptions = ['Just 1', '2 to 5', '6 to 10', 'More than 10'];

  return (
    <div className="service-detail">
      <h1>{service?.name || 'House Cleaning'}</h1>

      <div className="detail-card">
        <div className="rating">
          <div className="rating-score">4.9</div>
          <div className="rating-label">
            <div>Average rating</div>
          </div>
        </div>

        <div className="section">
          <h2>Pricing</h2>
          <div className="pricing">
            <div>
              <p className="price-primary">600 for the servicing cost</p>
              <p className="price-secondary">+100 for door servicing</p>
            </div>
            <button className="more-info" onClick={() => setShowInfo(true)}>
              More information
            </button>
          </div>
        </div>

        <div className="section">
          <h2>What's included</h2>
          <p className="description">
            Our professional cleaners will handle all areas of your home, from dusting furniture to sanitizing bathrooms and floors.
          </p>
          <p className="duration"> 1 person</p>
        </div>

        <div className="section">
          <h2>How many rooms do you need cleaned?</h2>
          <div className="room-options">
            {roomOptions.map((option) => (
              <label key={option} className="room-option">
                <input
                  type="radio"
                  name="rooms"
                  className="room-radio"
                  value={option}
                  checked={selectedRooms === option}
                  onChange={() => setSelectedRooms(option)}
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
            <h2>{service?.name || 'House Cleaning'} – Pricing Details</h2>
            <ul className="furniture-pricing-list">
              <li><strong>Just 1 room:</strong> ₹600 </li>
              <li><strong>2 to 5 rooms:</strong> ₹1500 </li>
              <li><strong>6 to 10 rooms:</strong> ₹2500 </li>
              <li><strong>More than 10 rooms:</strong> ₹3500 </li>
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

HouseCleaning.propTypes = {
  onBook: PropTypes.func.isRequired,
  service: PropTypes.shape({
    name: PropTypes.string
  }),
  userLoggedIn: PropTypes.bool.isRequired
};

export default HouseCleaning;
