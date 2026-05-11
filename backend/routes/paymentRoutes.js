const express = require("express");
const { checkout } = require("../controller/paymentController.js");
const { requireAuth } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/", requireAuth, checkout);
module.exports = router;
