import axios from "axios";

const BACKEND_URL = (
  import.meta.env.BACKEND_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const menu = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/menu`,
});

export const categories = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/categories`,
});

export const orders = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/orders`,
});

export const reviews = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/reviews`,
});

export const customers = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/customers`,
});

export const settings = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/settings`,
});

export const dashboard = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
});

export const auth = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/user`,
});
