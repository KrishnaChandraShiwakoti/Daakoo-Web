const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus,
  searchOrders,
  getActiveOrdersCount,
  getRecentOrders,
} = require("../controller/orderController");
const { requireAuth } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/user/:userId", requireAuth, getOrdersByUserId);
router.get("/search", searchOrders);
router.get("/active-count", getActiveOrdersCount);
router.get("/recent", getRecentOrders);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

module.exports = router;
