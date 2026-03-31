const express = require("express");
const {
  getTodayKPI,
  getRevenueByPeriod,
  getPopularDishes,
  getOrderStatusBreakdown,
  getMonthlyStats,
} = require("../controller/analyticsController");

const router = express.Router();

router.get("/today-kpi", getTodayKPI);
router.get("/revenue", getRevenueByPeriod);
router.get("/popular-dishes", getPopularDishes);
router.get("/order-status", getOrderStatusBreakdown);
router.get("/monthly-stats", getMonthlyStats);

module.exports = router;
