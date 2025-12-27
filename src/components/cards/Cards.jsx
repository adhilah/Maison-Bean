// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// const API_PRODUCTS = "http://localhost:3000/products";
// const API_BEANS = "http://localhost:3000/beanTypes";
// const API_MILKS = "http://localhost:3000/milkOptions";

// const CartPage = () => {
//   const { cart, updateQuantity, removeFromCart } = useCart();
//   const [enrichedCart, setEnrichedCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const enrichCart = async () => {
//       if (!cart || cart.length === 0) {
//         setEnrichedCart([]);
//         setLoading(false);
//         return;
//       }

//       try {
//         const [productsRes, beansRes, milksRes] = await Promise.all([
//           fetch(API_PRODUCTS).then(res => res.json()),
//           fetch(API_BEANS).then(res => res.json()),
//           fetch(API_MILKS).then(res => res.json()),
//         ]);

//         const productMap = {};
//         productsRes.forEach(p => (productMap[p.id] = p));
//         const beanMap = {};
//         beansRes.forEach(b => (beanMap[b.id] = b));
//         const milkMap = {};
//         milksRes.forEach(m => (milkMap[m.id] = m));

//         const enriched = cart.map(cartItem => {
//           const product = cartItem.product || productMap[cartItem.productId] || {
//             name: cartItem.product?.name || "Custom Product",
//             image: cartItem.product?.image || "/placeholder.jpg",
//             basePrice: cartItem.product?.basePrice || 0,
//             category: cartItem.product?.category || "Custom",
//             description: cartItem.product?.description || "No description available",
//           };

//           const bean = cartItem.beanId ? beanMap[cartItem.beanId] : null;
//           const milk = cartItem.milkId ? milkMap[cartItem.milkId] : null;

//           const beanAdd = bean?.priceAdd || 0;
//           const milkAdd = milk?.priceAdd || 0;

//           const totalPricePerUnit = (product.basePrice || 0) + beanAdd + milkAdd;

//           return {
//             cartId: cartItem.id,
//             product,
//             bean,
//             milk,
//             quantity: cartItem.quantity || 1,
//             totalPricePerUnit,
//             lineTotal: totalPricePerUnit * (cartItem.quantity || 1),
//             isCustomized: cartItem.isCustomized || false,
//           };
//         });

//         setEnrichedCart(enriched);
//       } catch (err) {
//         console.error("Failed to enrich cart:", err);
//         setError("Could not load product details. Try refreshing.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     enrichCart();
//   }, [cart]);

//   const shippingCost = 9.9;
//   const subtotal = enrichedCart.reduce((sum, item) => sum + item.lineTotal, 0);
//   const total = subtotal + shippingCost;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-xl">Loading your cart...</p>
//       </div>
//     );
//   }

//   if (!cart || cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-4 text-center">
//         <h1 className="text-4xl font-bold mb-8">My Cart</h1>
//         <p className="text-xl text-gray-600 mb-8">Your cart is empty</p>
//         <Link to="/">
//           <button className="bg-[#9c7635] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#7a5c2a] transition">
//             Continue Shopping
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-10">
//           <h1 className="text-4xl font-bold">My Cart</h1>
//           <Link to="/">
//             <button className="text-[#9c7635] font-medium hover:underline">
//               ← Continue shopping
//             </button>
//           </Link>
//         </div>

//         {error && (
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6">
//             {error}
//           </div>
//         )}

//         {/* Cart Items */}
//         <div className="space-y-6 mb-12">
//           {enrichedCart.map(item => (
//             <div
//               key={item.cartId}
//               className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow grid grid-cols-12 gap-6 items-center"
//             >
//               {/* Image & Details */}
//               <div className="col-span-12 md:col-span-6 flex gap-6">
//                 <img
//                   src={item.product.image || "/placeholder.jpg"}
//                   alt={item.product.name}
//                   className="w-28 h-28 object-cover rounded-xl shadow"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-xl font-bold text-gray-800">
//                     {item.isCustomized ? `Customized ${item.product.name}` : item.product.name}
//                   </h3>
//                   <p className="text-sm text-gray-600 mt-1">{item.product.description}</p>
//                   <p className="text-sm text-gray-500 mt-2">Category: {item.product.category}</p>

//                   {/* Customization Details */}
//                   {item.isCustomized && (
//                     <div className="mt-4 space-y-2 text-sm bg-gray-50 p-4 rounded-lg">
//                       {item.bean && (
//                         <div className="flex justify-between">
//                           <span className="font-medium">Bean:</span>
//                           <span>
//                             {item.bean.name}
//                             {item.bean.priceAdd > 0 && (
//                               <span className="text-[#9c7635] ml-2">+₹{item.bean.priceAdd.toFixed(2)}</span>
//                             )}
//                           </span>
//                         </div>
//                       )}
//                       {item.milk && (
//                         <div className="flex justify-between">
//                           <span className="font-medium">Milk:</span>
//                           <span>
//                             {item.milk.name}
//                             {item.milk.priceAdd > 0 && (
//                               <span className="text-[#9c7635] ml-2">+₹{item.milk.priceAdd.toFixed(2)}</span>
//                             )}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Unit Price */}
//               <div className="col-span-6 md:col-span-2 text-center">
//                 <p className="text-lg font-semibold">${item.totalPricePerUnit.toFixed(2)}</p>
//               </div>

//               {/* Quantity */}
//               <div className="col-span-6 md:col-span-2 flex justify-center items-center gap-4">
//                 <button
//                   onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
//                   className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-xl"
//                   disabled={item.quantity <= 1}
//                 >
//                   −
//                 </button>
//                 <span className="text-xl font-medium w-12 text-center">{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
//                   className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-xl"
//                 >
//                   +
//                 </button>
//               </div>

//               {/* Line Total */}
//               <div className="col-span-6 md:col-span-1 text-right">
//                 <p className="text-xl font-bold">${item.lineTotal.toFixed(2)}</p>
//               </div>

//               {/* Remove */}
//               <div className="col-span-6 md:col-span-1 text-right">
//                 <button
//                   onClick={() => removeFromCart(item.cartId)}
//                   className="text-2xl text-gray-400 hover:text-red-600 transition"
//                 >
//                   ×
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl p-8 max-w-md ml-auto shadow-lg">
//           <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
//           <div className="space-y-4 text-lg">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>${subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-gray-600">
//               <span>Shipping</span>
//               <span>${shippingCost.toFixed(2)}</span>
//             </div>
//             <div className="border-t-2 border-dashed pt-4">
//               <div className="flex justify-between text-2xl font-bold text-[#9c7635]">
//                 <span>Total</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//           <button className="w-full mt-8 py-5 bg-[#9c7635] hover:bg-[#7a5c2a] text-white text-xl font-bold rounded-2xl transition transform hover:scale-105">
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
