import { customers } from "../utils/axios";

export const createOrUpdateCustomer = async (customerData) => {
  const res = await customers.post("/", customerData);
  return res.data.data;
};

export const getAllCustomers = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append("search", filters.search);
  if (filters.page) params.append("page", filters.page);
  if (filters.limit) params.append("limit", filters.limit);

  const res = await customers.get(`/?${params.toString()}`);
  return res.data.data;
};

export const getCustomerById = async (id) => {
  const res = await customers.get(`/${id}`);
  return res.data.data;
};

export const getCustomerByUserId = async (userId) => {
  const res = await customers.get(`/user/${userId}`);
  return res.data.data;
};

export const searchCustomers = async (query) => {
  const res = await customers.get(`/search?query=${query}`);
  return res.data.data;
};

export const getTopCustomers = async (limit = 10) => {
  const res = await customers.get(`/top?limit=${limit}`);
  return res.data.data;
};

export const getCustomerStats = async () => {
  const res = await customers.get("/stats");
  return res.data.data;
};
