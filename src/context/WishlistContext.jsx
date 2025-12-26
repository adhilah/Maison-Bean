// src/context/WishlistContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getLoggedInUser } from "../utils/auth";

const WishlistContext = createContext(null);
const API_URL = "http://localhost:3000/wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const user = getLoggedInUser();
  const userId = user?.id;

  // ===============================
  // LOAD WISHLIST (LOGIN / REFRESH)
  // ===============================
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        if (userId) {
          const res = await axios.get(`${API_URL}?userId=${userId}`);
          setWishlist(res.data || []);
          localStorage.setItem("wishlist", JSON.stringify(res.data || []));
        } else {
          const guestWishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];
          setWishlist(guestWishlist);
        }
      } catch (err) {
        console.error("Failed to load wishlist", err);
      }
    };

    loadWishlist();
  }, [userId]);

  // ===============================
  // TOGGLE WISHLIST
  // ===============================
  const toggleWishlist = async (product) => {
    // ---------- GUEST USER ----------
    if (!userId) {
      const guestWishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

      const exists = guestWishlist.find(
        (item) => item.productId === product.id
      );

      let updated;

      if (exists) {
        updated = guestWishlist.filter(
          (item) => item.productId !== product.id
        );
        toast.success("Removed from wishlist ❤️");
      } else {
        updated = [
          ...guestWishlist,
          {
            productId: product.id,
            product,
          },
        ];
        toast.success("Added to wishlist ❤️");
      }

      localStorage.setItem("wishlist", JSON.stringify(updated));
      setWishlist(updated);
      return;
    }

    // ---------- LOGGED-IN USER ----------
    try {
      const existing = wishlist.find(
        (item) => item.productId === product.id
      );

      if (existing) {
        await axios.delete(`${API_URL}/${existing.id}`);
        setWishlist((prev) =>
          prev.filter((item) => item.id !== existing.id)
        );
        toast.success("Removed from wishlist");
      } else {
        const newItem = {
          userId,
          productId: product.id,
          product,
        };

        const res = await axios.post(API_URL, newItem);
        setWishlist((prev) => [...prev, res.data]);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      console.error("Wishlist toggle failed", err);
      toast.error("Failed to update wishlist");
    }
  };

  // ===============================
  // HELPERS
  // ===============================
  const isWishlisted = (productId) =>
    wishlist.some((item) => item.productId === productId);

  const wishlistCount = wishlist.length;

  const removeFromWishlist = async (id) => {
    if (!userId) {
      const updated = wishlist.filter((item) => item.productId !== id);
      setWishlist(updated);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      toast.success("Removed from wishlist");
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      setWishlist((prev) => prev.filter((item) => item.id !== id));
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isWishlisted,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};
