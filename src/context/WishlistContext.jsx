import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);

  
  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setUserId(parsed.id);
    } catch {
      setUserId(null);
    }
  }, []);

  // Load wishlist
  useEffect(() => {
    if (!userId) {
      setWishlist([]);
      return;
    }

    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => setWishlist(res.data.wishlist || []))
      .catch(() => toast.error("Failed to load wishlist"));
  }, [userId]);

  // Toggle wishlist
  const toggleWishlist = async (product) => {
    if (!userId) {
      toast.error("Please login to manage wishlist");
      return;
    }

    const exists = wishlist.some((item) => String(item.id) === String(product.id));
    const updatedWishlist = exists
      ? wishlist.filter((item) => String(item.id) !== String(product.id))
      : [...wishlist, product];

    try {
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        wishlist: updatedWishlist,
      });
      setWishlist(updatedWishlist);
      toast.success(exists
          ? `${product.name} removed from wishlist`
          : `${product.name} added to wishlist`
      );
    } catch {
      toast.error("Failed to update wishlist");
    }
  };

  const isWishlisted = (product) =>
    wishlist.some((item) => String(item.id) === String(product.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
