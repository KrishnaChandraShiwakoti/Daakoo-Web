import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const PAGE_TITLES = {
  "/staff": "Live Orders",
  "/staff/ready": "Ready for Pickup",
  "/staff/history": "Order History",
  "/staff/inventory": "Inventory",
};

const StaffTopbar = () => {
  const location = useLocation();
  const pageTitle = useMemo(() => {
    if (location.pathname.startsWith("/staff/orders/")) return "Order Details";
    return PAGE_TITLES[location.pathname] || "Staff";
  }, [location.pathname]);

  const now = new Date();
  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="staff-topbar">
      <div>
        <h1>{pageTitle}</h1>
      </div>
      <div className="staff-topbar-time">
        <strong>{time}</strong>
        <span>{date}</span>
      </div>
    </header>
  );
};

export default StaffTopbar;
