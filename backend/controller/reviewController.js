const reviewService = require("../services/ReviewService.js");

exports.createReview = async (req, res) => {
  try {
    const { userId, dishId, rating, comment } = req.body;

    if (!userId || !dishId || !rating || !comment) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const review = await reviewService.createReview({
      userId,
      dishId,
      rating,
      comment,
    });

    return res
      .status(201)
      .json({ message: "Review submitted successfully", data: review });
  } catch (error) {
    console.error("Error in createReview:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const { isApproved, page, limit } = req.query;

    const filters = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    };

    if (isApproved !== undefined) filters.isApproved = isApproved === "true";

    const result = await reviewService.getAllReviews(filters);
    return res.status(200).json({ message: "ok", data: result });
  } catch (error) {
    console.error("Error in getAllReviews:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await reviewService.getReviewById(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json({ message: "ok", data: review });
  } catch (error) {
    console.error("Error in getReviewById:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getReviewsByDish = async (req, res) => {
  try {
    const { dishId } = req.params;
    const reviews = await reviewService.getReviewsByDish(dishId);
    return res.status(200).json({ message: "ok", data: reviews });
  } catch (error) {
    console.error("Error in getReviewsByDish:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.approveReview = async (req, res) => {
  try {
    const { id } = req.params;
    const approvedReview = await reviewService.approveReview(id);

    if (!approvedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res
      .status(200)
      .json({ message: "Review approved successfully", data: approvedReview });
  } catch (error) {
    console.error("Error in approveReview:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.rejectReview = async (req, res) => {
  try {
    const { id } = req.params;
    await reviewService.rejectReview(id);
    return res.status(200).json({ message: "Review rejected successfully" });
  } catch (error) {
    console.error("Error in rejectReview:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await reviewService.deleteReview(id);
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error in deleteReview:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getReviewStats = async (req, res) => {
  try {
    const stats = await reviewService.getReviewStats();
    return res.status(200).json({ message: "ok", data: stats });
  } catch (error) {
    console.error("Error in getReviewStats:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
