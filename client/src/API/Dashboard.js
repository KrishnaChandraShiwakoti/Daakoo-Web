import { dashboard } from "../utils/axios";

export const getTodayKPI = async () => {
  const res = await dashboard.get("/analytics/today-kpi");
  return res.data.data;
};

export const getRevenueByPeriod = async (period = "week") => {
  const res = await dashboard.get(`/analytics/revenue?period=${period}`);
  return res.data.data;
};

export const getPopularDishes = async (limit = 5) => {
  const res = await dashboard.get(`/analytics/popular-dishes?limit=${limit}`);
  return res.data.data;
};

export const getOrderStatusBreakdown = async () => {
  const res = await dashboard.get("/analytics/order-status");
  return res.data.data;
};

export const getMonthlyStats = async () => {
  const res = await dashboard.get("/analytics/monthly-stats");
  return res.data.data;
};
