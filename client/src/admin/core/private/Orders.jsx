import React, { useEffect, useState } from "react";
import "../../styles/order.css";
import "../../styles/table.css";
import "../../styles/filter.css";
import { useOrders } from "../../../hooks/useOrders";

const Orders = () => {
  const {
    orders,
    loading,
    error,
    fetchOrders,
    updateOrderStatus,
    searchOrders,
    getActiveOrdersCount,
  } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    page: 1,
    limit: 10,
  });
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    fetchOrders(filters);
    getActiveOrdersCount().then((count) => {
      setActiveCount(count);
    });
  }, [filters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchOrders(query);
    } else {
      fetchOrders(filters);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value, page: 1 };
    setFilters(newFilters);
  };

  return (
    <div className="page" id="page-orders">
      <div className="page-header">
        <div>
          <div className="page-title-lg">Orders Management</div>
          <div className="page-sub">
            {orders.length} orders · {activeCount} active
          </div>
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
          <input
            type="text"
            placeholder="Search by order ID or customer…"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}>
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          className="filter-select"
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}>
          <option value="">All Types</option>
          <option value="delivery">Delivery</option>
          <option value="pickup">Pickup</option>
        </select>
      </div>

      <div className="orders-layout">
        <div className="card">
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center" }}>
              Loading orders...
            </div>
          ) : error ? (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "var(--red)",
              }}>
              Error: {error}
            </div>
          ) : (
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
                  {orders.map((order) => (
                    <tr key={order._id} style={{ cursor: "pointer" }}>
                      <td>
                        <span className="order-id">
                          {order._id?.slice(-6).toUpperCase()}
                        </span>
                      </td>
                      <td>
                        {order.userId?.fName} {order.userId?.lName}
                      </td>
                      <td
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "12px",
                        }}>
                        {order.items?.map((i) => i.name).join(", ")}
                      </td>
                      <td>
                        <span
                          className={`type-tag ${
                            order.type === "delivery"
                              ? "tag-delivery"
                              : "tag-pickup"
                          }`}>
                          {order.type === "delivery"
                            ? "🛵 Delivery"
                            : "🏠 Pickup"}
                        </span>
                      </td>
                      <td>
                        <select
                          className="filter-select"
                          style={{ padding: "4px 8px", fontSize: "12px" }}
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <span className="amount">£{order.totalAmount}</span>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-sm">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
