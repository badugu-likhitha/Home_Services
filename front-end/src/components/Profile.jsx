import React, { useState, useEffect } from 'react';
import './Profile.css';
import { About } from './About';
import { Help } from './Help';

export const Profile = ({ isLoggedIn, userMobile }) => {
  const [fetchedBookings, setFetchedBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('profile'); // tabs: profile, orders, about, help
  const [userInfo, setUserInfo] = useState({ username: '', mobileNumber: '' });
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  // Fetch user profile details when the component loads
  useEffect(() => {
    if (isLoggedIn && userMobile) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/login/${userMobile}`); // Updated endpoint
          if (response.ok) {
            const data = await response.json();
            console.log('User Info:', data);
            setUserInfo(data);
          } else {
            console.error('Error fetching user info:', response.status);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        } finally {
          setLoadingUserInfo(false);
        }
      };

      fetchUserInfo();
    }
  }, [isLoggedIn, userMobile]);

  // Fetch bookings when the user is logged in and the active tab is "orders"
  useEffect(() => {
    if (isLoggedIn && activeTab === 'orders') {
      const fetchBookings = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/bookings/user/${userMobile}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched bookings:', data);
            setFetchedBookings(data);
          } else {
            console.error('Error fetching bookings:', response.status);
          }
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };

      fetchBookings();
    }
  }, [isLoggedIn, userMobile, activeTab]);

  // Cancel booking with confirmation
  const cancelBooking = async (bookingId) => {
    const confirmCancellation = window.confirm(
      'Are you sure you want to cancel this booking? This action cannot be undone.'
    );

    if (!confirmCancellation) {
      console.log('Cancellation aborted by the user.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFetchedBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.bookingId !== bookingId)
        );
        console.log('Booking canceled successfully:', bookingId);
      } else {
        console.error('Error canceling booking:', response.status);
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  if (!isLoggedIn) {
    return <div>Please login to see your profile.</div>;
  }

  return (
    <div className="profile-page">
      <div className="sidebar">
        <ul className="nav-links">
          <li
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            My Profile
          </li>
          <li
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            My Orders
          </li>
          <li
            className={activeTab === 'about' ? 'active' : ''}
            onClick={() => setActiveTab('about')}
          >
            About Us
          </li>
          <li
            className={activeTab === 'help' ? 'active' : ''}
            onClick={() => setActiveTab('help')}
          >
            Help
          </li>
        </ul>
      </div>

      <div className="content">
        {activeTab === 'profile' ? (
          <div className="profile-info">
            <h1>Profile</h1>
            <div className="user-icon">
              <span role="img" aria-label="user">👤</span>
            </div>
            {loadingUserInfo ? (
              <p>Loading user details...</p>
            ) : (
              <>
                <h3>{userInfo.username || 'No username available'}</h3>
                <p>{userInfo.mobileNumber || 'No mobile number available'}</p>
              </>
            )}
          </div>
        ) : activeTab === 'orders' ? (
          <div>
            <h1 className="profile-title">My Orders</h1>
            {fetchedBookings.length === 0 ? (
              <p>No orders found. Please make a booking.</p>
            ) : (
              <div className="booking-cards">
                {fetchedBookings.map((booking, index) => (
                  <div key={index} className="booking-card">
                    <div className="user-header">
                      <div className="user-info">
                        <h3>{booking.fullname}</h3>
                        <p>{booking.serviceName}</p>
                      </div>
                    </div>
                    <button
                      className="cancel-btn"
                      onClick={() => cancelBooking(booking.bookingId)}
                    >
                      Cancel Booking
                    </button>
                    <div className="section">
                      <h4>Booking Details</h4>
                      <div className="detail">
                        <span>📍</span>
                        {booking.address}
                      </div>
                      <div className="detail">
                        <span>📅</span>
                        {booking.dateOfService}
                      </div>
                      <div className="detail">
                        <span>⏰</span>
                        {booking.timeOfService}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'about' ? (
          <About />
        ) : (
          <Help />
        )}
      </div>
    </div>
  );
};
