import React from "react";
import "../../styles/order.css";
import "../../styles/table.css";
import "../../styles/filter.css";

const mockOrders = [
  {
    id: "#DK-0842",
    customer: "Priya Sharma",
    items: "Lamb Rogan Josh, Garlic Naan ×2",
    type: "Delivery",
    status: "Preparing",
    amount: "£32.50",
  },
  {
    id: "#DK-0841",
    customer: "James Patel",
    items: "Chicken Tikka Masala, Rice",
    type: "Pickup",
    status: "Ready",
    amount: "£18.00",
  },
  {
    id: "#DK-0840",
    customer: "Aisha Mohammed",
    items: "Dal Makhani, Paneer Tikka, Naan",
    type: "Delivery",
    status: "Pending",
    amount: "£41.00",
  },
  {
    id: "#DK-0839",
    customer: "Tom Whitfield",
    items: "Butter Chicken, Pilau Rice",
    type: "Pickup",
    status: "Completed",
    amount: "£22.50",
  },
  {
    id: "#DK-0838",
    customer: "Sophie Chen",
    items: "Prawn Biryani, Raita, Mango Lassi",
    type: "Delivery",
    status: "Completed",
    amount: "£28.75",
  },
];

const Orders = () => {
  return (
    <div className="page" id="page-orders">
      <div className="page-header">
        <div>
          <div className="page-title-lg">Orders Management</div>
          <div className="page-sub">84 orders today · 8 active</div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-search">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input type="text" placeholder="Search by order ID or customer…" />
        </div>
        <select className="filter-select" defaultValue="All Statuses">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Preparing</option>
          <option>Ready</option>
          <option>Completed</option>
        </select>
        <select className="filter-select" defaultValue="All Types">
          <option>All Types</option>
          <option>Delivery</option>
          <option>Pickup</option>
        </select>
        <select className="filter-select" defaultValue="Today">
          <option>Today</option>
          <option>Yesterday</option>
          <option>Last 7 Days</option>
        </select>
      </div>

      <div className="orders-layout">
        <div className="card">
          <div className="table-wrap" style={{ paddingTop: "22px" }}>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="ordersTableBody">
                {mockOrders.map((order) => (
                  <tr key={order.id} style={{ cursor: "pointer" }}>
                    <td>
                      <span className="order-id">{order.id}</span>
                    </td>
                    <td>{order.customer}</td>
                    <td
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "12px",
                      }}>
                      {order.items}
                    </td>
                    <td>
                      <span
                        className={`type-tag ${
                          order.type === "Delivery"
                            ? "tag-delivery" /* Assuming this maps to Delivery styling */
                            : "tag-pickup"
                        }`}>
                        {order.type === "Delivery" ? "🛵 Delivery" : "🏠 Pickup"}
                      </span>
                    </td>
                    <td>
                      <select
                        className="filter-select"
                        style={{ padding: "4px 8px", fontSize: "12px" }}
                        onClick={(e) => e.stopPropagation()}
                        defaultValue={order.status}>
                        <option>Pending</option>
                        <option>Preparing</option>
                        <option>Ready</option>
                        <option>Completed</option>
                      </select>
                    </td>
                    <td>
                      <span className="amount">{order.amount}</span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
