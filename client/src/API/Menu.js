import { menu } from "../utils/axios";

export const getAllDishes = async () => {
  const res = await menu.get("/");
  return res.data.data;
};

export const deleteDish = async (id) => {
  const res = await menu.delete(`/${id}`);
  return res.data;
};

export const updateDish = async (id, data) => {
  const res = await menu.put(`/${id}`, data);
  return res.data;
};

export const createDish = async (data) => {
  const res = await menu.post("", data);
  return res.data;
};
