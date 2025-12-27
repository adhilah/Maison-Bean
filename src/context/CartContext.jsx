import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // Load cart
  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:3000/users/${user.id}`)
      .then(res => setCart(res.data.cart || []))
      .catch(() => toast.error("Failed to load cart"));
  }, [user]);

  const addToCart = async (item) => {
    if (!user) {
      toast.error("Please login to add items");
      return;
    }

    const cartItem = {
      id: Date.now().toString(),
      productId: item.id,
      product: item,               // ✅ store FULL product
      quantity: 1,
      isCustomized: item.isCustomized || false,
      beanId: item.beanId || null,
      milkId: item.milkId || null,
    };

    const updatedCart = [...cart, cartItem];

    await axios.patch(`http://localhost:3000/users/${user.id}`, {
      cart: updatedCart,
    });

    setCart(updatedCart);
    toast.success(`${item.name} added to cart`);
  };

  const updateQuantity = async (cartId, newQty) => {
    if (newQty < 1) return;

    const updatedCart = cart.map(item =>
      item.id === cartId ? { ...item, quantity: newQty } : item
    );

    await axios.patch(`http://localhost:3000/users/${user.id}`, {
      cart: updatedCart,
    });

    setCart(updatedCart);
  };

  const removeFromCart = async (cartId) => {
    const updatedCart = cart.filter(item => item.id !== cartId);

    await axios.patch(`http://localhost:3000/users/${user.id}`, {
      cart: updatedCart,
    });

    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartQuantity: cart.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
