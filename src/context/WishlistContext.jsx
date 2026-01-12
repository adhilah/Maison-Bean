import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
   
    if (!user?.id || user.role === "admin") {
      setWishlist([]);
      return;
    }

    axios
      .get(`http://localhost:3000/users/${user.id}`)
      .then((res) => setWishlist(res.data.wishlist || []))
      .catch(() => {
        toast.error("Failed to load wishlist");
        setWishlist([]);
      });
  }, [user]);

  const toggleWishlist = async (product) => {
    if (!user?.id || user.role === "admin") {
      toast.error("Please login to manage wishlist");
      return;
    }

    const exists = wishlist.some(
      (item) => String(item.id) === String(product.id)
    );

    const updatedWishlist = exists
      ? wishlist.filter((item) => String(item.id) !== String(product.id))
      : [...wishlist, product];

    try {
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        wishlist: updatedWishlist,
      });
      setWishlist(updatedWishlist);
      toast.success(
        exists
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