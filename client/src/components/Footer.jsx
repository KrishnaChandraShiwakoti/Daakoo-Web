import { useState } from "react";
import "../styles/footer.css";

// SVG Icons
const MapPinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const ClockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"></path>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"></circle>
  </svg>
);

const TwitterIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z"></path>
  </svg>
);

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => setSubscribeStatus(""), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <div className="footer-logo">
            <span className="logo-text">Daakoo</span>
          </div>
          <p className="brand-description">
            Modern Indian cuisine for the heart of London. Sustainable,
            authentic, and spicy.
          </p>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              title="Facebook"
              aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a
              href="https://instagram.com"
              title="Instagram"
              aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://twitter.com" title="Twitter" aria-label="Twitter">
              <TwitterIcon />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="/menu">Our Menu</a>
            </li>
            <li>
              <a href="/order">Order Online</a>
            </li>
            <li>
              <a href="/catering">Catering</a>
            </li>
            <li>
              <a href="/gift-cards">Gift Cards</a>
            </li>
          </ul>
        </div>

        {/* Location & Hours Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Location & Hours</h3>
          <div className="location-info">
            <div className="info-item">
              <MapPinIcon />
              <div>
                <p>123 Brick Lane,</p>
                <p>London E1 6SB</p>
              </div>
            </div>
            <div className="hours-item">
              <ClockIcon />
              <div>
                <p>
                  Mon - Thu: <strong>12:00 - 22:00</strong>
                </p>
                <p>
                  Fri - Sat: <strong>12:00 - 23:30</strong>
                </p>
                <p>
                  Sun: <strong>13:00 - 22:00</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer-section footer-newsletter">
          <h3 className="footer-heading">Newsletter</h3>
          <p className="newsletter-description">
            Join for spice level updates and 10% off your first order.
          </p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="subscribe-btn">
              SUBSCRIBE
            </button>
          </form>
          {subscribeStatus === "success" && (
            <p className="success-message">✓ Subscribed successfully!</p>
          )}
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p className="copyright">
          &copy; 2024 Daakoo London. All rights reserved.
        </p>
        <div className="footer-links-bottom">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
