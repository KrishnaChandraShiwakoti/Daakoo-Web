import { useCallback, useState } from "react";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../../API/Orders";

export const useStaffOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async (filters = {}) => {
    setLoading(true);
    setError("");

    try {
      const result = await getAllOrders({ limit: 200, page: 1, ...filters });
      setOrders(Array.isArray(result?.orders) ? result.orders : []);
      return result;
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch orders",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const mutateOrderStatus = useCallback(async (orderId, status) => {
    setError("");
    const updated = await updateOrderStatus(orderId, status);
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order._id === orderId ? updated : order)),
    );
    return updated;
  }, []);

  const fetchOrderById = useCallback(async (orderId) => {
    setError("");
    try {
      return await getOrderById(orderId);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to fetch order",
      );
      throw err;
    }
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    mutateOrderStatus,
    fetchOrderById,
  };
};
