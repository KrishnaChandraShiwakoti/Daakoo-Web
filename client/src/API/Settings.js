import { settings } from "../utils/axios";

export const getSettings = async () => {
  const res = await settings.get("/");
  return res.data.data;
};

export const updateSettings = async (updateData) => {
  const res = await settings.put("/", updateData);
  return res.data.data;
};

export const updateRestaurantInfo = async (restaurantInfo) => {
  const res = await settings.put("/restaurant-info", restaurantInfo);
  return res.data.data;
};

export const updateOperatingHours = async (hours) => {
  const res = await settings.put("/operating-hours", hours);
  return res.data.data;
};

export const updateOrderSettings = async (orderSettings) => {
  const res = await settings.put("/order-settings", orderSettings);
  return res.data.data;
};

export const updateNotifications = async (notifications) => {
  const res = await settings.put("/notifications", notifications);
  return res.data.data;
};

export const updateLogo = async (logoUrl) => {
  const res = await settings.put("/logo", { logoUrl });
  return res.data.data;
};
