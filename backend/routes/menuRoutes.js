const express = require("express");
const { addMenu, getMenu } = require("../controller/menuController");

const router = express.Router();

router.post("/", addMenu);
router.get("/", getMenu);

module.exports = router;
