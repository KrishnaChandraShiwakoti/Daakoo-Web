import { orders } from "../utils/axios";

export const createOrder = async (orderData) => {
  const res = await orders.post("/", orderData);
  return res.data.data;
};

export const getAllOrders = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.type) params.append("type", filters.type);
  if (filters.startDate) params.append("startDate", filters.startDate);
  if (filters.endDate) params.append("endDate", filters.endDate);
  if (filters.page) params.append("page", filters.page);
  if (filters.limit) params.append("limit", filters.limit);

  const res = await orders.get(`/?${params.toString()}`);
  return res.data.data;
};

export const getOrderById = async (id) => {
  const res = await orders.get(`/${id}`);
  return res.data.data;
};

export const getOrdersByUserId = async (userId, token) => {
  const res = await orders.get(`/user/${encodeURIComponent(userId)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await orders.put(`/${id}/status`, { status });
  return res.data.data;
};

export const searchOrders = async (query) => {
  const res = await orders.get(`/search?query=${query}`);
  return res.data.data;
};

export const getActiveOrdersCount = async () => {
  const res = await orders.get("/active-count");
  return res.data.data;
};

export const getRecentOrders = async (limit = 5) => {
  const res = await orders.get(`/recent?limit=${limit}`);
  return res.data.data;
};
