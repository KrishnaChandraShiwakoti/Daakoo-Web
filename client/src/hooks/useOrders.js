import { useState, useCallback } from "react";
import * as OrderAPI from "../API/Orders";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const fetchOrders = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const result = await OrderAPI.getAllOrders(filters);
      setOrders(result.orders || []);
      setPagination(result.pagination || {});
    } catch (err) {
      setError(err.message);
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(
    async (orderData) => {
      try {
        setLoading(true);
        setError(null);
        const newOrder = await OrderAPI.createOrder(orderData);
        setOrders([newOrder, ...orders]);
        return newOrder;
      } catch (err) {
        setError(err.message);
        console.error("Error creating order:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [orders],
  );

  const updateOrderStatus = useCallback(
    async (id, status) => {
      try {
        setLoading(true);
        setError(null);
        const updatedOrder = await OrderAPI.updateOrderStatus(id, status);
        setOrders(orders.map((o) => (o._id === id ? updatedOrder : o)));
        return updatedOrder;
      } catch (err) {
        setError(err.message);
        console.error("Error updating order status:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [orders],
  );

  const searchOrders = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);
      const results = await OrderAPI.searchOrders(query);
      setOrders(results);
    } catch (err) {
      setError(err.message);
      console.error("Error searching orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecentOrders = useCallback(async (limit = 5) => {
    try {
      setLoading(true);
      setError(null);
      const results = await OrderAPI.getRecentOrders(limit);
      return results;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching recent orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getActiveOrdersCount = useCallback(async () => {
    try {
      const result = await OrderAPI.getActiveOrdersCount();

      return result.activeOrders;
    } catch (err) {
      console.error("Error fetching active orders count:", err);
    }
  }, []);

  return {
    orders,
    loading,
    error,
    pagination,
    fetchOrders,
    createOrder,
    updateOrderStatus,
    searchOrders,
    getRecentOrders,
    getActiveOrdersCount,
  };
};
