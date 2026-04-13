export const LIVE_STATUSES = ["pending", "confirmed", "preparing"];
export const READY_STATUSES = ["ready"];

export const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  ready: "Ready",
  delivered: "Completed",
  cancelled: "Cancelled",
};

export const ORDER_TYPE_LABELS = {
  pickup: "Pickup",
  delivery: "Delivery",
};

export const formatCurrency = (value = 0) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(Number(value) || 0);
};

export const formatClockTime = (value) => {
  if (!value) return "--:--";
  return new Date(value).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateTime = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatTimeAgo = (value) => {
  if (!value) return "just now";
  const diffMs = Date.now() - new Date(value).getTime();
  const mins = Math.max(Math.floor(diffMs / 60000), 0);

  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;

  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

export const getOrderCode = (id = "") => {
  if (!id) return "#----";
  return `#${String(id).slice(-4).toUpperCase()}`;
};

export const getCustomerName = (order) => {
  const fName = order?.userId?.fName || "";
  const lName = order?.userId?.lName || "";
  const fullName = `${fName} ${lName}`.trim();
  return fullName || "Guest Customer";
};

export const getOrderItemsLabel = (order) => {
  const items = Array.isArray(order?.items) ? order.items : [];
  if (!items.length) return "No items";

  return items
    .map((item) => `${item.quantity || 1}x ${item.name || "Item"}`)
    .join(", ");
};

export const getStatusClassName = (status = "") => {
  switch (status) {
    case "pending":
      return "staff-status-pending";
    case "confirmed":
      return "staff-status-confirmed";
    case "preparing":
      return "staff-status-preparing";
    case "ready":
      return "staff-status-ready";
    case "delivered":
      return "staff-status-delivered";
    case "cancelled":
      return "staff-status-cancelled";
    default:
      return "";
  }
};
