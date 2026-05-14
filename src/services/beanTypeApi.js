import api from "./api";

/* =========================================
   PUBLIC
========================================= */

export const getBeanTypes = async () => {
  const response = await api.get("/beantypes");
  return response.data;
};

export const getAllBeanTypesAdmin = async () => {
  const response = await api.get("/beantypes/all/ad");
  return response.data;
};

export const getBeanTypeById = async (id) => {
  const response = await api.get(`/beantypes/${id}`);
  return response.data;
};

/* =========================================
   ADMIN
========================================= */

export const createBeanType = async (payload) => {
  const response = await api.post(
    "/beantypes/bean/ad",
    payload
  );

  return response.data;
};

export const updateBeanType = async (id, payload) => {
  const response = await api.put(
    `/beantypes/${id}/update/ad`,
    payload
  );

  return response.data;
};

export const toggleBeanType = async (id) => {
  const response = await api.patch(
    `/beantypes/${id}/block/ad`
  );

  return response.data;
};

export const deleteBeanType = async (id) => {
  const response = await api.delete(
    `/beantypes/${id}/ad`
  );

  return response.data;
};