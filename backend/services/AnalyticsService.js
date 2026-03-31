const Order = require("../models/order.js");
const Menu = require("../models/menu.js");

class AnalyticsService {
  async getTodayKPI() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's orders
    const todayOrders = await Order.find({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const totalOrders = todayOrders.length;
    const totalRevenue = todayOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );

    // Get active orders
    const activeOrders = await Order.countDocuments({
      status: { $in: ["pending", "confirmed", "preparing", "ready"] },
      createdAt: { $gte: today, $lt: tomorrow },
    });

    // Get unique customers today
    const uniqueCustomers = new Set(todayOrders.map((o) => o.userId.toString()))
      .size;

    return {
      totalOrders,
      totalRevenue,
      activeOrders,
      uniqueCustomers,
    };
  }

  async getRevenueByPeriod(period = "week") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let days = 7;
    if (period === "month") days = 30;
    if (period === "year") days = 365;

    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const dayStart = new Date(today);
      dayStart.setDate(dayStart.getDate() - i);

      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const dayOrders = await Order.find({
        createdAt: { $gte: dayStart, $lt: dayEnd },
        status: { $ne: "cancelled" },
      });

      const dayRevenue = dayOrders.reduce((sum, o) => sum + o.totalAmount, 0);
      const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
        dayStart.getDay()
      ];

      data.push({
        day: dayOfWeek,
        revenue: dayRevenue,
        orders: dayOrders.length,
        date: dayStart.toISOString().split("T")[0],
      });
    }

    return data;
  }

  async getPopularDishes(limit = 5) {
    const orders = await Order.find({ status: { $ne: "cancelled" } }).populate(
      "items.menuId",
    );

    // Aggregate items by menu ID
    const dishStats = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const dishId = item.menuId._id.toString();
        if (!dishStats[dishId]) {
          dishStats[dishId] = {
            id: dishId,
            name: item.menuId.name,
            count: 0,
            revenue: 0,
          };
        }
        dishStats[dishId].count += item.quantity;
        dishStats[dishId].revenue += item.price * item.quantity;
      });
    });

    const sorted = Object.values(dishStats)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return sorted;
  }

  async getOrderStatusBreakdown() {
    const statusCounts = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusMap = {
      pending: 0,
      confirmed: 0,
      preparing: 0,
      ready: 0,
      delivered: 0,
      cancelled: 0,
    };

    statusCounts.forEach((item) => {
      if (statusMap.hasOwnProperty(item._id)) {
        statusMap[item._id] = item.count;
      }
    });

    return statusMap;
  }

  async getMonthlyStats() {
    const today = new Date();
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const monthlyOrders = await Order.find({
      createdAt: { $gte: thisMonthStart, $lte: thisMonthEnd },
      status: { $ne: "cancelled" },
    });

    const totalRevenue = monthlyOrders.reduce(
      (sum, o) => sum + o.totalAmount,
      0,
    );
    const avgOrderValue =
      monthlyOrders.length > 0 ? totalRevenue / monthlyOrders.length : 0;

    return {
      totalOrders: monthlyOrders.length,
      totalRevenue,
      avgOrderValue: Math.round(avgOrderValue * 100) / 100,
      month: thisMonthStart.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    };
  }
}

module.exports = new AnalyticsService();
