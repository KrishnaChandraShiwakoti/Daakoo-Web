import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import CartModal from "./CartModal";

const navItems = [
  { label: "Menu", to: "/menu", key: "menu" },
  { label: "About", to: "/about", key: "about" },
  { label: "Contact", to: "/contact", key: "contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  let user = null;
  try {
    const storedUser = localStorage.getItem("daakooUser");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const isLoggedIn = Boolean(localStorage.getItem("daakooToken") && user);
  const userLabel = user?.fName ||  "User";
  const userInitial = userLabel.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("daakooToken");
    localStorage.removeItem("daakooUser");
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate("/", { replace: true });
  };

  const handleGoToProfile = () => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate("/profile");
  };

  return (
    <nav>
      {/* logo */}
      <Link to="/" onClick={closeMenu}>
        <svg
          height={42}
          viewBox="0 0 240 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: "pointer", display: "block" }}>
          <rect width="240" height="56" fill="#0A0A0A" />
          {/* Main wordmark in Devanagari-inspired bold italic style */}
          <text
            x="8"
            y="37"
            fontFamily="'Georgia', 'Times New Roman', serif"
            fontSize="33"
            fontWeight="bold"
            fill="white"
            fontStyle="italic"
            letterSpacing="-0.5">
            daakoo
          </text>
          {/* Subtitle */}
          <text
            x="8"
            y="50"
            fontFamily="'Arial', sans-serif"
            fontSize="8"
            fill="#AAAAAA"
            letterSpacing="3">
            GOURMET INDIAN FOOD
          </text>
          {/* Saffron underline */}
          <rect
            x="8"
            y="53.5"
            width="200"
            height="2.5"
            rx="1.25"
            fill="url(#lg)"
          />
          <defs>
            <linearGradient
              id="lg"
              x1="0"
              y1="0"
              x2="200"
              y2="0"
              gradientUnits="userSpaceOnUse">
              <stop stopColor="#E8A020" />
              <stop offset="0.65" stopColor="#F4B84A" />
              <stop offset="1" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </Link>

      <button
        className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links ${isMenuOpen ? "show" : ""}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            onClick={closeMenu}
            className={({ isActive }) => `${isActive ? "active" : ""}`}>
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className={`nav-right ${isMenuOpen ? "show" : ""}`}>
        <button
          type="button"
          className="cart-btn"
          onClick={() => {
            closeMenu();
            setIsCartOpen(true);
          }}>
          Cart
        </button>

        {isLoggedIn ? (
          <div className="profile-menu-wrap">
            <button
              type="button"
              className={`profile-trigger ${isProfileOpen ? "open" : ""}`}
              aria-label="Open user profile menu"
              aria-expanded={isProfileOpen}
              onClick={() => setIsProfileOpen((prev) => !prev)}>
              <span className="profile-avatar">{userInitial}</span>
              <span className="profile-name">{userLabel}</span>
            </button>

            <div className={`profile-dropdown ${isProfileOpen ? "show" : ""}`}>
              <p className="profile-dropdown-name">{userLabel}</p>
              <p className="profile-dropdown-email">{user?.email}</p>
              <button
                type="button"
                className="profile-btn"
                onClick={handleGoToProfile}>
                My Profile
              </button>
              <button type="button" className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
            <span>/</span>
            <Link to="/register" onClick={closeMenu}>
              Register
            </Link>
          </div>
        )}
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
