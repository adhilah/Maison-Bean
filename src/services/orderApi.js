import api from "./api";

export const placeOrder = (data) =>
  api.post("/order", data);

export const getOrders = () =>
  api.get("/order");

export const cancelOrder = (id) =>
  api.patch(`/order/${id}/cancel`);

export const getAllOrders = () =>
  api.get("/order/all/ad");