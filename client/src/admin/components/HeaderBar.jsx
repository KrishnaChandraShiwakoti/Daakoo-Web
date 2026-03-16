import React from "react";
import "../styles/headerbar.css";
import { useLocation } from "react-router-dom";

const HeaderBar = () => {
  const location = useLocation();

  // Extract the page name from the URL path
  const getPageName = () => {
    const pathname = location.pathname;

    const segments = pathname.split("/").filter(Boolean);
    // Get the last segment (e.g., 'dashboard', 'orders', 'menu', 'management')
    const currentPage = segments[segments.length - 1];

    // Capitalize first letter
    return currentPage == "admin"
      ? "Dashboard"
      : currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
  };

  const pageName = getPageName();

  return (
    <div className="main">
      <div className="admin-header">
        <h1 className="header-title">
          {pageName}
          <span> Overview</span>
        </h1>
      </div>
    </div>
  );
};

export default HeaderBar;
