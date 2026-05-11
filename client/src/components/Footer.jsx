// import { useState } from "react";
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

export const Footer = () => {
  // const [email, setEmail] = useState("");
  // const [subscribeStatus, setSubscribeStatus] = useState("");

  // const handleSubscribe = (e) => {
  //   e.preventDefault();
  //   if (email) {
  //     setSubscribeStatus("success");
  //     setEmail("");
  //     setTimeout(() => setSubscribeStatus(""), 3000);
  //   }
  // };

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
        {/* <div className="footer-section footer-newsletter">
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
        </div> */}
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p className="copyright">
          &copy; 2024 Daakoo London. All rights reserved.
        </p>
        <div className="footer-links-bottom">
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
