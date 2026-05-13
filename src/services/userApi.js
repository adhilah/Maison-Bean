import api from "./api";

// ======================================
// PROFILE
// ======================================

export const getProfile =
  async () => {

    const response =
      await api.get(
        "/user/me"
      );

    return response.data;
};

// ======================================
// PASSWORD
// ======================================

export const changePassword =
  async (payload) => {

    const response =
      await api.post(
        "/user/change-password",
        payload
      );

    return response.data;
};

export const forgotPassword =
  async (payload) => {

    const response =
      await api.post(
        "/user/forgot-password",
        payload
      );

    return response.data;
};

// ======================================
// ADMIN USERS
// ======================================

export const getAllUsers =
  async () => {

    const response =
      await api.get(
        "/user/customers/ad"
      );

    return response.data;
};

export const toggleUser =
  async (id) => {

    const response =
      await api.patch(
        `/user/${id}/block/ad`
      );

    return response.data;
};

export const deleteUser =
  async (id) => {

    const response =
      await api.delete(
        `/user/${id}delete/ad`
      );

    return response.data;
};