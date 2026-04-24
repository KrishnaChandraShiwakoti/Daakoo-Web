import { auth } from "../utils/axios";

export const registerUser = async (payload) => {
  const res = await auth.post("/signup", payload);
  return res.data;
};

export const loginUser = async (payload) => {
  const res = await auth.post("/login", payload);
  return res.data;
};

export const getMyProfile = async (token) => {
  const res = await auth.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateMyProfile = async (payload, token) => {
  const res = await auth.put("/me", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const changeMyPassword = async (payload, token) => {
  const res = await auth.put("/me/password", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getMyPaymentMethods = async (token) => {
  const res = await auth.get("/me/payment-methods", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const addMyPaymentMethod = async (payload, token) => {
  const res = await auth.post("/me/payment-methods", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
