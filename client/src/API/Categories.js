import { categories } from "../utils/axios";

export const getAllCategories = async () => {
  const res = await categories.get("/");
  return res.data.data;
};

export const getCategoryById = async (id) => {
  const res = await categories.get(`/${id}`);
  return res.data.data;
};

export const createCategory = async (name) => {
  const res = await categories.post("/", { name });
  return res.data.data;
};

export const updateCategory = async (id, name) => {
  const res = await categories.put(`/${id}`, { name });
  return res.data.data;
};

export const deleteCategory = async (id) => {
  const res = await categories.delete(`/${id}`);
  return res.data;
};
