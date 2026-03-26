import { useState, useCallback } from "react";
import * as SettingsAPI from "../API/Settings";

export const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await SettingsAPI.getSettings();
      setSettings(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (updateData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedSettings = await SettingsAPI.updateSettings(updateData);
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      setError(err.message);
      console.error("Error updating settings:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRestaurantInfo = useCallback(async (restaurantInfo) => {
    try {
      setLoading(true);
      setError(null);
      const updatedSettings =
        await SettingsAPI.updateRestaurantInfo(restaurantInfo);
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      setError(err.message);
      console.error("Error updating restaurant info:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOperatingHours = useCallback(async (hours) => {
    try {
      setLoading(true);
      setError(null);
      const updatedSettings = await SettingsAPI.updateOperatingHours(hours);
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      setError(err.message);
      console.error("Error updating operating hours:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrderSettings = useCallback(async (orderSettings) => {
    try {
      setLoading(true);
      setError(null);
      const updatedSettings =
        await SettingsAPI.updateOrderSettings(orderSettings);
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      setError(err.message);
      console.error("Error updating order settings:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateNotifications = useCallback(async (notifications) => {
    try {
      setLoading(true);
      setError(null);
      const updatedSettings =
        await SettingsAPI.updateNotifications(notifications);
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      setError(err.message);
      console.error("Error updating notifications:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
    updateRestaurantInfo,
    updateOperatingHours,
    updateOrderSettings,
    updateNotifications,
  };
};
