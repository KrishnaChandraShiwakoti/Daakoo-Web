import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStaffOrders } from "../../hooks/useStaffOrders";
import {
  LIVE_STATUSES,
  ORDER_TYPE_LABELS,
  STATUS_LABELS,
  formatClockTime,
  formatTimeAgo,
  getCustomerName,
  getOrderCode,
  getStatusClassName,
} from "../../utils/orderHelpers";

const LiveOrders = () => {
  const { orders, loading, error, fetchOrders, mutateOrderStatus } =
    useStaffOrders();
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    fetchOrders({ limit: 200 }).catch(() => {});
    const interval = setInterval(() => {
      fetchOrders({ limit: 200 }).catch(() => {});
    }, 20000);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  const liveOrders = useMemo(
    () => orders.filter((order) => LIVE_STATUSES.includes(order.status)),
    [orders],
  );

  const summary = useMemo(
    () => ({
      pending: orders.filter((order) => order.status === "pending").length,
      preparing: orders.filter((order) => order.status === "preparing").length,
      ready: orders.filter((order) => order.status === "ready").length,
    }),
    [orders],
  );

  const handleAction = async (order) => {
    const nextStatus = order.status === "preparing" ? "ready" : "preparing";
    setUpdatingId(order._id);
    try {
      await mutateOrderStatus(order._id, nextStatus);
    } catch {
      // keep UI responsive and show global error from hook
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <section>
      <div className="staff-page-header">
        <h2>Kitchen Queue</h2>
        <span className="staff-pill">{liveOrders.length} active</span>
      </div>

      {error ? <p className="staff-error-banner">{error}</p> : null}

      {loading && !orders.length ? (
        <p className="staff-muted">Loading live orders...</p>
      ) : null}

      <div className="staff-live-grid">
        {liveOrders.map((order) => {
          const statusLabel = STATUS_LABELS[order.status] || "Pending";
          const isPreparing = order.status === "preparing";
          const customer = getCustomerName(order);

          return (
            <article className="staff-order-card" key={order._id}>
              <div className="staff-order-card-head">
                <div>
                  <span
                    className={`staff-status-pill ${getStatusClassName(order.status)}`}>
                    {statusLabel}
                  </span>
                  <h3>{getOrderCode(order._id)}</h3>
                  <p>Customer: {customer}</p>
                </div>
                <div className="staff-time-stack">
                  <strong>{formatClockTime(order.createdAt)}</strong>
                  <span>{formatTimeAgo(order.createdAt)}</span>
                </div>
              </div>

              <div className="staff-item-list">
                {(order.items || []).map((item, idx) => (
                  <div key={`${order._id}-${idx}`} className="staff-item-row">
                    <span className="staff-item-count">
                      {item.quantity || 1}
                    </span>
                    <span>{item.name || "Unnamed item"}</span>
                  </div>
                ))}
              </div>

              {order.notes ? (
                <p className="staff-note-box">Kitchen notes: {order.notes}</p>
              ) : null}

              <div className="staff-order-card-foot">
                <span className={`staff-type-tag ${order.type}`}>
                  {ORDER_TYPE_LABELS[order.type] || "Order"}
                </span>
                <Link
                  to={`/staff/orders/${order._id}`}
                  className="staff-inline-link">
                  View details
                </Link>
              </div>

              <button
                type="button"
                className={`staff-action-btn ${isPreparing ? "success" : "danger"}`}
                onClick={() => handleAction(order)}
                disabled={updatingId === order._id}>
                {updatingId === order._id
                  ? "Updating..."
                  : isPreparing
                    ? "Mark as Ready"
                    : "Start Preparing"}
              </button>
            </article>
          );
        })}

        {!loading && !liveOrders.length ? (
          <div className="staff-empty-card">
            <p>Waiting for new orders...</p>
          </div>
        ) : null}
      </div>

      <div className="staff-summary-row">
        <p>
          <span className="dot pending" /> {summary.pending} Pending
        </p>
        <p>
          <span className="dot preparing" /> {summary.preparing} Preparing
        </p>
        <p>
          <span className="dot ready" /> {summary.ready} Ready
        </p>
      </div>
    </section>
  );
};

export default LiveOrders;
