import api from "./api";

/* =========================================
   PUBLIC
========================================= */

export const getMilkOptions = async () => {
  const response = await api.get("/milkoptions");
  return response.data;
};

export const getAllMilkOptionsAdmin = async () => {
  const response = await api.get("/milkoptions/all/ad");
  return response.data;
};

export const getMilkOptionById = async (id) => {
  const response = await api.get(`/milkoptions/${id}`);
  return response.data;
};

/* =========================================
   ADMIN
========================================= */

export const createMilkOption = async (payload) => {
  const response = await api.post(
    "/milkoptions/milk/ad",
    payload
  );

  return response.data;
};

export const updateMilkOption = async (id, payload) => {
  const response = await api.put(
    `/milkoptions/${id}/ad`,
    payload
  );

  return response.data;
};

export const toggleMilkOption = async (id) => {
  const response = await api.patch(
    `/milkoptions/${id}/block/ad`
  );

  return response.data;
};

export const deleteMilkOption = async (id) => {
  const response = await api.delete(
    `/milkoptions/${id}/ad`
  );

  return response.data;
};