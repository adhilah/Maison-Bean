// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const storedUser = localStorage.getItem("user");
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   // FIXED: Use user?.id to prevent infinite loop
//   useEffect(() => {
//     if (!user) {
//       setWishlist([]);
//       return;
//     }

//     axios
//       .get(`http://localhost:3000/users/${user.id}`)
//       .then((res) => {
//         setWishlist(res.data.wishlist || []);
//       })
//       .catch(() => {
//         toast.error("Failed to load wishlist");
//         setWishlist([]);
//       });
//   }, [user?.id]); // ← Critical fix

//   const toggleWishlist = async (product) => {
//     if (!user) {
//       toast.error("Please login to manage wishlist");
//       return;
//     }

//     const isInWishlist = wishlist.some((item) => item.id === product.id);
//     let updatedWishlist;

//     if (isInWishlist) {
//       updatedWishlist = wishlist.filter((item) => item.id !== product.id);
//       toast.success(`${product.name} removed from wishlist`);
//     } else {
//       updatedWishlist = [...wishlist, product];
//       toast.success(`${product.name} added to wishlist`);
//     }

//     try {
//       await axios.patch(`http://localhost:3000/users/${user.id}`, {
//         wishlist: updatedWishlist,
//       });
//       setWishlist(updatedWishlist);
//     } catch (err) {
//       toast.error("Failed to update wishlist");
//     }
//   };

//   const isWishlisted = (product) => {
//     return wishlist.some((item) => item.id === product.id);
//   };

//   const wishlistCount = wishlist.length;

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist,
//         wishlistCount,
//         toggleWishlist,
//         isWishlisted,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);





import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);

  // Load userId once on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserId(parsed.id || null);
      } catch (e) {
        setUserId(null);
      }
    }
  }, []);

  // Load wishlist when userId changes
  useEffect(() => {
    if (!userId) {
      setWishlist([]);
      return;
    }

    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        setWishlist(res.data.wishlist || []);
      })
      .catch((err) => {
        console.error("Failed to load wishlist:", err);
        toast.error("Failed to load wishlist");
        setWishlist([]);
      });
  }, [userId]);

  const toggleWishlist = async (product) => {
    if (!userId) {
      toast.error("Please login to manage wishlist");
      return;
    }

    const exists = wishlist.some((item) => item.id === product.id);
    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      updatedWishlist = [...wishlist, product];
      toast.success(`${product.name} added to wishlist`);
    }

    try {
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        wishlist: updatedWishlist,
      });
      setWishlist(updatedWishlist);
    } catch (err) {
      toast.error("Failed to update wishlist");
    }
  };

  const isWishlisted = (product) => {
    return wishlist.some((item) => item.id === product.id);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        toggleWishlist,
        isWishlisted,
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