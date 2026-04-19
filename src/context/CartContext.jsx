// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useAuth } from "./AuthContext";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     // FIX: Do NOT load cart if user is admin
//     if (!user?.id || user.role === "admin") {
//       setCart([]);
//       return;
//     }

//     axios
//       .get(`http://localhost:3000/users/${user.id}`)
//       .then((res) => setCart(res.data.cart || []))
//       .catch(() => {
//         toast.error("Failed to load cart");
//         setCart([]);
//       });
//   }, [user]);

//   const syncCart = async (updatedCart) => {
//     if (user?.role === "admin") return; // Don't sync for admin
//     await axios.patch(`http://localhost:3000/users/${user.id}`, {
//       cart: updatedCart,
//     });
//   };

//   const addToCart = async (item) => {
//     if (!user?.id || user.role === "admin") {
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
//       await syncCart(updatedCart);
//       setCart(updatedCart);
//       toast.success(`${item.name} added to cart`);
//     } catch {
//       toast.error("Failed to add to cart");
//     }
//   };

//   const updateQuantity = async (cartId, newQty) => {
//     if (!user?.id || user.role === "admin" || newQty < 1) return;

//     const updatedCart = cart.map((item) =>
//       item.id === cartId ? { ...item, quantity: newQty } : item
//     );

//     try {
//       await syncCart(updatedCart);
//       setCart(updatedCart);
//     } catch {
//       toast.error("Failed to update quantity");
//     }
//   };

//   const removeFromCart = async (cartId) => {
//     if (!user?.id || user.role === "admin") return;

//     const updatedCart = cart.filter((item) => item.id !== cartId);

//     try {
//       await syncCart(updatedCart);
//       setCart(updatedCart);
//       toast.success("Item removed");
//     } catch {
//       toast.error("Failed to remove item");
//     }
//   };

//   const clearCart = async () => {
//     if (!user?.id || user.role === "admin") return;

//     try {
//       await syncCart([]);
//       setCart([]);
//     } catch {
//       toast.error("Failed to clear cart");
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
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);




import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { v4 as uuidv4 } from "uuid"; // better id

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // 🔹 Load cart
  useEffect(() => {
    if (!user?.id || user.role === "admin") {
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

  // 🔹 Sync cart to backend
  const syncCart = async (updatedCart) => {
    if (!user?.id || user.role === "admin") return;

    await axios.patch(`http://localhost:3000/users/${user.id}`, {
      cart: updatedCart,
    });
  };

  // 🔹 ADD TO CART (FIXED)
  const addToCart = async (item) => {
    if (!user?.id || user.role === "admin") {
      toast.error("Please login to add items");
      return;
    }

    const existingIndex = cart.findIndex((cartItem) => {
      // Normal product
      if (!item.isCustomized) {
        return (
          cartItem.productId === item.id && !cartItem.isCustomized
        );
      }

      // Customized product
      return (
        cartItem.productId === item.id &&
        cartItem.isCustomized &&
        cartItem.beanId === item.beanId &&
        cartItem.milkId === item.milkId
      );
    });

    let updatedCart;

    if (existingIndex !== -1) {
      // ✅ Increase quantity
      updatedCart = cart.map((cartItem, index) =>
        index === existingIndex
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      // ✅ Add new item
      const newItem = {
        id: uuidv4(),
        productId: item.id,
        product: item,
        quantity: 1,
        isCustomized: item.isCustomized || false,
        beanId: item.beanId || null,
        milkId: item.milkId || null,
      };

      updatedCart = [...cart, newItem];
    }

    try {
      await syncCart(updatedCart);
      setCart(updatedCart);
      toast.success(`${item.name} added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  // 🔹 Update quantity
  const updateQuantity = async (cartId, newQty) => {
    if (!user?.id || user.role === "admin" || newQty < 1) return;

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

  // 🔹 Remove item
  const removeFromCart = async (cartId) => {
    if (!user?.id || user.role === "admin") return;

    const updatedCart = cart.filter((item) => item.id !== cartId);

    try {
      await syncCart(updatedCart);
      setCart(updatedCart);
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  // 🔹 Clear cart
  const clearCart = async () => {
    if (!user?.id || user.role === "admin") return;

    try {
      await syncCart([]);
      setCart([]);
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  // 🔹 Total quantity
  const cartQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartQuantity,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 🔹 Custom hook
export const useCart = () => useContext(CartContext);