import api from "./api";

export const createPayment = async (
  orderId
) => {

  return await api.post(`/api/payment/create/${orderId}`);
};

export const verifyPayment = async (
  data
) => {

  return await api.post(
    "/api/payment/verify",
    data
  );
};