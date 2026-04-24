import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOrdersByUserId } from "../../API/Orders";
import "../../styles/orders.css";

const ACTIVE_STATUSES = new Set(["pending", "confirmed", "preparing", "ready"]);

const STATUS_META = {
  pending: { label: "Order Received", percent: 20 },
  confirmed: { label: "Confirmed", percent: 38 },
  preparing: { label: "Preparing", percent: 62 },
  ready: { label: "Ready", percent: 84 },
  delivered: { label: "Delivered", percent: 100 },
  cancelled: { label: "Cancelled", percent: 0 },
};

const TYPE_META = {
  delivery: { label: "Delivery", className: "type-delivery" },
  pickup: { label: "Pickup", className: "type-pickup" },
};

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("daakooUser") || "null");
  } catch {
    return null;
  }
};

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getUserId = (user) =>
  user?._id || user?.id || user?.userId || user?.user?._id || null;

const getItemsLabel = (order) => {
  const items = Array.isArray(order?.items) ? order.items : [];

  if (items.length === 0) {
    return "No items recorded";
  }

  return items
    .map((item) => `${item.quantity || 1}x ${item.name || "Item"}`)
    .join(" · ");
};

const Orders = () => {
  const navigate = useNavigate();
  const [user] = useState(readStoredUser);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const userId = getUserId(user);
  const firstName = user?.fName || user?.name || "there";

  useEffect(() => {
    const loadOrders = async () => {
      const token = localStorage.getItem("daakooToken");
      console.log(token);

      if (!token) {
        console.log("changing page");

        navigate("/login", { replace: true });
        return;
      }

      setLoading(true);
      setErrorMsg("");

      try {
        const result = await getOrdersByUserId(userId, token);
        console.log(result);

        setOrders(Array.isArray(result) ? result : []);
      } catch (error) {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          localStorage.removeItem("daakooToken");
          localStorage.removeItem("daakooUser");
          navigate("/login", { replace: true });
          return;
        }

        setErrorMsg(
          error?.response?.data?.message ||
            "Unable to load your orders right now.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [navigate, userId]);

  const totalOrders = orders.length;
  const activeOrders = orders.filter((order) =>
    ACTIVE_STATUSES.has(order.status),
  );
  const totalSpent = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0,
  );
  const latestOrder = orders[0];

  return (
    <main className="orders-page">
      <div className="orders-shell">
        <section className="orders-hero">
          <div className="orders-hero-copy">
            <p className="orders-kicker">Account / Orders</p>
            <h1>My Orders</h1>
            <p>
              Keep track of live deliveries, review past meals, and jump back
              into your next order with one glance, {firstName}.
            </p>
          </div>

          <div className="orders-hero-actions">
            <Link className="orders-primary-link" to="/menu">
              Browse Menu
            </Link>
            <Link className="orders-secondary-link" to="/profile">
              Account Settings
            </Link>
          </div>
        </section>

        <section className="orders-stats-grid">
          <article className="orders-stat-card">
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
            <p>All completed, active, and cancelled orders.</p>
          </article>

          <article className="orders-stat-card">
            <span>Active Orders</span>
            <strong>{activeOrders.length}</strong>
            <p>Orders currently moving through the kitchen.</p>
          </article>

          <article className="orders-stat-card">
            <span>Total Spent</span>
            <strong>{currencyFormatter.format(totalSpent)}</strong>
            <p>Combined spend across your full order history.</p>
          </article>
        </section>

        {errorMsg ? <div className="orders-alert">{errorMsg}</div> : null}

        <section className="orders-section">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Live tracking</p>
              <h2>Active Orders</h2>
            </div>
            <span className="section-count">{activeOrders.length} live</span>
          </div>

          {loading ? (
            <div className="orders-empty loading-state">
              Loading your orders...
            </div>
          ) : activeOrders.length === 0 ? (
            <div className="orders-empty">
              <h3>No active orders right now</h3>
              <p>Your next order will appear here once it is placed.</p>
              <Link to="/menu" className="orders-primary-link compact">
                Order Something Fresh
              </Link>
            </div>
          ) : (
            <div className="active-orders-grid">
              {activeOrders.map((order) => {
                const statusMeta =
                  STATUS_META[order.status] || STATUS_META.pending;
                const typeMeta = TYPE_META[order.type] || TYPE_META.pickup;
                const deliveryText =
                  order.type === "delivery"
                    ? order.deliveryAddress || "Delivery address not saved"
                    : order.pickupLocation || "Pickup from the restaurant";

                return (
                  <article className="active-order-card" key={order._id}>
                    <div className="active-order-top">
                      <div>
                        <p className="order-number">
                          Order #{order._id?.slice(-4)?.toUpperCase()}
                        </p>
                        <h3>{statusMeta.label}</h3>
                      </div>
                      <span className={`status-pill status-${order.status}`}>
                        {statusMeta.label}
                      </span>
                    </div>

                    <p className="active-order-meta">
                      {typeMeta.label} · Placed {formatDate(order.createdAt)}
                    </p>

                    <div className="active-order-items">
                      {Array.isArray(order.items)
                        ? order.items.slice(0, 3).map((item) => (
                            <span
                              key={`${order._id}-${item.name}`}
                              className="item-chip">
                              {item.quantity || 1}x {item.name || "Item"}
                            </span>
                          ))
                        : null}
                      {Array.isArray(order.items) && order.items.length > 3 ? (
                        <span className="item-chip muted">
                          +{order.items.length - 3} more
                        </span>
                      ) : null}
                    </div>

                    <p className="active-order-note">{deliveryText}</p>

                    <div className="order-progress-track" aria-hidden="true">
                      <span
                        className={`order-progress order-progress-${order.status}`}
                        style={{ width: `${statusMeta.percent}%` }}
                      />
                    </div>

                    <div className="active-order-foot">
                      <span>
                        {formatDate(order.updatedAt || order.createdAt)}
                      </span>
                      <strong>
                        {currencyFormatter.format(order.totalAmount || 0)}
                      </strong>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="orders-section">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Order archive</p>
              <h2>Order History</h2>
            </div>
            <span className="section-count">
              {latestOrder
                ? `Latest: #${latestOrder._id?.slice(-4)?.toUpperCase()}`
                : "No history yet"}
            </span>
          </div>

          <div className="orders-table-shell">
            {orders.length === 0 ? (
              <div className="orders-empty compact-empty">
                <h3>Your history is empty</h3>
                <p>
                  Once you place an order, it will appear here with full
                  details.
                </p>
              </div>
            ) : (
              <div className="orders-table-wrap">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      const statusMeta =
                        STATUS_META[order.status] || STATUS_META.pending;
                      const typeMeta =
                        TYPE_META[order.type] || TYPE_META.pickup;

                      return (
                        <tr key={order._id}>
                          <td>
                            <span className="order-id-badge">
                              #{order._id?.slice(-6)?.toUpperCase()}
                            </span>
                          </td>
                          <td>{formatDate(order.createdAt)}</td>
                          <td className="order-items-cell">
                            {getItemsLabel(order)}
                          </td>
                          <td>
                            <span className={`type-pill ${typeMeta.className}`}>
                              {typeMeta.label}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`status-pill status-${order.status}`}>
                              {statusMeta.label}
                            </span>
                          </td>
                          <td>
                            {currencyFormatter.format(order.totalAmount || 0)}
                          </td>
                          <td>
                            <Link className="reorder-link" to="/menu">
                              Reorder
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Orders;
