import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/navbar.css";

const navItems = [
  { label: "Menu", to: "/menu", key: "menu" },
  { label: "About", to: "/about", key: "about" },
  { label: "Locations", to: "/locations", key: "locations" },
  { label: "Contact", to: "/contact", key: "contact" },
];

const Navbar = () => {
  return (
    <nav>
      {/* logo */}
      <Link to="/">
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

      <div className="nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            className={({ isActive }) => `${isActive ? "active" : ""}`}>
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="nav-right">
        {/* cart */}
        <p>Cart</p>
        <div>
          Login / <span>Register</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
