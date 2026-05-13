import api from "./api";

// ======================================
// PUBLIC PRODUCTS
// ======================================

export const getProducts = async () => {
  const response =
    await api.get("/products");

  return response.data;
};

export const getProductById = async (id) => {
  const response =
    await api.get(`/products/${id}`);

  return response.data;
};

export const getProductsByCategory =
  async (category) => {

    const response =
      await api.get(
        `/products/category/${category}`
      );

    return response.data;
};

export const searchProducts =
  async (term) => {

    const response =
      await api.get(
        `/products/search?term=${term}`
      );

    return response.data;
};

// ======================================
// ADMIN PRODUCTS
// ======================================

export const getAllProductsForAdmin =
  async () => {

    const response =
      await api.get(
        "/products/admin/all"
      );

    return response.data;
};

// CREATE PRODUCT

export const createProduct =
  async (payload) => {

    const response =
      await api.post(
        "/products/product/ad",
        payload
      );

    return response.data;
};

// UPDATE PRODUCT

export const updateProduct =
  async (id, payload) => {

    const response =
      await api.put(
        `/products/${id}update/ad`,
        payload
      );

    return response.data;
};

// BLOCK / UNBLOCK PRODUCT

export const toggleProduct =
  async (id) => {

    const response =
      await api.patch(
        `/products/${id}/block/ad`
      );

    return response.data;
};

// DELETE PRODUCT

export const deleteProduct =
  async (id) => {

    const response =
      await api.delete(
        `/products/${id}/ad`
      );

    return response.data;
};