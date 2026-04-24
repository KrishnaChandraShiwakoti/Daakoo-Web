const express = require("express");
const {
  signup,
  login,
  getProfile,
  updateProfile,
  changePassword,
  getPaymentMethods,
  addPaymentMethod,
} = require("../controller/userController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", requireAuth, getProfile);
router.put("/me", requireAuth, updateProfile);
router.put("/me/password", requireAuth, changePassword);
router.get("/me/payment-methods", requireAuth, getPaymentMethods);
router.post("/me/payment-methods", requireAuth, addPaymentMethod);

module.exports = router;
