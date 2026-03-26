const Customer = require("../models/customer.js");
const Order = require("../models/order.js");

class CustomerService {
  async createOrUpdateCustomer(userId, userData) {
    let customer = await Customer.findOne({ userId });

    if (customer) {
      return await Customer.findByIdAndUpdate(customer._id, userData, {
        new: true,
      });
    } else {
      return await Customer.create({ userId, ...userData });
    }
  }

  async getAllCustomers(filters = {}) {
    const { page = 1, limit = 10, search } = filters;

    let query = {};
    if (search) {
      query.$or = [
        { firstName: new RegExp(search, "i") },
        { lastName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
        { phone: new RegExp(search, "i") },
      ];
    }

    const skip = (page - 1) * limit;
    const customers = await Customer.find(query)
      .populate("userId")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Customer.countDocuments(query);

    return {
      customers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getCustomerById(id) {
    const customer = await Customer.findById(id).populate("userId");

    if (!customer) return null;

    // Get customer's order history
    const orders = await Order.find({ userId: customer.userId })
      .populate("items.menuId")
      .sort({ createdAt: -1 });

    return {
      ...customer.toObject(),
      orderHistory: orders,
    };
  }

  async getCustomerByUserId(userId) {
    const customer = await Customer.findOne({ userId }).populate("userId");

    if (!customer) return null;

    const orders = await Order.find({ userId })
      .populate("items.menuId")
      .sort({ createdAt: -1 });

    return {
      ...customer.toObject(),
      orderHistory: orders,
    };
  }

  async searchCustomers(query) {
    const searchRegex = new RegExp(query, "i");
    return await Customer.find({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
      ],
    })
      .populate("userId")
      .limit(20);
  }

  async updateCustomerStats(userId) {
    const orders = await Order.find({ userId, status: { $ne: "cancelled" } });

    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const lastOrderDate =
      orders.length > 0 ? orders[orders.length - 1].createdAt : null;

    return await Customer.findOneAndUpdate(
      { userId },
      {
        totalOrders,
        totalSpent,
        lastOrderDate,
      },
      { new: true },
    );
  }

  async getTopCustomers(limit = 10) {
    return await Customer.find()
      .sort({ totalSpent: -1 })
      .limit(limit)
      .populate("userId", "fName lName email");
  }

  async getCustomerStats() {
    const total = await Customer.countDocuments();
    const totalSpent = await Customer.aggregate([
      { $group: { _id: null, total: { $sum: "$totalSpent" } } },
    ]);

    const avgSpent = await Customer.aggregate([
      { $group: { _id: null, avg: { $avg: "$totalSpent" } } },
    ]);

    return {
      totalCustomers: total,
      totalCustomerSpent: totalSpent[0]?.total || 0,
      avgCustomerSpent: Math.round((avgSpent[0]?.avg || 0) * 100) / 100,
    };
  }
}

module.exports = new CustomerService();
