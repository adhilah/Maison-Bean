// import api from "./api";

// export const placeOrder = (data) =>
//   api.post("/order", data);

// export const getOrders = () =>
//   api.get("/order");

// export const cancelOrder = (id) =>
//   api.patch(`/order/${id}/cancel`);

// export const getAllOrders = () =>
//   api.get("/order/all/ad");




//===========================================


import api from "./api";

// ======================================
// CUSTOMER ORDERS
// ======================================

// PLACE CART ORDER

export const placeOrder =
  async (payload) => {

    const response =
      await api.post(
        "/order",
        payload
      );

    return response.data;
};

// PLACE SINGLE PRODUCT ORDER

export const placeSingleOrder =
  async (payload) => {

    const response =
      await api.post(
        "/order/single",
        payload
      );

    return response.data;
};

// GET LOGGED IN USER ORDERS

export const getOrders =
  async () => {

    const response =
      await api.get(
        "/order"
      );

    return response.data;
};

// CANCEL ORDER

export const cancelOrder =
  async (id) => {

    const response =
      await api.patch(
        `/order/${id}/cancel`
      );

    return response.data;
};

// DELETE ORDER

export const deleteOrder =
  async (id) => {

    const response =
      await api.delete(
        `/order/${id}`
      );

    return response.data;
};

// ======================================
// ADMIN ORDERS
// ======================================

// GET ALL ORDERS

export const getAllOrders =
  async () => {

    const response =
      await api.get(
        "/order/all/ad"
      );

    return response.data;
};

// UPDATE ORDER STATUS

export const updateOrderStatus =
  async (id, newStatus) => {

    const response =
      await api.patch(
        `/order/${id}/status/ad?newStatus=${newStatus}`
      );

    return response.data;
};