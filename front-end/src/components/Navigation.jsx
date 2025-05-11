import React from 'react';
import PropTypes from 'prop-types';
import './Navigation.css';


export const Navigation = ({ currentPage, onNavigate, isLoggedIn, onLogout }) => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-items">
            <NavItem 
              label="HOME"
              isActive={currentPage === 'home'}
              onClick={() => onNavigate('home')}
            />
            <NavItem 
              label="SERVICES"
              isActive={currentPage === 'services'}
              onClick={() => onNavigate('services')}
            />
            <NavItem 
              label="CONTACT"
              isActive={currentPage === 'contact'}
              onClick={() => onNavigate('contact')}
            />
            <NavItem 
              label="PROFILE"
              isActive={currentPage === 'profile'}
              onClick={() => onNavigate('profile')}
            />
            {!isLoggedIn ? (
              <>
                <NavItem 
                  label="LOGIN"
                  isActive={currentPage === 'login'}
                  onClick={() => onNavigate('login')}
                />
                <NavItem 
                  label="SIGNUP"
                  isActive={currentPage === 'signup'}
                  onClick={() => onNavigate('signup')}
                />
              </>
            ) : (
              <NavItem 
                label="LOGOUT"
                isActive={false}
                onClick={onLogout}
              />
            )}
          </div>
          <div className="nav-logo">
            <img 
              src="mainlogo.png" 
              alt="Haven Hands" 
              className="logo"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ label, isActive, onClick }) => (
  <button
    className={`nav-item ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    <span>{label}</span>
  </button>
);

Navigation.propTypes = {
  currentPage: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
