const express = require("express");
const {
	signup,
	login,
	getProfile,
	updateProfile,
	changePassword,
} = require("../controller/userController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", requireAuth, getProfile);
router.put("/me", requireAuth, updateProfile);
router.put("/me/password", requireAuth, changePassword);

module.exports = router;
