import { reviews } from "../utils/axios";

export const createReview = async (reviewData) => {
  const res = await reviews.post("/", reviewData);
  return res.data.data;
};

export const getAllReviews = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.isApproved !== undefined)
    params.append("isApproved", filters.isApproved);
  if (filters.page) params.append("page", filters.page);
  if (filters.limit) params.append("limit", filters.limit);

  const res = await reviews.get(`/?${params.toString()}`);
  return res.data.data;
};

export const getReviewById = async (id) => {
  const res = await reviews.get(`/${id}`);
  return res.data.data;
};

export const getReviewsByDish = async (dishId) => {
  const res = await reviews.get(`/dish/${dishId}`);
  return res.data.data;
};

export const approveReview = async (id) => {
  const res = await reviews.put(`/${id}/approve`, {});
  return res.data.data;
};

export const rejectReview = async (id) => {
  const res = await reviews.delete(`/${id}/reject`);
  return res.data;
};

export const deleteReview = async (id) => {
  const res = await reviews.delete(`/${id}`);
  return res.data;
};

export const getReviewStats = async () => {
  const res = await reviews.get("/stats");
  return res.data.data;
};
