
// import { createContext, useContext, useState } from "react";

// const WishlistContext = createContext(null);

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState({});
  

//   const toggleWishlist = (product) => {
//     setWishlist((prev) => {
//       const updated = { ...prev };

//       if (updated[product.id]) {
//         delete updated[product.id];
//       } else {
//         updated[product.id] = product;
//       }

//       return updated;
//     });
//   };

//   const isWishlisted = (id) => Boolean(wishlist[id]);

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, toggleWishlist, isWishlisted }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);






import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const WishlistContext = createContext(null);
const API = "http://localhost:3000/wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // FETCH wishlist from db.json
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(API);
        setWishlist(res.data);
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      }
    };
    fetchWishlist();
  }, []);

  const isWishlisted = (id) =>
    wishlist.some((item) => item.id === id);

  const wishlistCount = wishlist.length;

  // ADD / REMOVE wishlist item
  const toggleWishlist = async (product) => {
    try {
      const existing = wishlist.find((item) => item.id === product.id);

      if (existing) {
        // REMOVE
        await axios.delete(`${API}/${existing.id}`);
        setWishlist((prev) =>
          prev.filter((item) => item.id !== product.id)
        );
      } else {
        // ADD
        const res = await axios.post(API, product);
        setWishlist((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error("Wishlist update failed", err);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Remove failed", err);
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

export const useWishlist = () => useContext(WishlistContext);

