import api from "./api";

export const getCart = () =>
  api.get("/cart");

export const addToCart = (data) =>
  api.post("/cart", data);

export const updateCart = (id, data) =>
  api.patch(`/cart/${id}`, data);

export const removeCartItem = (id) =>
  api.delete(`/cart/${id}`);

export const clearCart = () =>
  api.delete("/cart/clear");