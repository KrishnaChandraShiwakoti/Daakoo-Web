import React, { useEffect, useState } from "react";
import { useSettings } from "../../../hooks/useSettings";

const Settings = () => {
  const { settings, loading, error, fetchSettings, updateSettings } =
    useSettings();
  const [formData, setFormData] = useState({
    restaurantName: "",
    address: "",
    phone: "",
    email: "",
  });
  const [orderSettings, setOrderSettings] = useState({
    acceptDelivery: true,
    acceptPickup: true,
    onlineOrderingActive: true,
  });
  const [notifications, setNotifications] = useState({
    newOrderAlert: true,
    orderStatusEmail: true,
    dailySummaryReport: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (settings) {
      setFormData({
        restaurantName: settings.restaurantName || "",
        address: settings.address || "",
        phone: settings.phone || "",
        email: settings.email || "",
      });
      setOrderSettings(settings.orderSettings || {});
      setNotifications(settings.notifications || {});
    }
  }, [settings]);

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      await updateSettings({
        ...formData,
        orderSettings,
        notifications,
      });
      setSaving(false);
      alert("Settings saved successfully!");
    } catch (err) {
      setSaving(false);
      console.error("Error saving settings:", err);
    }
  };

  if (loading)
    return <div style={{ padding: "40px" }}>Loading settings...</div>;
  if (error)
    return (
      <div style={{ padding: "40px", color: "var(--red)" }}>Error: {error}</div>
    );

  return (
    <div className="page" id="page-settings">
      <div className="page-header">
        <div>
          <div className="page-title-lg">Settings</div>
          <div className="page-sub">Restaurant & system configuration</div>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSaveChanges}
          disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
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
                value={formData.restaurantName}
                onChange={(e) =>
                  setFormData({ ...formData, restaurantName: e.target.value })
                }
              />
            </div>
            <div className="form-group form-full">
              <label className="form-label">Address</label>
              <input
                className="form-input"
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                className="form-input"
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
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
                <input
                  type="checkbox"
                  checked={orderSettings.acceptDelivery}
                  onChange={(e) =>
                    setOrderSettings({
                      ...orderSettings,
                      acceptDelivery: e.target.checked,
                    })
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">Accept Pickup Orders</div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={orderSettings.acceptPickup}
                  onChange={(e) =>
                    setOrderSettings({
                      ...orderSettings,
                      acceptPickup: e.target.checked,
                    })
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">Online Ordering Active</div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={orderSettings.onlineOrderingActive}
                  onChange={(e) =>
                    setOrderSettings({
                      ...orderSettings,
                      onlineOrderingActive: e.target.checked,
                    })
                  }
                />
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
                <input
                  type="checkbox"
                  checked={notifications.newOrderAlert}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      newOrderAlert: e.target.checked,
                    })
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">Order Status Email</div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={notifications.orderStatusEmail}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      orderStatusEmail: e.target.checked,
                    })
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">Daily Summary Report</div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={notifications.dailySummaryReport}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      dailySummaryReport: e.target.checked,
                    })
                  }
                />
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
