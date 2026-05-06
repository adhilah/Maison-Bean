import api from "./api";

export const createPaymentOrder = (orderId) =>
  api.post(`/payment/create/${orderId}`);

export const verifyPayment = (data) =>
  api.post("/payment/verify", data);