const express = require("express");
const {
  createOrUpdateCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerByUserId,
  searchCustomers,
  getTopCustomers,
  getCustomerStats,
} = require("../controller/customerController");

const router = express.Router();

router.post("/", createOrUpdateCustomer);
router.get("/", getAllCustomers);
router.get("/search", searchCustomers);
router.get("/top", getTopCustomers);
router.get("/stats", getCustomerStats);
router.get("/:id", getCustomerById);
router.get("/user/:userId", getCustomerByUserId);

module.exports = router;
