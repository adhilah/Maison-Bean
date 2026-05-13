import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import api from "../services/api";

import { useAuth }
from "./AuthContext";

const WishlistContext =
  createContext();

export const WishlistProvider =
({ children }) => {

  const {
  user,
  isLoading
} = useAuth();

  const [wishlist, setWishlist] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // LOAD WISHLIST
  // ==========================================
useEffect(() => {

  // WAIT FOR AUTH

  if (isLoading) return;

  // NO USER

  if (!user) {

    setWishlist([]);

    return;
  }

  // BLOCK ADMIN

  if (
    user?.role?.toUpperCase()
    === "ADMIN"
  ) {

    setWishlist([]);

    return;
  }

  const fetchWishlist =
    async () => {

      try {

        setLoading(true);

        const res =
          await api.get(
            "/wishlist"
          );

        setWishlist(
          res.data || []
        );

      } catch (err) {

        console.error(err);

        setWishlist([]);

      } finally {

        setLoading(false);
      }
    };

  fetchWishlist();

}, [user, isLoading]);

  // ==========================================
  // TOGGLE WISHLIST
  // ==========================================

  const toggleWishlist =
    async (product) => {

      // BLOCK ADMIN

      if (
        !user ||
        user?.role
          ?.toUpperCase() === "ADMIN"
      ) {

        toast.error(
          "Please login as customer"
        );

        return;
      }

      try {

        await api.post(
          "/wishlist/toggle",
          {
            productId:
              product.id
          }
        );

        const exists =
          wishlist.some(
            (item) =>
              String(
                item.productId ||
                item.id
              ) ===
              String(product.id)
          );

        // REMOVE

        if (exists) {

          setWishlist((prev) =>
            prev.filter(
              (item) =>
                String(
                  item.productId ||
                  item.id
                ) !==
                String(product.id)
            )
          );

          toast.success(
            `${product.name} removed from wishlist`
          );

        }

        // ADD

        else {

          setWishlist((prev) => [

            ...prev,

            {
              ...product,

              productId:
                product.id
            }
          ]);

          toast.success(
            `${product.name} added to wishlist`
          );
        }

      } catch (err) {

        console.error(err);

        toast.error(
          "Failed to update wishlist"
        );
      }
    };

  // ==========================================
  // REMOVE ITEM
  // ==========================================

  const removeWishlistItem =
    async (wishlistId) => {

      // BLOCK ADMIN

      if (
        !user ||
        user?.role
          ?.toUpperCase() === "ADMIN"
      ) {
        return;
      }

      try {

        await api.delete(
          `/wishlist/remove/${wishlistId}`
        );

        setWishlist((prev) =>
          prev.filter(
            (item) =>
              item.wishlistId !==
              wishlistId
          )
        );

        toast.success(
          "Item removed"
        );

      } catch (err) {

        console.error(err);

        toast.error(
          "Failed to remove item"
        );
      }
    };

  // ==========================================
  // CLEAR WISHLIST
  // ==========================================

  const clearWishlist =
    async () => {

      // BLOCK ADMIN

      if (
        !user ||
        user?.role
          ?.toUpperCase() === "ADMIN"
      ) {
        return;
      }

      try {

        await api.delete(
          "/wishlist/clear"
        );

        setWishlist([]);

        toast.success(
          "Wishlist cleared"
        );

      } catch (err) {

        console.error(err);

        toast.error(
          "Failed to clear wishlist"
        );
      }
    };

  // ==========================================
  // CHECK WISHLIST
  // ==========================================

  const isWishlisted =
    (product) => {

      return wishlist.some(
        (item) =>
          String(
            item.productId ||
            item.id
          ) ===
          String(product.id)
      );
    };

  return (

    <WishlistContext.Provider
      value={{

        wishlist,

        wishlistCount:
          wishlist.length,

        toggleWishlist,

        removeWishlistItem,

        clearWishlist,

        isWishlisted,

        loading
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist =
  () => useContext(
    WishlistContext
  );