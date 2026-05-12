import api from "./api";

/* ================= BEANS ================= */

export const getBeanTypes = async () => {
  const response =
    await api.get("/beanTypes");

  return response.data;
};

/* ================= MILK ================= */

export const getMilkOptions = async () => {
  const response =
    await api.get("/milkOptions");

  return response.data;
};