import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStaffOrders } from "../../hooks/useStaffOrders";
import {
  ORDER_TYPE_LABELS,
  STATUS_LABELS,
  formatCurrency,
  formatDateTime,
  getCustomerName,
  getOrderCode,
  getStatusClassName,
} from "../../utils/orderHelpers";

const OrderHistory = () => {
  const { orders, loading, error, fetchOrders } = useStaffOrders();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortMode, setSortMode] = useState("newest");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSortMode(value);
    setPage(1);
  };

  useEffect(() => {
    fetchOrders({ limit: 200 }).catch(() => {});
  }, [fetchOrders]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    let next = [...orders];

    if (statusFilter !== "all") {
      next = next.filter((order) => order.status === statusFilter);
    }

    if (query) {
      next = next.filter((order) => {
        const code = getOrderCode(order._id).toLowerCase();
        const customer = getCustomerName(order).toLowerCase();
        return code.includes(query) || customer.includes(query);
      });
    }

    next.sort((a, b) => {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      return sortMode === "oldest" ? aDate - bDate : bDate - aDate;
    });

    return next;
  }, [orders, search, statusFilter, sortMode]);

  const totalPages = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const currentPage = Math.min(page, totalPages);

  const pagedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [currentPage, filtered]);

  const handleExport = () => {
    const headers = ["Order", "Customer", "Status", "Type", "Amount", "Date"];
    const rows = filtered.map((order) => [
      getOrderCode(order._id),
      getCustomerName(order),
      STATUS_LABELS[order.status] || order.status,
      ORDER_TYPE_LABELS[order.type] || order.type,
      String(order.totalAmount || 0),
      formatDateTime(order.createdAt),
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `staff-order-history-${Date.now()}.csv`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <section>
      <div className="staff-page-header">
        <h2>Order History</h2>
        <span className="staff-pill">{filtered.length} total</span>
      </div>

      <div className="staff-filter-row">
        <input
          type="text"
          className="staff-search"
          value={search}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Search by order ID or customer..."
        />

        <select
          className="staff-select"
          value={statusFilter}
          onChange={(event) => handleStatusChange(event.target.value)}>
          <option value="all">All status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="delivered">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          className="staff-select"
          value={sortMode}
          onChange={(event) => handleSortChange(event.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        <button
          type="button"
          className="staff-export-btn"
          onClick={handleExport}>
          Export
        </button>
      </div>

      {error ? <p className="staff-error-banner">{error}</p> : null}

      <div className="staff-table-wrap">
        <table className="staff-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Date &amp; Time</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && !pagedOrders.length ? (
              <tr>
                <td colSpan="6" className="staff-table-empty">
                  No orders match this filter.
                </td>
              </tr>
            ) : null}

            {pagedOrders.map((order) => (
              <tr key={order._id}>
                <td>
                  <span className="staff-id">{getOrderCode(order._id)}</span>
                </td>
                <td>{getCustomerName(order)}</td>
                <td>
                  <span
                    className={`staff-status-pill ${getStatusClassName(order.status)}`}>
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                </td>
                <td>{formatDateTime(order.createdAt)}</td>
                <td>{formatCurrency(order.totalAmount)}</td>
                <td>
                  <Link
                    className="staff-inline-link"
                    to={`/staff/orders/${order._id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="staff-pagination-row">
        <button
          type="button"
          className="staff-page-btn"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          className="staff-page-btn"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </section>
  );
};

export default OrderHistory;
