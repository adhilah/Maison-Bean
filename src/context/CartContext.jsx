


// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const storedUser = localStorage.getItem("user");
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   // FIXED: Dependency on user?.id instead of user object
//   useEffect(() => {
//     if (!user) {
//       setCart([]);
//       return;
//     }

//     axios
//       .get(`http://localhost:3000/users/${user.id}`)
//       .then((res) => {
//         setCart(res.data.cart || []);
//       })
//       .catch(() => {
//         toast.error("Failed to load cart");
//         setCart([]);
//       });
//   }, [user?.id]); // ← This stops the infinite loop

//   const addToCart = async (item) => {
//     if (!user) {
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
//       await axios.patch(`http://localhost:3000/users/${user.id}`, {
//         cart: updatedCart,
//       });
//       setCart(updatedCart);
//       toast.success(`${item.name} added to cart`);
//     } catch (err) {
//       toast.error("Failed to add to cart");
//     }
//   };

//   const updateQuantity = async (cartId, newQty) => {
//     if (newQty < 1) return;

//     const updatedCart = cart.map((item) =>
//       item.id === cartId ? { ...item, quantity: newQty } : item
//     );

//     try {
//       await axios.patch(`http://localhost:3000/users/${user.id}`, {
//         cart: updatedCart,
//       });
//       setCart(updatedCart);
//     } catch (err) {
//       toast.error("Failed to update quantity");
//     }
//   };

//   const removeFromCart = async (cartId) => {
//     const updatedCart = cart.filter((item) => item.id !== cartId);

//     try {
//       await axios.patch(`http://localhost:3000/users/${user.id}`, {
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

// export const useCart = () => useContext(CartContext);





import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  // Read user from localStorage only once on mount
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

  // Load cart when userId changes (login/logout)
  useEffect(() => {
    if (!userId) {
      setCart([]);
      return;
    }

    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        setCart(res.data.cart || []);
      })
      .catch((err) => {
        console.error("Failed to load cart:", err);
        toast.error("Failed to load cart");
        setCart([]);
      });
  }, [userId]);

  const addToCart = async (item) => {
    if (!userId) {
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
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        cart: updatedCart,
      });
      setCart(updatedCart);
      toast.success(`${item.name} added to cart`);
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  const updateQuantity = async (cartId, newQty) => {
    if (!userId || newQty < 1) return;

    const updatedCart = cart.map((item) =>
      item.id === cartId ? { ...item, quantity: newQty } : item
    );

    try {
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        cart: updatedCart,
      });
      setCart(updatedCart);
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const removeFromCart = async (cartId) => {
    if (!userId) return;

    const updatedCart = cart.filter((item) => item.id !== cartId);

    try {
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        cart: updatedCart,
      });
      setCart(updatedCart);
      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove item");
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};