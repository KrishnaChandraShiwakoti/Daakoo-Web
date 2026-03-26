import React, { useEffect } from "react";
import "../../styles/dashboard.css";
import "../../styles/table.css";
import { useDashboard } from "../../../hooks/useDashboard";

const Analytics = () => {
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

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Loading analytics...
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
    <div className="page" id="page-analytics">
      <div className="page-header">
        <div>
          <div className="page-title-lg">Analytics</div>
          <div className="page-sub">Detailed performance metrics</div>
        </div>
      </div>

      {monthlyStats && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            marginBottom: "20px",
          }}>
          <div className="card" style={{ padding: "20px" }}>
            <div
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                marginBottom: "8px",
              }}>
              Month
            </div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              {monthlyStats.month}
            </div>
          </div>
          <div className="card" style={{ padding: "20px" }}>
            <div
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                marginBottom: "8px",
              }}>
              Total Orders
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "var(--red)",
              }}>
              {monthlyStats.totalOrders}
            </div>
          </div>
          <div className="card" style={{ padding: "20px" }}>
            <div
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                marginBottom: "8px",
              }}>
              Total Revenue
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "var(--saffron)",
              }}>
              £{monthlyStats.totalRevenue}
            </div>
          </div>
          <div className="card" style={{ padding: "20px" }}>
            <div
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                marginBottom: "8px",
              }}>
              Avg Order Value
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "var(--prepared)",
              }}>
              £{monthlyStats.avgOrderValue}
            </div>
          </div>
        </div>
      )}

      {revenueData.length > 0 && (
        <div className="card" style={{ marginBottom: "20px" }}>
          <div className="card-header">
            <span className="card-title">Revenue Trend (Weekly)</span>
          </div>
          <div className="chart-wrap">
            <div className="chart-bars">
              {revenueData.map((data, index) => (
                <div key={index} className="bar-group">
                  <div
                    className="bar"
                    style={{
                      height: `${(data.revenue / Math.max(...revenueData.map((d) => d.revenue))) * 100}%`,
                      minHeight: "20px",
                    }}></div>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "8px",
                      fontSize: "10px",
                      color: "var(--text-secondary)",
                    }}>
                    £{data.revenue}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "12px",
              }}>
              {revenueData.map((data, index) => (
                <span key={index} className="bar-label">
                  {data.day}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {popularDishes.length > 0 && (
        <div className="card" style={{ marginBottom: "20px" }}>
          <div className="card-header">
            <span className="card-title">Popular Dishes</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Dish Name</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {popularDishes.map((dish, index) => (
                  <tr key={dish.id}>
                    <td style={{ fontWeight: "600" }}>#{index + 1}</td>
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

      {orderStatus && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Order Status Distribution</span>
          </div>
          <div className="status-list">
            {Object.entries(orderStatus).map(([status, count]) => {
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
              const width = (count / total) * 100;

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
        </div>
      )}
    </div>
  );
};

export default Analytics;
