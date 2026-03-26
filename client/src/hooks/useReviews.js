import { useState, useCallback } from "react";
import * as ReviewAPI from "../API/Reviews";

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [stats, setStats] = useState(null);

  const fetchReviews = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const result = await ReviewAPI.getAllReviews(filters);
      setReviews(result.reviews || []);
      setPagination(result.pagination || {});
    } catch (err) {
      setError(err.message);
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createReview = useCallback(
    async (reviewData) => {
      try {
        setLoading(true);
        setError(null);
        const newReview = await ReviewAPI.createReview(reviewData);
        setReviews([newReview, ...reviews]);
        return newReview;
      } catch (err) {
        setError(err.message);
        console.error("Error creating review:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [reviews],
  );

  const approveReview = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);
        const approvedReview = await ReviewAPI.approveReview(id);
        setReviews(reviews.map((r) => (r._id === id ? approvedReview : r)));
        return approvedReview;
      } catch (err) {
        setError(err.message);
        console.error("Error approving review:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [reviews],
  );

  const rejectReview = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);
        await ReviewAPI.rejectReview(id);
        setReviews(reviews.filter((r) => r._id !== id));
      } catch (err) {
        setError(err.message);
        console.error("Error rejecting review:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [reviews],
  );

  const deleteReview = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);
        await ReviewAPI.deleteReview(id);
        setReviews(reviews.filter((r) => r._id !== id));
      } catch (err) {
        setError(err.message);
        console.error("Error deleting review:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [reviews],
  );

  const fetchReviewStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const statsData = await ReviewAPI.getReviewStats();
      setStats(statsData);
      return statsData;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching review stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    reviews,
    loading,
    error,
    pagination,
    stats,
    fetchReviews,
    createReview,
    approveReview,
    rejectReview,
    deleteReview,
    fetchReviewStats,
  };
};
