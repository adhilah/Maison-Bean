import { createContext, useContext, useState } from "react";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({});
  

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const updated = { ...prev };

      if (updated[product.id]) {
        delete updated[product.id];
      } else {
        updated[product.id] = product;
      }

      return updated;
    });
  };

  const isWishlisted = (id) => Boolean(wishlist[id]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
