const Review = require("../models/review.js");

class ReviewService {
  async createReview(reviewData) {
    const review = await Review.create(reviewData);
    return await review
      .populate("userId", "fName lName email")
      .populate("dishId", "name");
  }

  async getAllReviews(filters = {}) {
    const { isApproved, page = 1, limit = 10 } = filters;

    let query = {};
    if (isApproved !== undefined) query.isApproved = isApproved;

    const skip = (page - 1) * limit;
    const reviews = await Review.find(query)
      .populate("userId", "fName lName email")
      .populate("dishId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments(query);

    return {
      reviews,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getReviewById(id) {
    return await Review.findById(id).populate("userId").populate("dishId");
  }

  async getReviewsByDish(dishId) {
    return await Review.find({ dishId, isApproved: true })
      .populate("userId", "fName lName")
      .sort({ createdAt: -1 });
  }

  async approveReview(id) {
    return await Review.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true },
    )
      .populate("userId")
      .populate("dishId");
  }

  async rejectReview(id) {
    return await Review.findByIdAndDelete(id);
  }

  async deleteReview(id) {
    return await Review.findByIdAndDelete(id);
  }

  async getReviewStats() {
    const allReviews = await Review.find();

    const ratingCounts = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    let totalRating = 0;

    allReviews.forEach((review) => {
      ratingCounts[review.rating]++;
      totalRating += review.rating;
    });

    const avgRating =
      allReviews.length > 0 ? (totalRating / allReviews.length).toFixed(1) : 0;

    return {
      totalReviews: allReviews.length,
      approvedReviews: await Review.countDocuments({ isApproved: true }),
      pendingReviews: await Review.countDocuments({ isApproved: false }),
      avgRating,
      ratingDistribution: ratingCounts,
    };
  }
}

module.exports = new ReviewService();
