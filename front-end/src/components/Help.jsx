import React from 'react';
import './Help.css';

export const Help = () => {
  return (
    <div className="help-container">
      <h1>Need Help?</h1>
      <p>If you have questions, we’re here to help! Our customer support team is available to assist you with anything you need, from booking inquiries to technical support.</p>
      
      <h3>Contact Us:</h3>
      <ul>
        <li>📞 <strong>Call us:</strong> +91-99999-88888 (Available 24/7)</li>
        <li>📧 <strong>Email:</strong> support@havenhands.com (We'll respond within 24 hours)</li>
        <li>💬 <strong>Chat:</strong> Available 9 am – 6 pm (Instant assistance during business hours)</li>
      </ul>

      <h3>Frequently Asked Questions (FAQs):</h3>
      <ul>
        <li>🔹 <strong>How do I book a service?</strong> – Simply visit our booking page, select the service you require, and fill the details.</li>
        <li>🔹 <strong>What payment methods do you accept?</strong> – We accept cash on delivery for all services.</li>
        <li>🔹 <strong>Do you offer emergency services?</strong> – Yes, we offer emergency services depending on availability. Please contact us for urgent requests.</li>
      </ul>

      <h3>Customer Support Hours:</h3>
      <p>Our support team is available to assist you with any concerns during the following hours:</p>
      <ul>
        <li>📅 Monday to Friday: 9 am – 6 pm</li>
        <li>📅 Saturday: 10 am – 4 pm</li>
        <li>📅 Sunday: Closed</li>
      </ul>

      <p>We are dedicated to providing excellent support and ensuring a smooth experience with Haven Hands. If you need assistance, don’t hesitate to reach out!</p>
    </div>
  );
};
