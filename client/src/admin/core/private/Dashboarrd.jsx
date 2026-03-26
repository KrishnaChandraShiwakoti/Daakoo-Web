import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/table.css";
import { useDashboard } from "../../../hooks/useDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    kpi,
    revenueData,
    popularDishes,
    orderStatus,
    monthlyStats,
    loading,
    error,
    fetchAllDashboardData,
  } = useDashboard();

  useEffect(() => {
    fetchAllDashboardData();
  }, []);

  const getKPIData = () => {
    if (!kpi) return [];
    return [
      {
        icon: "📦",
        label: "Total Orders Today",
        value: kpi.totalOrders,
        change: `${kpi.totalOrders} orders`,
        accent: "var(--red)",
        bg: "var(--red-faint)",
        neg: false,
      },
      {
        icon: "💷",
        label: "Revenue Today",
        value: `£${kpi.totalRevenue}`,
        change: `£${kpi.totalRevenue} earned`,
        accent: "var(--saffron)",
        bg: "var(--saffron-faint)",
        neg: false,
      },
      {
        icon: "🔥",
        label: "Active Orders",
        value: kpi.activeOrders,
        change: `${kpi.activeOrders} being prepared`,
        accent: "var(--preparing)",
        bg: "rgba(59,130,246,0.1)",
        neg: false,
      },
      {
        icon: "👥",
        label: "Unique Customers",
        value: kpi.uniqueCustomers,
        change: `${kpi.uniqueCustomers} today`,
        accent: "var(--completed)",
        bg: "rgba(16,185,129,0.1)",
        neg: false,
      },
    ];
  };

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Loading dashboard...
      </div>
    );
  if (error)
    return (
      <div
        style={{ padding: "40px", textAlign: "center", color: "var(--red)" }}>
        Error: {error}
      </div>
    );

  return (
    <div className="page active" id="page-dashboard">
      {/* KPI Cards */}
      <div className="kpi-grid">
        {getKPIData().map((kpiItem, index) => (
          <div
            key={index}
            className="kpi-card"
            style={{ "--accent": kpiItem.accent }}>
            <div className="kpi-icon" style={{ background: kpiItem.bg }}>
              {kpiItem.icon}
            </div>
            <div className="kpi-label">{kpiItem.label}</div>
            <div className="kpi-value">{kpiItem.value}</div>
            <div className={`kpi-change ${kpiItem.neg ? "neg" : ""}`}>
              {kpiItem.change}
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
            </div>
          </div>
          <div className="chart-wrap">
            <div className="chart-bars">
              {revenueData.map((data, index) => (
                <div key={index} className="bar-group">
                  <div
                    className="bar"
                    style={{
                      height: `${(data.revenue / Math.max(...revenueData.map((d) => d.revenue), 1)) * 100}%`,
                      minHeight: "20px",
                    }}></div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}>
              {revenueData.map((data, index) => (
                <span key={index} className="bar-label">
                  {data.day}
                </span>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div
                  className="legend-dot"
                  style={{ background: "var(--red)" }}></div>{" "}
                Revenue (£)
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Order Status</span>
          </div>
          <div className="status-list">
            {orderStatus &&
              Object.entries(orderStatus).map(([status, count]) => {
                const colors = {
                  pending: "var(--pending)",
                  confirmed: "#3B82F6",
                  preparing: "var(--preparing)",
                  ready: "var(--ready)",
                  delivered: "var(--completed)",
                  cancelled: "#EF4444",
                };
                const total = Object.values(orderStatus).reduce(
                  (a, b) => a + b,
                  0,
                );
                const width = total > 0 ? (count / total) * 100 : 0;

                return (
                  <div key={status} className="status-row">
                    <div
                      className="status-dot"
                      style={{ background: colors[status] }}></div>
                    <span
                      className="status-name"
                      style={{ textTransform: "capitalize" }}>
                      {status}
                    </span>
                    <div className="status-bar-wrap">
                      <div
                        className="status-bar-fill"
                        style={{
                          width: `${width}%`,
                          background: colors[status],
                        }}></div>
                    </div>
                    <span className="status-count">{count}</span>
                  </div>
                );
              })}
          </div>

          {monthlyStats && (
            <>
              <div className="card-header" style={{ marginTop: "4px" }}>
                <span className="card-title">Quick Stats</span>
              </div>
              <div
                style={{
                  padding: "0 22px 22px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}>
                <div
                  style={{
                    background: "var(--off-white)",
                    borderRadius: "8px",
                    padding: "12px",
                    textAlign: "center",
                  }}>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      fontFamily: "'Poppins', sans-serif",
                      color: "var(--red)",
                    }}>
                    £{monthlyStats.avgOrderValue}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--text-secondary)",
                    }}>
                    Avg Order Value
                  </div>
                </div>
                <div
                  style={{
                    background: "var(--off-white)",
                    borderRadius: "8px",
                    padding: "12px",
                    textAlign: "center",
                  }}>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      fontFamily: "'Poppins', sans-serif",
                      color: "var(--saffron)",
                    }}>
                    {monthlyStats.totalOrders}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--text-secondary)",
                    }}>
                    Orders This Month
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Popular Dishes */}
      {popularDishes.length > 0 && (
        <div className="card" style={{ marginTop: "20px" }}>
          <div className="card-header">
            <span className="card-title">Top Dishes</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Dish</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {popularDishes.slice(0, 5).map((dish, index) => (
                  <tr key={dish.id}>
                    <td>{dish.name}</td>
                    <td style={{ textAlign: "center", fontWeight: "600" }}>
                      {dish.count}
                    </td>
                    <td style={{ color: "var(--saffron)", fontWeight: "600" }}>
                      £{dish.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
