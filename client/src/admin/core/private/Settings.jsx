import React from "react";

const Settings = () => {
  return (
    <div className="page" id="page-settings">
      <div className="page-header">
        <div>
          <div className="page-title-lg">Settings</div>
          <div className="page-sub">Restaurant & system configuration</div>
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}>
        <div className="card" style={{ padding: "24px" }}>
          <div className="card-title" style={{ marginBottom: "20px" }}>
            Restaurant Info
          </div>
          <div className="form-grid">
            <div className="form-group form-full">
              <label className="form-label">Restaurant Name</label>
              <input
                className="form-input"
                type="text"
                defaultValue="Daakoo Indian Cuisine"
              />
            </div>
            <div className="form-group form-full">
              <label className="form-label">Address</label>
              <input
                className="form-input"
                type="text"
                defaultValue="24 Commercial Street, London E1 6LP"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                className="form-input"
                type="text"
                defaultValue="+44 20 7123 4567"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                defaultValue="hello@daakoo.co.uk"
              />
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: "24px" }}>
          <div className="card-title" style={{ marginBottom: "20px" }}>
            Operating Hours
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">Monday – Friday</div>
                <div className="toggle-sub">11:30am – 10:30pm</div>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">Saturday</div>
                <div className="toggle-sub">12:00pm – 11:00pm</div>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">Sunday</div>
                <div className="toggle-sub">12:00pm – 10:00pm</div>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: "24px" }}>
          <div className="card-title" style={{ marginBottom: "20px" }}>
            Order Settings
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">Accept Delivery Orders</div>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">Accept Pickup Orders</div>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">Online Ordering Active</div>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: "24px" }}>
          <div className="card-title" style={{ marginBottom: "20px" }}>
            Notifications
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">New Order Alert</div>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">Order Status Email</div>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">Daily Summary Report</div>
              </div>
              <label className="toggle">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
