const Order = require("../models/order.js");

class OrderService {
  async createOrder(orderData) {
    const order = await Order.create(orderData);
    return await order.populate("userId").populate("items.menuId");
  }

  async getAllOrders(filters = {}) {
    const { status, type, startDate, endDate, page = 1, limit = 10 } = filters;

    let query = {};

    if (status) query.status = status;
    if (type) query.type = type;

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const orders = await Order.find(query)
      .populate("userId", "fName lName email contact")
      .populate("items.menuId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(query);

    return {
      orders,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getOrderById(id) {
    return await Order.findById(id).populate("userId").populate("items.menuId");
  }

  async updateOrderStatus(id, status) {
    if (
      ![
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "delivered",
        "cancelled",
      ].includes(status)
    ) {
      throw new Error("Invalid status");
    }
    return await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true },
    )
      .populate("userId")
      .populate("items.menuId");
  }

  async searchOrders(query) {
    const searchRegex = new RegExp(query, "i");
    return await Order.find({
      $or: [
        { _id: query },
        { "userId.fName": searchRegex },
        { "userId.lName": searchRegex },
        { "userId.email": searchRegex },
      ],
    })
      .populate("userId")
      .populate("items.menuId")
      .limit(10);
  }

  async getActiveOrdersCount() {
    return await Order.countDocuments({
      status: { $in: ["pending", "confirmed", "preparing", "ready"] },
    });
  }

  async getRecentOrders(limit = 5) {
    return await Order.find()
      .populate("userId", "fName lName email")
      .populate("items.menuId", "name")
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  async getOrdersByDateRange(startDate, endDate) {
    return await Order.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .populate("userId")
      .populate("items.menuId");
  }
}

module.exports = new OrderService();
