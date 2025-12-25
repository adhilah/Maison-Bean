// import { useState } from "react";
// import { useWishlist } from "../../context/WishlistContext";
// import { useCart } from "../../context/CartContext";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

// export default function ProductCard({ product }) {
//   const { toggleWishlist, isWishlisted } = useWishlist();
//   const { addToCart } = useCart();
//   const [open, setOpen] = useState(false);

//   const isCoffee = product.category?.toLowerCase().includes("coffee");

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     addToCart(product);
//     toast.success(`${product.name} added to cart!`);  // ← Toast message
//   };

//   const handleWishlist = (e) => {
//     e.stopPropagation();
//     toggleWishlist(product);
//   };

//   const handleBackdropClick = () => setOpen(false);
//   const handleModalContentClick = (e) => e.stopPropagation();

//   return (
//     <>
//       {/* CARD */}
//       <div
//         onClick={() => setOpen(true)}
//         className="relative bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
//       >
//         <button onClick={handleWishlist} className="absolute top-2 right-2 z-10">
//           <span
//             className={`material-symbols-rounded text-2xl ${
//               isWishlisted(product.id) ? "text-red-500" : "text-gray-400"
//             }`}
//           >
//             favorite
//           </span>
//         </button>

//         <img
//           src={product.image}
//           alt={product.name}
//           className="h-40 w-full object-cover rounded"
//         />

//         <h3 className="mt-2 font-semibold line-clamp-2">{product.name}</h3>
//         <p className="font-bold text-[#9c7635]">₹{product.basePrice}</p>

//         <button
//           onClick={handleAddToCart}
//           className="mt-3 w-full bg-[#9c7635] hover:bg-[#7a5c2a] text-white py-2 rounded transition"
//         >
//           Add to Cart
//         </button>
//       </div>

//       {/* MODAL */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
//           onClick={handleBackdropClick}
//         >
//           <div
//             className="bg-white rounded-xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto"
//             onClick={handleModalContentClick}
//           >
//             <button
//               onClick={() => setOpen(false)}
//               className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800"
//             >
//               ✕
//             </button>

//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-60 object-cover rounded mb-4"
//             />

//             <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
//             <p className="text-gray-600 mb-2">Category: {product.category}</p>
//             <p className="text-gray-700 mb-3">{product.description}</p>

//             {product.healthBenefits && (
//               <div className="bg-gray-100 p-4 rounded mb-4">
//                 <h4 className="font-semibold mb-1">Health Benefits</h4>
//                 <p className="text-sm text-gray-700">{product.healthBenefits}</p>
//               </div>
//             )}

//             <p className="text-2xl font-bold text-[#9c7635] mb-6">
//               ₹{product.basePrice}
//             </p>

//             <div className="flex gap-3">
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 bg-[#9c7635] hover:bg-[#7a5c2a] text-white py-3 rounded font-semibold transition"
//               >
//                 Add to Cart
//               </button>

//               {isCoffee && (
//                 <Link to="/customize">
//                 <button className="flex-1 border-2 border-[#9c7635] text-[#9c7635] py-3 rounded font-semibold hover:bg-[#9c7635]/10 transition">
//                   Customize
//                 </button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }




// import { useState } from "react";
// import { useWishlist } from "../../context/WishlistContext";
// import { useCart } from "../../context/CartContext";
// import toast from "react-hot-toast";
// import Customization from "../customization/Customization";

// export default function ProductCard({ product }) {
//   const { toggleWishlist, isWishlisted } = useWishlist();
//   const { addToCart } = useCart();
//   const [showCustomization, setShowCustomization] = useState(false);

//   const isCoffee = product.category?.toLowerCase().includes("coffee");

//   const handleAddToCart = () => {
//     addToCart(product);
//     toast.success(`${product.name} added to cart!`);
//   };

//   const handleWishlist = (e) => {
//     e.stopPropagation();
//     toggleWishlist(product);
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow transition hover:shadow-lg">
//       {/* Wishlist button */}
//       <button onClick={handleWishlist} className="absolute top-2 right-2 z-10">
//         <span
//           className={`material-symbols-rounded text-2xl ${
//             isWishlisted(product.id) ? "text-red-500" : "text-gray-400"
//           }`}
//         >
//           favorite
//         </span>
//       </button>

//       {/* Product image */}
//       <img
//         src={product.image}
//         alt={product.name}
//         className="h-40 w-full object-cover rounded mb-2"
//       />

//       <h3 className="mt-2 font-semibold line-clamp-2">{product.name}</h3>
//       <p className="font-bold text-[#9c7635] mb-2">₹{product.basePrice}</p>

//       <div className="flex gap-2">
//         <button
//           onClick={handleAddToCart}
//           className="flex-1 bg-[#9c7635] hover:bg-[#7a5c2a] text-white py-2 rounded transition"
//         >
//           Add to Cart
//         </button>

//         {isCoffee && (
//           <button
//             onClick={() => setShowCustomization((prev) => !prev)}
//             className="flex-1 border-2 border-[#9c7635] text-[#9c7635] py-2 rounded hover:bg-[#9c7635]/10 transition"
//           >
//             Customize
//           </button>
//         )}
//       </div>

//       {/* Inline customization section */}
//       {showCustomization && isCoffee && (
//         <div className="mt-4">
//           <Customization
//             product={product}
//             onAddToCart={(customizedProduct) => {
//               addToCart(customizedProduct);
//               toast.success(`${customizedProduct.name} added to cart!`);
//               setShowCustomization(false); // collapse after adding
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }




import { useState } from "react";
import ProductModal from "./ProductModal";

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full object-cover rounded"
        />

        <h3 className="mt-2 font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <p className="mt-2 font-bold text-[#9c7635]">
          ₹{product.basePrice}
        </p>
      </div>

      {/* MODAL */}
      {open && (
        <ProductModal
          product={product}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
