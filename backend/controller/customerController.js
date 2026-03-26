const customerService = require("../services/CustomerService.js");

exports.createOrUpdateCustomer = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, phone, address } = req.body;

    if (!userId || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const customer = await customerService.createOrUpdateCustomer(userId, {
      firstName,
      lastName,
      email,
      phone,
      address,
    });

    return res
      .status(200)
      .json({ message: "Customer saved successfully", data: customer });
  } catch (error) {
    console.error("Error in createOrUpdateCustomer:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const filters = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    };

    if (search) filters.search = search;

    const result = await customerService.getAllCustomers(filters);
    return res.status(200).json({ message: "ok", data: result });
  } catch (error) {
    console.error("Error in getAllCustomers:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await customerService.getCustomerById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "ok", data: customer });
  } catch (error) {
    console.error("Error in getCustomerById:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getCustomerByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const customer = await customerService.getCustomerByUserId(userId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "ok", data: customer });
  } catch (error) {
    console.error("Error in getCustomerByUserId:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.searchCustomers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const customers = await customerService.searchCustomers(query);
    return res.status(200).json({ message: "ok", data: customers });
  } catch (error) {
    console.error("Error in searchCustomers:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getTopCustomers = async (req, res) => {
  try {
    const { limit } = req.query;
    const customers = await customerService.getTopCustomers(
      parseInt(limit) || 10,
    );
    return res.status(200).json({ message: "ok", data: customers });
  } catch (error) {
    console.error("Error in getTopCustomers:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getCustomerStats = async (req, res) => {
  try {
    const stats = await customerService.getCustomerStats();
    return res.status(200).json({ message: "ok", data: stats });
  } catch (error) {
    console.error("Error in getCustomerStats:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
