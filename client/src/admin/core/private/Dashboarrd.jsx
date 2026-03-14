import React from "react";

const Dashboarrd = () => {
  return (
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
            <div className="bar-group">
              <div className="bar" style={{ height: "65%" }}></div>
            </div>
            <div className="bar-group">
              <div className="bar" style={{ height: "48%" }}></div>
            </div>
            <div className="bar-group">
              <div className="bar" style={{ height: "80%" }}></div>
            </div>
            <div className="bar-group">
              <div className="bar" style={{ height: "55%" }}></div>
            </div>
            <div className="bar-group">
              <div className="bar saffron" style={{ height: "92%" }}></div>
            </div>
            <div className="bar-group">
              <div className="bar" style={{ height: "70%" }}></div>
            </div>
            <div className="bar-group">
              <div className="bar" style={{ height: "85%" }}></div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
            }}>
            <span className="bar-label">Mon</span>
            <span className="bar-label">Tue</span>
            <span className="bar-label">Wed</span>
            <span className="bar-label">Thu</span>
            <span className="bar-label">Fri</span>
            <span className="bar-label">Sat</span>
            <span className="bar-label">Sun</span>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div
                className="legend-dot"
                style={{ background: "var(--red)" }}></div>{" "}
              Revenue (£)
            </div>
            <div className="legend-item">
              <div
                className="legend-dot"
                style={{ background: "var(--saffron)" }}></div>{" "}
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
          <div className="status-row">
            <div
              className="status-dot"
              style={{ background: "var(--pending)" }}></div>
            <span className="status-name">Pending</span>
            <div className="status-bar-wrap">
              <div
                className="status-bar-fill"
                style={{ width: "30%", background: "var(--pending)" }}></div>
            </div>
            <span className="status-count">12</span>
          </div>
          <div className="status-row">
            <div
              className="status-dot"
              style={{ background: "var(--preparing)" }}></div>
            <span className="status-name">Preparing</span>
            <div className="status-bar-wrap">
              <div
                className="status-bar-fill"
                style={{ width: "20%", background: "var(--preparing)" }}></div>
            </div>
            <span className="status-count">8</span>
          </div>
          <div className="status-row">
            <div
              className="status-dot"
              style={{ background: "var(--ready)" }}></div>
            <span className="status-name">Ready</span>
            <div className="status-bar-wrap">
              <div
                className="status-bar-fill"
                style={{ width: "8%", background: "var(--ready)" }}></div>
            </div>
            <span className="status-count">3</span>
          </div>
          <div className="status-row">
            <div
              className="status-dot"
              style={{ background: "var(--completed)" }}></div>
            <span className="status-name">Completed</span>
            <div className="status-bar-wrap">
              <div
                className="status-bar-fill"
                style={{ width: "100%", background: "var(--completed)" }}></div>
            </div>
            <span className="status-count">61</span>
          </div>
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
                fontWeight: 700,
                fontFamily: "'Poppins',sans-serif",
                color: "var(--red)",
              }}>
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
            }}>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                fontFamily: "'Poppins',sans-serif",
                color: "var(--saffron)",
              }}>
              18m
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
              Avg Prep Time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboarrd;
