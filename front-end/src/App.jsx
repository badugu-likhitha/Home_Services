import React, { useState } from 'react';
import { Home } from './components/Home';
import { Services } from './components/Services';
import HouseCleaning from './components/HouseCleaning';
import LawnCare from './components/LawnCare';
import Handyman from './components/Handyman';
import MovingHelp from './components/MovingHelp';
import TVMounting from './components/TVMounting';
import FurnitureAssembly from './components/FurnitureAssembly';
import { BookingForm } from './components/BookingForm';
import { Profile } from './components/Profile';
import { Contact } from './components/Contact';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Navigation } from './components/Navigation';
import './App.css';
import { AnimatePresence, motion } from 'framer-motion';

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -30,
  },
};

const pageTransition = {
  duration: 0.35,
  ease: 'easeInOut',
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [userMobile, setUserMobile] = useState(null);

  const handleLoginSuccess = (mobileNumber) => {
    setIsLoggedIn(true);
    setUserMobile(mobileNumber);
    setCurrentPage('services');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserMobile(null);
    setCurrentPage('home');
  };

  const handleBookingConfirm = (bookingData) => {
    setBookings((prev) => [...prev, bookingData]);
    setCurrentPage('profile'); // Redirect after confirming booking
  };

  const handleBooking = () => setCurrentPage('booking');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'services':
        return (
          <Services
            onServiceSelect={(service) => {
              setSelectedService(service);
              setCurrentPage('service-detail');
            }}
          />
        );
      case 'service-detail':
        switch (selectedService?.name) {
          case 'House Cleaning':
            return (
              <HouseCleaning
                onBook={handleBooking}
                service={selectedService}
                userLoggedIn={isLoggedIn}
              />
            );
          case 'Lawn Care':
            return (
              <LawnCare
                onBook={handleBooking}
                service={selectedService}
                userLoggedIn={isLoggedIn}
              />
            );
          case 'Handyman':
            return (
              <Handyman
                onBook={handleBooking}
                service={selectedService}
                userLoggedIn={isLoggedIn}
              />
            );
          case 'Moving Help':
            return (
              <MovingHelp
                onBook={handleBooking}
                service={selectedService}
                userLoggedIn={isLoggedIn}
              />
            );
          case 'TV Mounting':
            return (
              <TVMounting
                onBook={handleBooking}
                service={selectedService}
                userLoggedIn={isLoggedIn}
              />
            );
          case 'Furniture Assembly':
            return (
              <FurnitureAssembly
                onBook={handleBooking}
                service={selectedService}
                userLoggedIn={isLoggedIn}
              />
            );
          default:
            return <Home onNavigate={setCurrentPage} />;
        }
      case 'booking':
        return <BookingForm service={selectedService} onConfirm={handleBookingConfirm} />;
      case 'login':
        return isLoggedIn ? (
          <Services onServiceSelect={(service) => setSelectedService(service)} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        );
      case 'signup':
        return <Signup onSignupSuccess={handleLoginSuccess} />;
      case 'profile':
        return (
          <Profile bookings={bookings} isLoggedIn={isLoggedIn} userMobile={userMobile} />
        );
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Page Transition */}
      <div className="transition-container" style={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
