import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:3000/users/${user.id}`)
      .then((res) => {
        setWishlist(res.data.wishlist || []);
      });
  }, [user]);

  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error("Please login to use wishlist");
      return;
    }

    const exists = wishlist.some(
      (w) => w.productId === product.id);

    const updatedWishlist = exists
      ? wishlist.filter((w) => w.productId !== product.id)
      : [...wishlist, { productId: product.id,
        product: product  }];

    await axios.patch(
      `http://localhost:3000/users/${user.id}`,
      { wishlist: updatedWishlist }
    );

    setWishlist(updatedWishlist);

    toast.success(
      exists ? "Removed from wishlist" : "Added to wishlist"
    );
  };

  const isWishlisted = (product) =>
    wishlist.some((w) => w.productId === product.id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
