const express = require("express");
const {
  getSettings,
  updateSettings,
  updateRestaurantInfo,
  updateOperatingHours,
  updateOrderSettings,
  updateNotifications,
  updateLogo,
} = require("../controller/settingsController");

const router = express.Router();

router.get("/", getSettings);
router.put("/", updateSettings);
router.put("/restaurant-info", updateRestaurantInfo);
router.put("/operating-hours", updateOperatingHours);
router.put("/order-settings", updateOrderSettings);
router.put("/notifications", updateNotifications);
router.put("/logo", updateLogo);

module.exports = router;
