import { useState, useCallback } from "react";
import * as DashboardAPI from "../API/Dashboard";

export const useDashboard = () => {
  const [kpi, setKPI] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [popularDishes, setPopularDishes] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodayKPI = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DashboardAPI.getTodayKPI();
      setKPI(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching KPI:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRevenueByPeriod = useCallback(async (period = "week") => {
    try {
      setLoading(true);
      setError(null);
      const data = await DashboardAPI.getRevenueByPeriod(period);
      setRevenueData(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching revenue:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPopularDishes = useCallback(async (limit = 5) => {
    try {
      setLoading(true);
      setError(null);
      const data = await DashboardAPI.getPopularDishes(limit);
      setPopularDishes(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching popular dishes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrderStatusBreakdown = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DashboardAPI.getOrderStatusBreakdown();
      setOrderStatus(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching order status:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMonthlyStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DashboardAPI.getMonthlyStats();
      setMonthlyStats(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching monthly stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [kpiData, revenueData, dishesData, statusData, monthlyData] =
        await Promise.all([
          DashboardAPI.getTodayKPI(),
          DashboardAPI.getRevenueByPeriod("week"),
          DashboardAPI.getPopularDishes(5),
          DashboardAPI.getOrderStatusBreakdown(),
          DashboardAPI.getMonthlyStats(),
        ]);
      setKPI(kpiData);
      setRevenueData(revenueData);
      setPopularDishes(dishesData);
      setOrderStatus(statusData);
      setMonthlyStats(monthlyData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    kpi,
    revenueData,
    popularDishes,
    orderStatus,
    monthlyStats,
    loading,
    error,
    fetchTodayKPI,
    fetchRevenueByPeriod,
    fetchPopularDishes,
    fetchOrderStatusBreakdown,
    fetchMonthlyStats,
    fetchAllDashboardData,
  };
};
