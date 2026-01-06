// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [userId, setUserId] = useState(null);

  
//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         setUserId(parsed.id || null);
//       } catch (e) {
//         setUserId(null);
//       }
//     }
//   }, []);


//   useEffect(() => {
//     if (!userId) {
//       setCart([]);
//       return;
//     }

//     axios
//       .get(`http://localhost:3000/users/${userId}`)
//       .then((res) => {
//         setCart(res.data.cart || []);
//       })
//       .catch((err) => {
//         console.error("Failed to load cart:", err);
//         toast.error("Failed to load cart");
//         setCart([]);
//       });
//   }, [userId]);

//   const addToCart = async (item) => {
//     if (!userId) {
//       toast.error("Please login to add items");
//       return;
//     }

//     const cartItem = {
//       id: Date.now().toString(),
//       productId: item.id,
//       product: item,
//       quantity: 1,
//       isCustomized: item.isCustomized || false,
//       beanId: item.beanId || null,
//       milkId: item.milkId || null,
//     };

//     const updatedCart = [...cart, cartItem];

//     try {
//       await axios.patch(`http://localhost:3000/users/${userId}`, {
//         cart: updatedCart,
//       });
//       setCart(updatedCart);
//       toast.success(`${item.name} added to cart`);
//     } catch (err) {
//       toast.error("Failed to add to cart");
//     }
//   };

//   const updateQuantity = async (cartId, newQty) => {
//     if (!userId || newQty < 1) return;

//     const updatedCart = cart.map((item) =>
//       item.id === cartId ? { ...item, quantity: newQty } : item
//     );

//     try {
//       await axios.patch(`http://localhost:3000/users/${userId}`, {
//         cart: updatedCart,
//       });
//       setCart(updatedCart);
//     } catch (err) {
//       toast.error("Failed to update quantity");
//     }
//   };

//   const removeFromCart = async (cartId) => {
//     if (!userId) return;

//     const updatedCart = cart.filter((item) => item.id !== cartId);

//     try {
//       await axios.patch(`http://localhost:3000/users/${userId}`, {
//         cart: updatedCart,
//       });
//       setCart(updatedCart);
//       toast.success("Item removed");
//     } catch (err) {
//       toast.error("Failed to remove item");
//     }
//   };

//   const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         cartQuantity,
//         addToCart,
//         updateQuantity,
//         removeFromCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within CartProvider");
//   }
//   return context;
// };




import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // ✅ source of truth
  const [cart, setCart] = useState([]);

  // 🔄 Load cart when user changes
  useEffect(() => {
    if (!user?.id) {
      setCart([]);
      return;
    }

    axios
      .get(`http://localhost:3000/users/${user.id}`)
      .then((res) => setCart(res.data.cart || []))
      .catch(() => {
        toast.error("Failed to load cart");
        setCart([]);
      });
  }, [user]);

  const syncCart = async (updatedCart) => {
    await axios.patch(`http://localhost:3000/users/${user.id}`, {
      cart: updatedCart,
    });
  };

  const addToCart = async (item) => {
    if (!user?.id) {
      toast.error("Please login to add items");
      return;
    }

    const cartItem = {
      id: Date.now().toString(),
      productId: item.id,
      product: item,
      quantity: 1,
      isCustomized: item.isCustomized || false,
      beanId: item.beanId || null,
      milkId: item.milkId || null,
    };

    const updatedCart = [...cart, cartItem];

    try {
      await syncCart(updatedCart);
      setCart(updatedCart);
      toast.success(`${item.name} added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const updateQuantity = async (cartId, newQty) => {
    if (!user?.id || newQty < 1) return;

    const updatedCart = cart.map((item) =>
      item.id === cartId ? { ...item, quantity: newQty } : item
    );

    try {
      await syncCart(updatedCart);
      setCart(updatedCart);
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const removeFromCart = async (cartId) => {
    if (!user?.id) return;

    const updatedCart = cart.filter((item) => item.id !== cartId);

    try {
      await syncCart(updatedCart);
      setCart(updatedCart);
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  // ⭐ THIS IS THE KEY FUNCTION
  const clearCart = async () => {
    if (!user?.id) return;

    try {
      await syncCart([]);
      setCart([]);
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartQuantity,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart, // ✅ exposed
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
