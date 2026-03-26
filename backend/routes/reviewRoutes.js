const express = require("express");
const {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsByDish,
  approveReview,
  rejectReview,
  deleteReview,
  getReviewStats,
} = require("../controller/reviewController");

const router = express.Router();

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/stats", getReviewStats);
router.get("/:id", getReviewById);
router.get("/dish/:dishId", getReviewsByDish);
router.put("/:id/approve", approveReview);
router.delete("/:id/reject", rejectReview);
router.delete("/:id", deleteReview);

module.exports = router;
