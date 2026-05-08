// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import api from "../services/api";
// import toast from "react-hot-toast";
// import { useAuth } from "./AuthContext";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
   
//     if (!user?.id || user.role === "admin") {
//       setWishlist([]);
//       return;
//     }

//     axios
//       .get(`https://localhost:7257/api/user/${user.id}`)
//       .then((res) => setWishlist(res.data.wishlist || []))
//       .catch(() => {
//         toast.error("Failed to load wishlist");
//         setWishlist([]);
//       });
//   }, [user]);

//   const toggleWishlist = async (product) => {
//     if (!user?.id || user.role === "admin") {
//       toast.error("Please login to manage wishlist");
//       return;
//     }

//     const exists = wishlist.some(
//       (item) => String(item.id) === String(product.id)
//     );

//     const updatedWishlist = exists
//       ? wishlist.filter((item) => String(item.id) !== String(product.id))
//       : [...wishlist, product];

//     try {
//       await axios.patch(`https://localhost:7257/api/user/${user.id}`, {
//         wishlist: updatedWishlist,
//       });
//       setWishlist(updatedWishlist);
//       toast.success(
//         exists
//           ? `${product.name} removed from wishlist`
//           : `${product.name} added to wishlist`
//       );
//     } catch {
//       toast.error("Failed to update wishlist");
//     }
//   };

//   const isWishlisted = (product) =>
//     wishlist.some((item) => String(item.id) === String(product.id));

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist,
//         wishlistCount: wishlist.length,
//         toggleWishlist,
//         isWishlisted,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);




//======================================================



import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // LOAD WISHLIST
  useEffect(() => {

    const fetchWishlist = async () => {

      if (!user || user.role === "admin") {
        setWishlist([]);
        return;
      }

      try {

        setLoading(true);

        const res = await api.get("/wishlist");

        setWishlist(res.data || []);

      } catch (err) {

        console.error(err);

        setWishlist([]);

      } finally {

        setLoading(false);
      }
    };

    fetchWishlist();

  }, [user]);

  // TOGGLE
  const toggleWishlist = async (product) => {

    if (!user || user.role === "admin") {
      toast.error("Please login first");
      return;
    }

    try {

      const res = await api.post(
        "/wishlist/toggle",
        {
          productId: product.id
        }
      );

      const exists = wishlist.some(
        (item) =>
          String(item.productId || item.id)
          === String(product.id)
      );

      if (exists) {

        setWishlist((prev) =>
          prev.filter(
            (item) =>
              String(item.productId || item.id)
              !== String(product.id)
          )
        );

        toast.success(
          `${product.name} removed from wishlist`
        );

      } else {

        setWishlist((prev) => [
          ...prev,
          {
            ...product,
            productId: product.id
          }
        ]);

        toast.success(
          `${product.name} added to wishlist`
        );
      }

    } catch (err) {

      console.error(err);

      toast.error("Failed to update wishlist");
    }
  };

  // REMOVE
  const removeWishlistItem = async (wishlistId) => {

    try {

      await api.delete(
        `/wishlist/remove/${wishlistId}`
      );

      setWishlist((prev) =>
        prev.filter(
          (item) =>
            item.wishlistId !== wishlistId
        )
      );

    } catch (err) {

      console.error(err);

      toast.error("Failed to remove item");
    }
  };

  // CLEAR
  const clearWishlist = async () => {

    try {

      await api.delete("/wishlist/clear");

      setWishlist([]);

      toast.success("Wishlist cleared");

    } catch (err) {

      console.error(err);

      toast.error("Failed to clear wishlist");
    }
  };

  // CHECK
  const isWishlisted = (product) => {

    return wishlist.some(
      (item) =>
        String(item.productId || item.id)
        === String(product.id)
    );
  };

  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
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

export const useWishlist = () =>
  useContext(WishlistContext);