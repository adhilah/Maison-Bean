import api from "./api";

// ======================================
// PUBLIC BEANS
// ======================================

export const getBeanTypes =
  async () => {

    const response =
      await api.get(
        "/beantypes"
      );

    return response.data;
};

// ======================================
// ADMIN BEANS
// ======================================

// CREATE

export const createBeanType =
  async (payload) => {

    const response =
      await api.post(
        "/beantypes/bean/ad",
        payload
      );

    return response.data;
};

// UPDATE

export const updateBeanType =
  async (id, payload) => {

    const response =
      await api.put(
        `/beantypes/${id}/update/ad`,
        payload
      );

    return response.data;
};

// BLOCK / UNBLOCK

export const toggleBeanType =
  async (id) => {

    const response =
      await api.patch(
        `/beantypes/${id}/block/ad`
      );

    return response.data;
};

// DELETE

export const deleteBeanType =
  async (id) => {

    const response =
      await api.delete(
        `/beantypes/${id}/ad`
      );

    return response.data;
};