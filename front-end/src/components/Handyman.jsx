import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ServiceDetail.css';

const Handyman = ({ onBook, service, userLoggedIn }) => {
  const [selectedTask, setSelectedTask] = useState('');
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const handleBookNow = () => {
    if (!selectedTask) {
      setError('Please select a task before proceeding.');
      return;
    }

    if (!userLoggedIn) {
      setError('Please log in to book this service.');
      return;
    }

    setError('');
    onBook();
  };

  const taskOptions = ['Small repairs', 'Furniture assembly', 'Electrical work', 'Plumbing issues'];

  const pricingDetails = [
    { type: 'Small repairs', price: '500' },
    { type: 'Furniture assembly', price: '600' },
    { type: 'Electrical work', price: '500' },
    { type: 'Plumbing issues', price: '700' },
  ];

  return (
    <div className="service-detail">
      <h1>{service?.name || 'Handyman'}</h1>

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
              <p className="price-primary">500 for servicing cost</p>
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
            Our handyman services cover everything from fixing leaks to assembling furniture. No job is too small for our professionals.
          </p>
          <p className="duration">1 person</p>
        </div>

        <div className="section">
          <h2>What needs fixing?</h2>
          <div className="room-options">
            {taskOptions.map((option) => (
              <label key={option} className="room-option">
                <input
                  type="radio"
                  name="handyman-task"
                  className="room-radio"
                  value={option}
                  checked={selectedTask === option}
                  onChange={() => setSelectedTask(option)}
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
            <h2>{service?.name || 'Handyman'} – Task Pricing</h2>
            <ul className="furniture-pricing-list">
              {pricingDetails.map((item) => (
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

Handyman.propTypes = {
  onBook: PropTypes.func.isRequired,
  service: PropTypes.shape({
    name: PropTypes.string,
  }),
  userLoggedIn: PropTypes.bool.isRequired,
};

export default Handyman;
