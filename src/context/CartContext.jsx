
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useAuth } from "./AuthContext";
// import { v4 as uuidv4 } from "uuid";

// const CartContext = createContext();

// // ─────────────────────────────────────────────────────────────
// // normalizeItem — handles both addToCart() call shapes:
// //
// // Shape A (ProductCard — plain product):
// //   addToCart(product)  →  { id, name, basePrice, image, ... }
// //
// // Shape B (CustomizeProduct — wrapped):
// //   addToCart({ id, productId, product, bean, milk, isCustomized })
// //
// // Always produces:
// //   { productId, product:{name,image,basePrice,category}, bean, milk, beanId, milkId, isCustomized }
// // ─────────────────────────────────────────────────────────────
// function normalizeItem(item) {
//   // Shape B has a nested `product` object with a `name` field
//   const isShapeB = item.product && typeof item.product === "object" && item.product.name;

//   const productObj = isShapeB ? item.product : item;

//   const bean = item.bean || null;
//   const milk = item.milk || null;

//   return {
//     productId: productObj.id || item.productId || null,
//     product: {
//       id:          productObj.id          || null,
//       name:        productObj.name        || "Unknown Item",
//       image:       productObj.image       || "/placeholder.jpg",
//       basePrice:   Number(productObj.basePrice ?? productObj.price ?? 0),
//       category:    productObj.category    || "",
//       description: productObj.description || "",
//     },
//     bean,
//     milk,
//     beanId:       bean?.id || item.beanId || null,
//     milkId:       milk?.id || item.milkId || null,
//     isCustomized: !!item.isCustomized,
//   };
// }

// export const CartProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [cart, setCart] = useState([]);

//   // Load cart from backend
//   useEffect(() => {
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

//   // Sync cart to backend
//   const syncCart = async (updatedCart) => {
//     if (!user?.id || user.role === "admin") return;
//     await axios.patch(`http://localhost:3000/users/${user.id}`, {
//       cart: updatedCart,
//     });
//   };

//   // ADD TO CART — normalize first, then dedup, then save
//   const addToCart = async (item) => {
//     if (!user?.id || user.role === "admin") {
//       toast.error("Please login to add items");
//       return;
//     }

//     const norm = normalizeItem(item);

//     const existingIndex = cart.findIndex((cartItem) => {
//       if (!norm.isCustomized) {
//         return cartItem.productId === norm.productId && !cartItem.isCustomized;
//       }
//       return (
//         cartItem.productId    === norm.productId &&
//         cartItem.isCustomized === true &&
//         cartItem.beanId       === norm.beanId &&
//         cartItem.milkId       === norm.milkId
//       );
//     });

//     let updatedCart;
//     if (existingIndex !== -1) {
//       updatedCart = cart.map((cartItem, i) =>
//         i === existingIndex
//           ? { ...cartItem, quantity: cartItem.quantity + 1 }
//           : cartItem
//       );
//     } else {
//       updatedCart = [...cart, { id: uuidv4(), quantity: 1, ...norm }];
//     }

//     try {
//       await syncCart(updatedCart);
//       setCart(updatedCart);
//       toast.success(`${norm.product.name} added to cart`);
//     } catch {
//       toast.error("Failed to add to cart");
//     }
//   };

//   // Update quantity
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

//   // Remove item
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

//   // Clear cart
//   const clearCart = async () => {
//     if (!user?.id || user.role === "admin") return;
//     try {
//       await syncCart([]);
//       setCart([]);
//     } catch {
//       toast.error("Failed to clear cart");
//     }
//   };

//   const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{ cart, cartQuantity, addToCart, updateQuantity, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
//---------------------------------------------------------------------------------------------------


import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();

function normalizeItem(item) {
  const isShapeB = item.product && typeof item.product === "object" && item.product.name;
  const productObj = isShapeB ? item.product : item;

  const bean = item.bean || null;
  const milk = item.milk || null;

  return {
    productId: productObj.id || item.productId || null,
    product: {
      id:          productObj.id          || null,
      name:        productObj.name        || "Unknown Item",
      image:       productObj.image       || "/placeholder.jpg",
      basePrice:   Number(productObj.basePrice ?? productObj.price ?? 0),
      category:    productObj.category    || "",
      description: productObj.description || "",
    },
    bean,
    milk,
    beanId:       bean?.id || item.beanId || null,
    milkId:       milk?.id || item.milkId || null,
    isCustomized: !!item.isCustomized,

    // ── Brew customization fields — were missing before ──
    strength:  item.strength  ?? null,
    temp:      item.temp      ?? null,
    sweetness: item.sweetness ?? null,
  };
}

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user?.id || user.role === "admin") { setCart([]); return; }
    axios
      .get(`http://localhost:3000/users/${user.id}`)
      .then((res) => setCart(res.data.cart || []))
      .catch(() => { toast.error("Failed to load cart"); setCart([]); });
  }, [user]);

  const syncCart = async (updatedCart) => {
    if (!user?.id || user.role === "admin") return;
    await axios.patch(`http://localhost:3000/users/${user.id}`, { cart: updatedCart });
  };

  const addToCart = async (item) => {
    if (!user?.id || user.role === "admin") { toast.error("Please login to add items"); return; }

    const norm = normalizeItem(item);

    const existingIndex = cart.findIndex((cartItem) => {
      if (!norm.isCustomized) {
        return cartItem.productId === norm.productId && !cartItem.isCustomized;
      }
      // All five brew options must match — different combo = separate line item
      return (
        cartItem.productId    === norm.productId &&
        cartItem.isCustomized === true &&
        cartItem.beanId       === norm.beanId &&
        cartItem.milkId       === norm.milkId &&
        cartItem.strength     === norm.strength &&
        cartItem.temp         === norm.temp &&
        cartItem.sweetness    === norm.sweetness
      );
    });

    let updatedCart;
    if (existingIndex !== -1) {
      updatedCart = cart.map((cartItem, i) =>
        i === existingIndex ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
    } else {
      updatedCart = [...cart, { id: uuidv4(), quantity: 1, ...norm }];
    }

    try {
      await syncCart(updatedCart);
      setCart(updatedCart);
      toast.success(`${norm.product.name} added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const updateQuantity = async (cartId, newQty) => {
    if (!user?.id || user.role === "admin" || newQty < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === cartId ? { ...item, quantity: newQty } : item
    );
    try { await syncCart(updatedCart); setCart(updatedCart); }
    catch { toast.error("Failed to update quantity"); }
  };

  const removeFromCart = async (cartId) => {
    if (!user?.id || user.role === "admin") return;
    const updatedCart = cart.filter((item) => item.id !== cartId);
    try { await syncCart(updatedCart); setCart(updatedCart); toast.success("Item removed"); }
    catch { toast.error("Failed to remove item"); }
  };

  const clearCart = async () => {
    if (!user?.id || user.role === "admin") return;
    try { await syncCart([]); setCart([]); }
    catch { toast.error("Failed to clear cart"); }
  };

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartQuantity, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);