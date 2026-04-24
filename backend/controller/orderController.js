const mongoose = require("mongoose");
const orderService = require("../services/OrderService.js");
const customerService = require("../services/CustomerService.js");

exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      totalAmount,
      type,
      deliveryAddress,
      pickupLocation,
      notes,
    } = req.body;

    if (!userId || !items || !totalAmount || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!["delivery", "pickup"].includes(type)) {
      return res.status(400).json({ message: "Invalid order type" });
    }

    const order = await orderService.createOrder({
      userId,
      items,
      totalAmount,
      type,
      deliveryAddress:
        type === "delivery" ? (deliveryAddress || "").trim() : "",
      pickupLocation: type === "pickup" ? (pickupLocation || "").trim() : "",
      notes,
    });

    // Update customer stats
    await customerService.updateCustomerStats(userId);

    return res
      .status(201)
      .json({ message: "Order created successfully", data: order });
  } catch (error) {
    console.error("Error in createOrder:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const { status, type, startDate, endDate, page, limit } = req.query;

    const filters = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    };

    if (status) filters.status = status;
    if (type) filters.type = type;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    const result = await orderService.getAllOrders(filters);
    return res.status(200).json({ message: "ok", data: result });
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "ok", data: order });
  } catch (error) {
    console.error("Error in getOrderById:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    if (req.user?.id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const orders = await orderService.getOrdersByUserId(userId);

    return res.status(200).json({ message: "ok", data: orders });
  } catch (error) {
    console.error("Error in getOrdersByUserId:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await orderService.updateOrderStatus(id, status);

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    if (error.message === "Invalid status") {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error in updateOrderStatus:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.searchOrders = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const orders = await orderService.searchOrders(query);
    return res.status(200).json({ message: "ok", data: orders });
  } catch (error) {
    console.error("Error in searchOrders:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getActiveOrdersCount = async (req, res) => {
  try {
    const count = await orderService.getActiveOrdersCount();
    return res
      .status(200)
      .json({ message: "ok", data: { activeOrders: count } });
  } catch (error) {
    console.error("Error in getActiveOrdersCount:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getRecentOrders = async (req, res) => {
  try {
    const { limit } = req.query;
    const orders = await orderService.getRecentOrders(parseInt(limit) || 5);
    return res.status(200).json({ message: "ok", data: orders });
  } catch (error) {
    console.error("Error in getRecentOrders:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
