const settingsService = require("../services/SettingsService.js");

exports.getSettings = async (req, res) => {
  try {
    const settings = await settingsService.getSettings();
    return res.status(200).json({ message: "ok", data: settings });
  } catch (error) {
    console.error("Error in getSettings:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    const settings = await settingsService.updateSettings(updateData);
    return res
      .status(200)
      .json({ message: "Settings updated successfully", data: settings });
  } catch (error) {
    console.error("Error in updateSettings:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateRestaurantInfo = async (req, res) => {
  try {
    const { name, address, phone, email } = req.body;

    if (!name || !address || !phone || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const settings = await settingsService.updateRestaurantInfo({
      name,
      address,
      phone,
      email,
    });

    return res
      .status(200)
      .json({
        message: "Restaurant info updated successfully",
        data: settings,
      });
  } catch (error) {
    console.error("Error in updateRestaurantInfo:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateOperatingHours = async (req, res) => {
  try {
    const hours = req.body;

    if (!hours || Object.keys(hours).length === 0) {
      return res
        .status(400)
        .json({ message: "Operating hours data is required" });
    }

    const settings = await settingsService.updateOperatingHours(hours);
    return res
      .status(200)
      .json({
        message: "Operating hours updated successfully",
        data: settings,
      });
  } catch (error) {
    console.error("Error in updateOperatingHours:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateOrderSettings = async (req, res) => {
  try {
    const orderSettings = req.body;

    if (!orderSettings || Object.keys(orderSettings).length === 0) {
      return res
        .status(400)
        .json({ message: "Order settings data is required" });
    }

    const settings = await settingsService.updateOrderSettings(orderSettings);
    return res
      .status(200)
      .json({ message: "Order settings updated successfully", data: settings });
  } catch (error) {
    console.error("Error in updateOrderSettings:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateNotifications = async (req, res) => {
  try {
    const notifications = req.body;

    if (!notifications || Object.keys(notifications).length === 0) {
      return res
        .status(400)
        .json({ message: "Notification settings data is required" });
    }

    const settings = await settingsService.updateNotifications(notifications);
    return res
      .status(200)
      .json({
        message: "Notification settings updated successfully",
        data: settings,
      });
  } catch (error) {
    console.error("Error in updateNotifications:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateLogo = async (req, res) => {
  try {
    const { logoUrl } = req.body;

    if (!logoUrl) {
      return res.status(400).json({ message: "Logo URL is required" });
    }

    const settings = await settingsService.updateLogo(logoUrl);
    return res
      .status(200)
      .json({ message: "Logo updated successfully", data: settings });
  } catch (error) {
    console.error("Error in updateLogo:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
