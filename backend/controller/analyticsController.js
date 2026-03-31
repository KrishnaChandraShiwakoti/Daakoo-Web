const analyticsService = require("../services/AnalyticsService.js");

exports.getTodayKPI = async (req, res) => {
  try {
    const kpi = await analyticsService.getTodayKPI();
    return res.status(200).json({ message: "ok", data: kpi });
  } catch (error) {
    console.error("Error in getTodayKPI:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getRevenueByPeriod = async (req, res) => {
  try {
    const { period } = req.query;
    const data = await analyticsService.getRevenueByPeriod(period || "week");
    return res.status(200).json({ message: "ok", data });
  } catch (error) {
    console.error("Error in getRevenueByPeriod:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getPopularDishes = async (req, res) => {
  try {
    const { limit } = req.query;
    const dishes = await analyticsService.getPopularDishes(
      parseInt(limit) || 5,
    );
    return res.status(200).json({ message: "ok", data: dishes });
  } catch (error) {
    console.error("Error in getPopularDishes:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getOrderStatusBreakdown = async (req, res) => {
  try {
    const statusData = await analyticsService.getOrderStatusBreakdown();
    return res.status(200).json({ message: "ok", data: statusData });
  } catch (error) {
    console.error("Error in getOrderStatusBreakdown:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getMonthlyStats = async (req, res) => {
  try {
    const stats = await analyticsService.getMonthlyStats();
    return res.status(200).json({ message: "ok", data: stats });
  } catch (error) {
    console.error("Error in getMonthlyStats:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
