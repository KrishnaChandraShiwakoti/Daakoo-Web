import { checkout } from "../utils/axios";

export const CheckoutAPI = async (payload, token) => {
  const res = await checkout.post("/", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
