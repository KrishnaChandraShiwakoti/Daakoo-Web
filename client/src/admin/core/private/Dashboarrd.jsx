import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/table.css";

const kpiData = [
  {
    icon: "📦",
    label: "Total Orders Today",
    value: "84",
    change: "↑ 12% from yesterday",
    accent: "var(--red)",
    bg: "var(--red-faint)",
    neg: false,
  },
  {
    icon: "💷",
    label: "Revenue Today",
    value: "£1,842",
    change: "↑ 8% from yesterday",
    accent: "var(--saffron)",
    bg: "var(--saffron-faint)",
    color: "var(--saffron)",
    neg: false,
  },
  {
    icon: "🔥",
    label: "Active Orders",
    value: "8",
    change: "↓ 2 since last check",
    accent: "var(--preparing)",
    bg: "rgba(59,130,246,0.1)",
    color: "var(--preparing)",
    neg: true,
  },
  {
    icon: "⭐",
    label: "Popular Dish",
    value: "Lamb Rogan Josh",
    change: "Ordered 23 times today",
    accent: "var(--completed)",
    bg: "rgba(16,185,129,0.1)",
    color: "var(--completed)",
    neg: false,
    isText: true,
  },
];

const chartData = [
  { day: "Mon", height: "65%", peak: false },
  { day: "Tue", height: "48%", peak: false },
  { day: "Wed", height: "80%", peak: false },
  { day: "Thu", height: "55%", peak: false },
  { day: "Fri", height: "92%", peak: true },
  { day: "Sat", height: "70%", peak: false },
  { day: "Sun", height: "85%", peak: false },
];

const statusData = [
  { name: "Pending", count: 12, width: "30%", color: "var(--pending)" },
  { name: "Preparing", count: 8, width: "20%", color: "var(--preparing)" },
  { name: "Ready", count: 3, width: "8%", color: "var(--ready)" },
  { name: "Completed", count: 61, width: "100%", color: "var(--completed)" },
];

const recentOrders = [
  {
    id: "#DK-0842",
    customer: "Priya Sharma",
    items: "Lamb Rogan Josh, Garlic Naan ×2",
    type: "Delivery",
    status: "Preparing",
    amount: "£32.50",
    time: "2 min ago",
  },
  {
    id: "#DK-0841",
    customer: "James Patel",
    items: "Chicken Tikka Masala, Rice",
    type: "Pickup",
    status: "Ready",
    amount: "£18.00",
    time: "8 min ago",
  },
  {
    id: "#DK-0840",
    customer: "Aisha Mohammed",
    items: "Dal Makhani, Paneer Tikka, Naan",
    type: "Delivery",
    status: "Pending",
    amount: "£41.00",
    time: "12 min ago",
  },
  {
    id: "#DK-0839",
    customer: "Tom Whitfield",
    items: "Butter Chicken, Pilau Rice",
    type: "Pickup",
    status: "Completed",
    amount: "£22.50",
    time: "28 min ago",
  },
  {
    id: "#DK-0838",
    customer: "Sophie Chen",
    items: "Prawn Biryani, Raita, Mango Lassi",
    type: "Delivery",
    status: "Completed",
    amount: "£28.75",
    time: "35 min ago",
  },
];

const Dashboarrd = () => {
  const navigate = useNavigate();

  return (
    <div className="page active" id="page-dashboard">
      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="kpi-card"
            style={{ "--accent": kpi.accent }}
          >
            <div className="kpi-icon" style={{ background: kpi.bg }}>
              {kpi.icon}
            </div>
            <div className="kpi-label">{kpi.label}</div>
            <div
              className="kpi-value"
              style={{
                color: kpi.color,
                fontSize: kpi.isText ? "15px" : "",
                letterSpacing: kpi.isText ? "-0.5px" : "",
              }}
            >
              {kpi.value}
            </div>
            <div className={`kpi-change ${kpi.neg ? "neg" : ""}`}>
              {kpi.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="dash-grid">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Revenue This Week</span>
            <div style={{ display: "flex", gap: "6px" }}>
              <div className="tag-filter active">Week</div>
              <div className="tag-filter">Month</div>
            </div>
          </div>
          <div className="chart-wrap">
            <div className="chart-bars">
              {chartData.map((data, index) => (
                <div key={index} className="bar-group">
                  <div
                    className={`bar ${data.peak ? "saffron" : ""}`}
                    style={{ height: data.height }}
                  ></div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              {chartData.map((data, index) => (
                <span key={index} className="bar-label">
                  {data.day}
                </span>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div
                  className="legend-dot"
                  style={{ background: "var(--red)" }}
                ></div>{" "}
                Revenue (£)
              </div>
              <div className="legend-item">
                <div
                  className="legend-dot"
                  style={{ background: "var(--saffron)" }}
                ></div>{" "}
                Peak Day
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Order Status</span>
          </div>
          <div className="status-list">
            {statusData.map((status, index) => (
              <div key={index} className="status-row">
                <div
                  className="status-dot"
                  style={{ background: status.color }}
                ></div>
                <span className="status-name">{status.name}</span>
                <div className="status-bar-wrap">
                  <div
                    className="status-bar-fill"
                    style={{ width: status.width, background: status.color }}
                  ></div>
                </div>
                <span className="status-count">{status.count}</span>
              </div>
            ))}
          </div>

          <div className="card-header" style={{ marginTop: "4px" }}>
            <span className="card-title">Quick Stats</span>
          </div>
          <div
            style={{
              padding: "0 22px 22px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: "var(--off-white)",
                borderRadius: "8px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  fontFamily: "'Poppins', sans-serif",
                  color: "var(--red)",
                }}
              >
                £21.9
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                Avg Order Value
              </div>
            </div>
            <div
              style={{
                background: "var(--off-white)",
                borderRadius: "8px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  fontFamily: "'Poppins', sans-serif",
                  color: "var(--saffron)",
                }}
              >
                18m
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                Avg Prep Time
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Recent Orders</span>
          <a
            className="card-action"
            onClick={() => navigate("/admin/orders")}
            style={{ cursor: "pointer" }}
          >
            View all orders →
          </a>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Type</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="order-id">{order.id}</span>
                  </td>
                  <td>{order.customer}</td>
                  <td
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "12px",
                    }}
                  >
                    {order.items}
                  </td>
                  <td>
                    <span
                      className={`type-tag ${
                        order.type === "Delivery"
                          ? "tag-delivery"
                          : "tag-pickup"
                      }`}
                    >
                      {order.type === "Delivery" ? "🛵 Delivery" : "🏠 Pickup"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge badge-${order.status.toLowerCase()}`}
                    >
                      ● {order.status}
                    </span>
                  </td>
                  <td>
                    <span className="amount">{order.amount}</span>
                  </td>
                  <td className="time-text">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboarrd;
