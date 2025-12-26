import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getLoggedInUser } from "../utils/auth";

const CartContext = createContext(null);
const API_URL = "http://localhost:3000/cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const user = getLoggedInUser();
  const userId = user?.id;

  // ===============================
  // LOAD CART ON APP START / LOGIN
  // ===============================
  useEffect(() => {
    const loadCart = async () => {
      try {
        if (userId) {
          const res = await axios.get(`${API_URL}?userId=${userId}`);
          setCart(res.data || []);
          localStorage.setItem("cart", JSON.stringify(res.data || []));
        } else {
          const guestCart =
            JSON.parse(localStorage.getItem("cart")) || [];
          setCart(guestCart);
        }
      } catch (err) {
        console.error("Cart load failed", err);
      }
    };

    loadCart();
  }, [userId]);

  // ===============================
  // CART QUANTITY
  // ===============================
  const cartQuantity = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  // ===============================
  // ADD TO CART
  // ===============================
  const addToCart = async ({
    productId,
    price,
    beanId = null,
    milkId = null,
    isCustomized = false,
  }) => {
    // -------- GUEST USER --------
    if (!userId) {
      const guestCart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const existing = guestCart.find(
        (item) =>
          item.productId === productId &&
          item.beanId === beanId &&
          item.milkId === milkId
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        guestCart.push({
          productId,
          price,
          quantity: 1,
          beanId,
          milkId,
          isCustomized,
        });
      }

      localStorage.setItem("cart", JSON.stringify(guestCart));
      setCart(guestCart);
      toast.success("Added to cart");
      return;
    }

    // -------- LOGGED-IN USER --------
    try {
      const res = await axios.get(
        `${API_URL}?userId=${userId}&productId=${productId}&beanId=${beanId}&milkId=${milkId}`
      );

      if (res.data.length > 0) {
        const existing = res.data[0];
        await axios.patch(`${API_URL}/${existing.id}`, {
          quantity: existing.quantity + 1,
        });

        setCart((prev) =>
          prev.map((item) =>
            item.id === existing.id
              ? { ...item, quantity: existing.quantity + 1 }
              : item
          )
        );
      } else {
        const newItem = {
          userId,
          productId,
          price,
          quantity: 1,
          beanId,
          milkId,
          isCustomized,
        };

        const created = await axios.post(API_URL, newItem);
        setCart((prev) => [...prev, created.data]);
      }

      toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart failed", err);
      toast.error("Failed to add to cart");
    }
  };

  // ===============================
  // UPDATE QUANTITY
  // ===============================
  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    if (!userId) {
      const updated = cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
      return;
    }

    try {
      await axios.patch(`${API_URL}/${id}`, { quantity });
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // ===============================
  // REMOVE FROM CART
  // ===============================
  const removeFromCart = async (id) => {
    if (!userId) {
      const updated = cart.filter((item) => item.id !== id);
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
      toast.success("Removed from cart");
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      setCart((prev) => prev.filter((item) => item.id !== id));
      toast.success("Removed from cart");
    } catch (err) {
      console.error("Remove failed", err);
      toast.error("Failed to remove");
    }
  };

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

// ===============================
// HOOK
// ===============================
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
