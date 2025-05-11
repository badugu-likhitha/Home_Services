import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ServiceDetail.css';

const FurnitureAssembly = ({ onBook, service, userLoggedIn }) => {
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const handleBookNow = () => {
    if (!selectedType) {
      setError('Please select a furniture type before proceeding.');
      return;
    }

    if (!userLoggedIn) {
      setError('Please log in to book this service.');
      return;
    }

    setError('');
    onBook();
  };

  const furnitureTypes = [
    { type: 'Tables', price: '400 ' },
    { type: 'Chairs', price: '400 ' },
    { type: 'Beds', price: '500 ' },
    { type: 'Shelving Units', price: '600 ' },
    { type: 'Others', price: '600+' },
  ];

  return (
    <div className="service-detail">
      <h1>{service?.name || 'Furniture Assembly'}</h1>

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
              <p className="price-primary">400 for the servicing cost</p>
              <p className="price-secondary">100 for door service</p>
            </div>
            <button className="more-info" onClick={() => setShowInfo(true)}>
              More information
            </button>
          </div>
        </div>

        <div className="section">
          <h2>What's included</h2>
          <p className="description">
            Our furniture assembly service includes assembling all types of furniture, including tables, chairs, beds, and shelving units.
          </p>
          <p className="duration"> 1 person</p>
        </div>

        <div className="section">
          <h2>What type of furniture do you need assembled?</h2>
          <div className="room-options">
            {furnitureTypes.map((option) => (
              <label key={option.type} className="room-option">
                <input
                  type="radio"
                  name="furniture-type"
                  className="room-radio"
                  value={option.type}
                  checked={selectedType === option.type}
                  onChange={() => setSelectedType(option.type)}
                />
                <span>{option.type}</span>
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
            <h2>{service?.name || 'Furniture Assembly'} – Pricing Details</h2>
            <ul className="furniture-pricing-list">
              {furnitureTypes.map((item) => (
                <li key={item.type}>
                  <strong>{item.type}:</strong> {item.price}
                </li>
              ))}
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

FurnitureAssembly.propTypes = {
  onBook: PropTypes.func.isRequired,
  service: PropTypes.shape({
    name: PropTypes.string,
  }),
  userLoggedIn: PropTypes.bool.isRequired,
};

export default FurnitureAssembly;
