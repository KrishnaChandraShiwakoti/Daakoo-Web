const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  searchOrders,
  getActiveOrdersCount,
  getRecentOrders,
} = require("../controller/orderController");

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/search", searchOrders);
router.get("/active-count", getActiveOrdersCount);
router.get("/recent", getRecentOrders);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

module.exports = router;
