import React, { useState } from 'react';
import { Search } from 'lucide-react';
import PropTypes from 'prop-types';
import './Services.css';

export const Services = ({ onServiceSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    { id: 1, name: 'House Cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Lawn Care', image: 'https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&q=80&w=200' },
    { id: 3, name: 'Handyman', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=200' },
    { id: 4, name: 'Moving Help', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200' },
    { id: 5, name: 'TV Mounting', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200' },
    { id: 6, name: 'Furniture Assembly', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=200' },
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="services">
      <div className="services-header">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search for a service"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="intro-section">
          <div className="intro-text">
            <h1>Transform Your Home with <br /> Ease and Style.</h1>
            <p>Discover a variety of home services at your fingertips.</p>
          </div>
          <div className="intro-image">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" 
              alt="Home transformation" 
              className="home-image"
            />
          </div>
        </div>

        <h2 className="services-title">Our Services</h2>
        <div className="services-grid horizontal-scroll">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div 
                key={service.id}
                className="service-item"
                onClick={() => onServiceSelect(service)}
              >
                <div className="service-image-container">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="service-image"
                  />
                </div>
                <p className="service-name">{service.name}</p>
              </div>
            ))
          ) : (
            <p className="no-services">No matching services found.</p>
          )}
        </div>
      </div>

      <section className="how-it-works">
        <div className="how-it-works-left">
          <img src="how-work.png" alt="How it Works" />
          <h2>How It Works</h2>
          <p>Simple steps to get the home services you need quickly and efficiently.</p>
        </div>
        <div className="how-it-works-right">
          <div className="how-it-works-step">
            <h3>Choose Your Service</h3>
            <p>Select from a variety of home services that fit your needs.</p>
          </div>
          <div className="how-it-works-step">
            <h3>Schedule a Visit</h3>
            <p>Pick a convenient time for our professionals to come to your home.</p>
          </div>
          <div className="how-it-works-step">
            <h3>Receive Service</h3>
            <p>Enjoy high-quality service from our skilled team at your home.</p>
          </div>
          <div className="how-it-works-step">
            <h3>Provide Feedback</h3>
            <p>Let us know how we did and help us improve our services.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

Services.propTypes = {
  onServiceSelect: PropTypes.func.isRequired
};
