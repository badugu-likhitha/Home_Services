import React from 'react';
import PropTypes from 'prop-types';
import './ServiceDetail.css';

export const ServiceDetail = ({ service, onBook }) => {
  return (
    <div className="service-detail">
      <h1>{service?.name}</h1>

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
              <p className="price-primary">$98 for the first hour</p>
              <p className="price-secondary">$49 for each additional 30 minutes</p>
            </div>
            <button className="more-info">More information</button>
          </div>
        </div>

        <div className="section">
          <h2>What's included</h2>
          <p className="description">
            Your pro will arrive at the scheduled time with the tools and equipment needed.
            They'll clean the dirt, assemble, and make sure you satisfied properly.
          </p>
          <p className="duration">1 hour · 1 person</p>
        </div>

        <div className="section">
          <h2>How many rooms do you need cleaned?</h2>
          <div className="room-options">
            {['Just 1', '2 to 5', '6 to 10', 'More than 10'].map((option) => (
              <label key={option} className="room-option">
                <input
                  type="radio"
                  name="rooms"
                  className="room-radio"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={onBook}
          className="book-button"
        >
          Book now
        </button>
      </div>
    </div>
  );
};

ServiceDetail.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number
  }),
  onBook: PropTypes.func.isRequired
};