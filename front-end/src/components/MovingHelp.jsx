import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ServiceDetail.css';

const MovingHelp = ({ onBook, service, userLoggedIn }) => {
  const [selectedRooms, setSelectedRooms] = useState('');
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const handleBookNow = () => {
    if (!userLoggedIn) {
      setError('Please log in to book a service.');
      return;
    }

    if (!selectedRooms) {
      setError('Please select the number of rooms before proceeding.');
      return;
    }

    setError('');
    onBook(); // Proceed to next step
  };

  const roomOptions = ['1 Room', '2 to 3 Rooms', '4 to 5 Rooms', 'More than 5 Rooms'];

  return (
    <div className="service-detail">
      <h1>{service?.name || 'Moving Help'}</h1>

      <div className="detail-card">
        <div className="rating">
          <div className="rating-score">4.6</div>
          <div className="rating-label">
            <div>Average rating</div>
          </div>
        </div>

        <div className="section">
          <h2>Pricing</h2>
          <div className="pricing">
            <div>
              <p className="price-primary">₹1000 for the servicing cost</p>
              <p className="price-secondary">+₹100 for door service </p>
            </div>
            <button className="more-info" onClick={() => setShowInfo(true)}>
              More information
            </button>
          </div>
        </div>

        <div className="section">
          <h2>What's included</h2>
          <p className="description">
            Our moving help service includes packing, loading, and unloading. We provide experienced movers to assist with your move, ensuring everything is safely transported.
          </p>
          <p className="duration">2 persons</p>
        </div>

        <div className="section">
          <h2>How many rooms are you moving?</h2>
          <div className="room-options">
            {roomOptions.map((option) => (
              <label key={option} className="room-option">
                <input
                  type="radio"
                  name="moving-rooms"
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

        <p className="info-note">⚠️ Check pricing in "More information" before booking.</p>

        <button onClick={handleBookNow} className="book-button">
          Book now
        </button>
      </div>

      {showInfo && (
        <div className="more-info-modal">
          <div className="modal-content">
            <h2>Moving Help – Pricing Details</h2>
            <ul className="furniture-pricing-list">
              <li><strong>1 Room:</strong> ₹1000 for </li>
              <li><strong>2 to 3 Rooms:</strong> ₹1500 </li>
              <li><strong>4 to 5 Rooms:</strong> ₹2000 </li>
              <li><strong>More than 5 Rooms:</strong> ₹2500</li>
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

MovingHelp.propTypes = {
  onBook: PropTypes.func.isRequired,
  service: PropTypes.shape({
    name: PropTypes.string,
  }),
  userLoggedIn: PropTypes.bool.isRequired,
};

export default MovingHelp;
