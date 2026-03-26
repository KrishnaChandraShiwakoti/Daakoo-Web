import { useState, useCallback } from "react";
import * as CustomerAPI from "../API/Customers";

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [stats, setStats] = useState(null);

  const fetchCustomers = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const result = await CustomerAPI.getAllCustomers(filters);
      setCustomers(result.customers || []);
      setPagination(result.pagination || {});
    } catch (err) {
      setError(err.message);
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCustomerById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const customer = await CustomerAPI.getCustomerById(id);
      return customer;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching customer:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCustomers = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);
      const results = await CustomerAPI.searchCustomers(query);
      setCustomers(results);
      return results;
    } catch (err) {
      setError(err.message);
      console.error("Error searching customers:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTopCustomers = useCallback(async (limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      const topCustomers = await CustomerAPI.getTopCustomers(limit);
      return topCustomers;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching top customers:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCustomerStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const statsData = await CustomerAPI.getCustomerStats();
      setStats(statsData);
      return statsData;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching customer stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrUpdateCustomer = useCallback(async (customerData) => {
    try {
      setLoading(true);
      setError(null);
      const customer = await CustomerAPI.createOrUpdateCustomer(customerData);
      return customer;
    } catch (err) {
      setError(err.message);
      console.error("Error saving customer:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    customers,
    loading,
    error,
    pagination,
    stats,
    fetchCustomers,
    getCustomerById,
    searchCustomers,
    getTopCustomers,
    fetchCustomerStats,
    createOrUpdateCustomer,
  };
};
