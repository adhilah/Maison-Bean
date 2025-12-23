import { useState } from "react";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  const isWishlisted = (id) =>
    wishlist.some((item) => item.id === id);

  return { wishlist, toggleWishlist, isWishlisted };
};