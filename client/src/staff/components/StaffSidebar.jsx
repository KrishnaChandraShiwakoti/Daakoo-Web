import { NavLink } from "react-router-dom";

const NavItem = ({ to, end = false, label, icon, badge }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive ? "staff-nav-item active" : "staff-nav-item"
      }>
      <span className="staff-nav-icon" aria-hidden="true">
        {icon}
      </span>
      <span>{label}</span>
      {typeof badge === "number" ? (
        <span className="staff-nav-badge">{badge}</span>
      ) : null}
    </NavLink>
  );
};

const StaffSidebar = ({ activeLiveCount = 0 }) => {
  return (
    <aside className="staff-sidebar">
      <div className="staff-brand">
        <div className="staff-brand-mark">11</div>
        <div>
          <p className="staff-brand-name">DAAKOO</p>
          <p className="staff-brand-sub">Kitchen Staff</p>
        </div>
      </div>

      <div className="staff-nav-group">
        <NavItem
          to="/staff"
          end
          label="Live Orders"
          badge={activeLiveCount}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="14" rx="2" />
              <path d="M8 8h8" />
              <path d="M8 12h6" />
            </svg>
          }
        />
        <NavItem
          to="/staff/history"
          label="Order History"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 12a9 9 0 109-9" />
              <path d="M3 3v6h6" />
              <path d="M12 7v5l3 2" />
            </svg>
          }
        />
        <NavItem
          to="/staff/ready"
          label="Ready for Pickup"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="9" />
              <path d="m8 12 3 3 5-6" />
            </svg>
          }
        />
        <NavItem
          to="/staff/inventory"
          label="Inventory"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="4" y="6" width="16" height="12" rx="2" />
              <path d="M9 10h6" />
            </svg>
          }
        />
      </div>

      <button type="button" className="staff-logout-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Logout
      </button>
    </aside>
  );
};

export default StaffSidebar;
