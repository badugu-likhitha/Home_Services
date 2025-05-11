import React from 'react';
import PropTypes from 'prop-types';
import './Home.css';

export const Home = ({ onNavigate }) => {
 const services = [
  { id: 1, name: 'House Cleaning', image: 'housecleaning.png' },
  { id: 2, name: 'Furniture Assembly', image: 'furniture.png' },
  { id: 3, name: 'TV Mounting', image: 'vmounting.png' },
  { id: 4, name: 'Moving Help', image: 'movinghelp.png' },
  { id: 5, name: 'Yard Work', image: 'yardwork.png' },
  { id: 6, name: 'AC Installation', image: 'ac.png' },
];


  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <img
          src="homeimage1.png"
          alt="Modern Living Room"
          className="hero-image"
        />
        <div className="hero-overlay">
          <h1>YOUR HOME, OUR CARE</h1>
        </div>
      </div>

      {/* Intro Section */}
      <section className="intro">
        <h2>
          Welcome to <span>HAVEN HANDS</span>
        </h2>
        <p>
          Discover a variety of home services tailored to make your life easier.
          From maintenance and repairs to cleaning and renovations, our team of
          professionals is here to help.
        </p>
      </section>

      {/* Top-rated Services */}
      <section className="services">
        <h3>Top-rated services</h3>
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => onNavigate('services')}
            >
              <img src={service.image} alt={service.name} className="service-image" />
              <p>{service.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <p className="testimonial-subtitle">Real feedback from our satisfied clients.</p>
        <div className="testimonials-grid">
          <TestimonialCard
            text="This service transformed my home! Highly recommend."
            author="Jane Doe"
          />
          <TestimonialCard
            text="Professional and reliable. Will use again!"
            author="John Smith"
          />
        </div>
      </section>
    </div>
  );
};

const TestimonialCard = ({ text, author }) => (
  <div className="testimonial-card">
    <p className="testimonial-text">“{text}”</p>
    <div className="testimonial-footer">
      <img src="janedoe.png" alt={author} className="avatar" />
      <div>
        <p className="testimonial-author">{author}</p>
        <p className="stars">★★★★★</p>
      </div>
    </div>
  </div>
);

// PropTypes
Home.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

TestimonialCard.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
