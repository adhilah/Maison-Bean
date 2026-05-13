import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

function normalizeItem(item) {

  const isShapeB =
    item.product &&
    typeof item.product === "object" &&
    item.product.name;

  const productObj =
    isShapeB
      ? item.product
      : item;

  const bean =
    item.bean || null;

  const milk =
    item.milk || null;

  return {

    productId:
      productObj.id ||
      item.productId ||
      null,

    product: {

      id:
        productObj.id || null,

      name:
        productObj.name ||
        "Unknown Item",

      image:
        productObj.image ||
        "/placeholder.jpg",

      basePrice:
        Number(
          productObj.basePrice ??
          productObj.price ??
          0
        ),

      category:
        productObj.category || "",

      description:
        productObj.description || "",
    },

    bean,
    milk,

    beanId:
      bean?.id ||
      item.beanId ||
      null,

    milkId:
      milk?.id ||
      item.milkId ||
      null,

    isCustomized:
      !!item.isCustomized,

    strength:
      item.strength ?? null,

    temp:
      item.temp ?? null,

    sweetness:
      item.sweetness ?? null,
  };
}

export const CartProvider = ({
  children
}) => {

  const {
  user,
  isLoading
} = useAuth();

  const [cart, setCart] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // =====================================================
  // FETCH CART
  // =====================================================

  const fetchCart =
    useCallback(async () => {

      try {

        setLoading(true);

        const res =
          await api.get("/cart");

        setCart(
          res.data.items || []
        );

      } catch (err) {

        console.error(
          "Cart fetch failed",
          err
        );

        setCart([]);

      } finally {

        setLoading(false);
      }

    }, []);

  // =====================================================
  // LOAD CART
  // =====================================================

  useEffect(() => {

  // WAIT FOR AUTH

  if (isLoading) return;

  // NO USER

  if (!user) {

    setCart([]);

    return;
  }

  // BLOCK ADMIN

  if (
    user?.role?.toUpperCase()
    === "ADMIN"
  ) {

    setCart([]);

    return;
  }

  fetchCart();

}, [user, isLoading, fetchCart]);

  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart =
    useCallback(async (
      item
    ) => {

      // BLOCK ADMIN

      if (
        !user ||
        user?.role?.toUpperCase()
          === "ADMIN"
      ) {

        toast.error(
          "Please login as customer"
        );

        return;
      }

      const norm =
        normalizeItem(item);

      try {

        await api.post(
          "/cart",
          {

            productId:
              norm.productId,

            quantity: 1,

            isCustomized:
              norm.isCustomized,

            beanId:
              norm.beanId,

            milkId:
              norm.milkId,

            strength:
              norm.strength,

            temp:
              norm.temp,

            sweetness:
              norm.sweetness,
          }
        );

        await fetchCart();

        toast.success(
          `${norm.product.name} added to cart`
        );

      } catch (err) {

        console.error(err);

        toast.error(
          "Failed to add to cart"
        );
      }

    }, [user, fetchCart]);

  // =====================================================
  // UPDATE QUANTITY
  // =====================================================

  const updateQuantity =
    useCallback(async (
      cartId,
      newQty
    ) => {

      if (newQty < 1)
        return;

      try {

        await api.patch(
          "/cart",
          {
            cartItemId:
              cartId,

            quantity:
              newQty
          }
        );

        await fetchCart();

      } catch (err) {

        console.error(err);

        toast.error(
          "Failed to update quantity"
        );
      }

    }, [fetchCart]);

  // =====================================================
  // REMOVE ITEM
  // =====================================================

  const removeFromCart =
    useCallback(async (
      cartId
    ) => {

      try {

        await api.delete(
          `/cart/${cartId}`
        );

        await fetchCart();

        toast.success(
          "Item removed"
        );

      } catch (err) {

        console.error(err);

        toast.error(
          "Failed to remove item"
        );
      }

    }, [fetchCart]);

  // =====================================================
  // CLEAR CART
  // =====================================================

  const clearCart =
    useCallback(async () => {

      try {

        await api.delete(
          "/cart/clear"
        );

        setCart([]);

      } catch (err) {

        console.error(err);

        toast.error(
          "Failed to clear cart"
        );
      }

    }, []);

  // =====================================================
  // TOTAL QUANTITY
  // =====================================================

  const cartQuantity =
    useMemo(() => {

      return cart.reduce(
        (total, item) =>
          total +
          item.quantity,
        0
      );

    }, [cart]);

  // =====================================================
  // CONTEXT VALUE
  // =====================================================

  const value =
    useMemo(() => ({

      cart,

      cartQuantity,

      addToCart,

      updateQuantity,

      removeFromCart,

      clearCart,

      loading

    }), [

      cart,

      cartQuantity,

      addToCart,

      updateQuantity,

      removeFromCart,

      clearCart,

      loading
    ]);

  return (

    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);