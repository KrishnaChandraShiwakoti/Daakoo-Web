import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchOrderById, mutateOrderStatus } = useStaffOrders();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchOrderById(id);
        setOrder(data);
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to load order details",
        );
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [fetchOrderById, id]);

  const totalItems = useMemo(() => {
    if (!order?.items) return 0;
    return order.items.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0,
    );
  }, [order]);

  const handleStatus = async (nextStatus) => {
    if (!order?._id) return;
    setUpdating(true);
    try {
      const updated = await mutateOrderStatus(order._id, nextStatus);
      setOrder(updated);
    } catch (err) {
      setError(err?.response?.data?.message || "Status update failed");
    } finally {
      setUpdating(false);
    }
  };

  const nextAction = useMemo(() => {
    if (!order) return null;
    if (["pending", "confirmed"].includes(order.status)) {
      return {
        label: "Start Preparing",
        status: "preparing",
        className: "danger",
      };
    }
    if (order.status === "preparing") {
      return { label: "Mark as Ready", status: "ready", className: "success" };
    }
    if (order.status === "ready") {
      return {
        label: "Mark Completed",
        status: "delivered",
        className: "danger",
      };
    }
    return null;
  }, [order]);

  if (loading) return <p className="staff-muted">Loading order details...</p>;

  if (!order) {
    return (
      <section>
        <p className="staff-error-banner">{error || "Order not found"}</p>
        <Link to="/staff" className="staff-inline-link">
          Back to Live Orders
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="staff-page-header no-wrap">
        <div>
          <Link to="/staff" className="staff-inline-link">
            Back to Dashboard
          </Link>
          <h2>
            Order {getOrderCode(order._id)}
            <span
              className={`staff-status-pill ${getStatusClassName(order.status)}`}>
              {STATUS_LABELS[order.status] || order.status}
            </span>
          </h2>
        </div>
        <div className="staff-muted">{formatDateTime(order.createdAt)}</div>
      </div>

      {error ? <p className="staff-error-banner">{error}</p> : null}

      <div className="staff-detail-grid">
        <article className="staff-detail-card">
          <div className="staff-detail-head">
            <h3>Order Items ({totalItems})</h3>
            <span className={`staff-type-tag ${order.type}`}>
              {ORDER_TYPE_LABELS[order.type] || "Order"}
            </span>
          </div>

          {(order.items || []).map((item, idx) => (
            <div className="staff-detail-item" key={`${order._id}-${idx}`}>
              <div>
                <strong>
                  {item.quantity || 1}x {item.name || "Item"}
                </strong>
                <p className="staff-muted small">
                  Menu reference: {item.menuId?.name || "-"}
                </p>
              </div>
              <span>
                {formatCurrency((item.price || 0) * (item.quantity || 1))}
              </span>
            </div>
          ))}

          {order.notes ? (
            <div className="staff-note-box large">
              Special instructions: {order.notes}
            </div>
          ) : null}
        </article>

        <aside className="staff-side-card">
          <h3>Customer Information</h3>
          <p className="staff-customer-name">{getCustomerName(order)}</p>
          <p className="staff-muted">
            {order.userId?.contact || "No phone number"}
          </p>
          <p className="staff-muted">
            {order.userId?.email || "No email address"}
          </p>

          <hr />

          <h4>Order Summary</h4>
          <div className="staff-summary-line">
            <span>Subtotal</span>
            <strong>{formatCurrency(order.totalAmount)}</strong>
          </div>
          <div className="staff-summary-line">
            <span>Status</span>
            <strong>{STATUS_LABELS[order.status] || order.status}</strong>
          </div>

          {nextAction ? (
            <button
              type="button"
              disabled={updating}
              className={`staff-action-btn ${nextAction.className}`}
              onClick={() => handleStatus(nextAction.status)}>
              {updating ? "Updating..." : nextAction.label}
            </button>
          ) : null}

          {!["cancelled", "delivered"].includes(order.status) ? (
            <button
              type="button"
              disabled={updating}
              className="staff-cancel-btn"
              onClick={() => handleStatus("cancelled")}>
              Cancel Order
            </button>
          ) : null}

          <button
            type="button"
            className="staff-secondary-btn"
            onClick={() => navigate("/staff/history")}>
            View Full History
          </button>
        </aside>
      </div>
    </section>
  );
};

export default OrderDetail;
