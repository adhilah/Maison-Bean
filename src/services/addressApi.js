import api from "./api";

// ======================================
// GET USER ADDRESSES
// ======================================

export const getAddresses =
  async () => {

    const response =
      await api.get(
        "/address"
      );

    return response.data;
};

// ======================================
// ADD ADDRESS
// ======================================

export const addAddress =
  async (payload) => {

    const response =
      await api.post(
        "/address",
        payload
      );

    return response.data;
};

// ======================================
// UPDATE ADDRESS
// ======================================

export const updateAddress =
  async (id, payload) => {

    const response =
      await api.put(
        `/address/${id}`,
        payload
      );

    return response.data;
};

// ======================================
// DELETE ADDRESS
// ======================================

export const deleteAddress =
  async (id) => {

    const response =
      await api.delete(
        `/address/${id}`
      );

    return response.data;
};