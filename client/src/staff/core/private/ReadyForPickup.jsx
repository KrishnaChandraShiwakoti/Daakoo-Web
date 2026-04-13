import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStaffOrders } from "../../hooks/useStaffOrders";
import {
  ORDER_TYPE_LABELS,
  formatTimeAgo,
  getCustomerName,
  getOrderCode,
  getOrderItemsLabel,
} from "../../utils/orderHelpers";

const ReadyForPickup = () => {
  const { orders, loading, error, fetchOrders, mutateOrderStatus } =
    useStaffOrders();
  const [activeFilter, setActiveFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    fetchOrders({ status: "ready", limit: 200 }).catch(() => {});
  }, [fetchOrders]);

  const readyOrders = useMemo(
    () => orders.filter((order) => order.status === "ready"),
    [orders],
  );

  const filteredOrders = useMemo(() => {
    if (activeFilter === "all") return readyOrders;
    return readyOrders.filter((order) => order.type === activeFilter);
  }, [activeFilter, readyOrders]);

  const handleComplete = async (orderId) => {
    setUpdatingId(orderId);
    try {
      await mutateOrderStatus(orderId, "delivered");
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <section>
      <div className="staff-page-header">
        <h2>Ready for Pickup</h2>
        <span className="staff-pill success">
          {readyOrders.length} orders ready
        </span>
      </div>

      <div className="staff-tab-row">
        <button
          type="button"
          className={activeFilter === "all" ? "staff-tab active" : "staff-tab"}
          onClick={() => setActiveFilter("all")}>
          All Ready
        </button>
        <button
          type="button"
          className={
            activeFilter === "pickup" ? "staff-tab active" : "staff-tab"
          }
          onClick={() => setActiveFilter("pickup")}>
          Pickup Only
        </button>
        <button
          type="button"
          className={
            activeFilter === "delivery" ? "staff-tab active" : "staff-tab"
          }
          onClick={() => setActiveFilter("delivery")}>
          Delivery Only
        </button>
      </div>

      {error ? <p className="staff-error-banner">{error}</p> : null}
      {loading && !orders.length ? (
        <p className="staff-muted">Loading ready orders...</p>
      ) : null}

      <div className="staff-ready-grid">
        {filteredOrders.map((order) => {
          const isPickup = order.type === "pickup";

          return (
            <article className="staff-ready-card" key={order._id}>
              <div className="staff-ready-head">
                <span className={`staff-type-tag ${order.type}`}>
                  {ORDER_TYPE_LABELS[order.type] || "Order"}
                </span>
                <span>{formatTimeAgo(order.updatedAt || order.createdAt)}</span>
              </div>

              <h3>{getOrderCode(order._id)}</h3>
              <p className="staff-customer-name">{getCustomerName(order)}</p>
              <p className="staff-muted small">{getOrderItemsLabel(order)}</p>

              {!isPickup ? (
                <p className="staff-muted small">
                  Courier: {order.deliveryAddress || "Delivery dispatch"}
                </p>
              ) : null}

              <div className="staff-ready-actions">
                <button
                  type="button"
                  className="staff-action-btn danger"
                  disabled={updatingId === order._id}
                  onClick={() => handleComplete(order._id)}>
                  {updatingId === order._id
                    ? "Updating..."
                    : isPickup
                      ? "Mark Completed"
                      : "Hand Over"}
                </button>
                <Link
                  to={`/staff/orders/${order._id}`}
                  className="staff-inline-link">
                  Open
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {!loading && !filteredOrders.length ? (
        <div className="staff-empty-card">
          <p>No ready orders in this filter.</p>
        </div>
      ) : null}
    </section>
  );
};

export default ReadyForPickup;
