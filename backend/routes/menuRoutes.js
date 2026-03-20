const express = require("express");
const {
  addMenu,
  getMenu,
  deleteMenu,
  updateMenu,
} = require("../controller/menuController");

// backend/routes/menuRoutes.js
const { upload } = require("../config/multer");
const router = express.Router();

router.post("/", upload.single("image"), addMenu);
router.get("/", getMenu);
router.delete("/:id", deleteMenu);
router.put("/:id", updateMenu);

module.exports = router;
