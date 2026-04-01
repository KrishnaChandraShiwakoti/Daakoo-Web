import axios from "axios";

export const menu = axios.create({
  baseURL: "http://localhost:3000/api/v1/menu",
});

export const categories = axios.create({
  baseURL: "http://localhost:3000/api/v1/categories",
});

export const orders = axios.create({
  baseURL: "http://localhost:3000/api/v1/orders",
});

export const reviews = axios.create({
  baseURL: "http://localhost:3000/api/v1/reviews",
});

export const customers = axios.create({
  baseURL: "http://localhost:3000/api/v1/customers",
});

export const settings = axios.create({
  baseURL: "http://localhost:3000/api/v1/settings",
});

export const dashboard = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const auth = axios.create({
  baseURL: "http://localhost:3000/api/v1/user",
});
