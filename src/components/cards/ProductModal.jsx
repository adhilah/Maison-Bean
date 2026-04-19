
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/CartContext";
// import toast from "react-hot-toast";
// import { getLoggedInUser } from "../../utils/auth";

// export default function ProductModal({ product, onClose }) {
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   const isCoffee = product?.category?.toLowerCase().includes("coffee");

//   const handleAddToCart = () => {
//     const user = getLoggedInUser();

//     if (!user) {
//       toast.error("Please login to add to cart");
//       return;
//     }

//     addToCart({
//       ...product,
//       isCustomized: false,
//     });

//     onClose();
//   };

//   if (!product) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

//       <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
//         <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-500 hover:text-black"
//           >
//             ✕
//           </button>

//           <img
//             src={product.image}
//             alt={product.name}
//             className="h-56 w-full object-cover rounded-xl mb-4"
//           />

//           <h2 className="text-2xl font-bold mb-1">{product.name}</h2>

//           {product.rating && (
//             <div className="flex items-center gap-1 mb-3">
//               <span className="text-yellow-500 text-lg">★</span>
//               <span className="font-medium">{product.rating}</span>
//               <span className="text-sm text-gray-500">/ 5</span>
//             </div>
//           )}

//           <p className="text-gray-600 mb-4">{product.description}</p>

//           {product.healthBenefits && (
//             <div className="mb-4">
//               <h4 className="font-semibold mb-2">Health Benefits</h4>
//               {Array.isArray(product.healthBenefits) ? (
//                 <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                   {product.healthBenefits.map((benefit, index) => (
//                     <li key={index}>{benefit}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-sm text-gray-600">{product.healthBenefits}</p>
//               )}
//             </div>
//           )}

//           <p className="text-2xl font-bold text-[#9c7635] mb-6">
//             ${product.basePrice}
//           </p>

//           <div className="space-y-3">
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-[#9c7635] hover:bg-[#7a5c2a] text-white py-3 rounded-xl font-semibold transition"
//             >
//               Add to Cart
//             </button>

//             {isCoffee && (
//               <button
//                 onClick={() => {
//                   const user = getLoggedInUser();
//                   if (!user) {
//                     toast.error("Please login to customize product");
//                     return;
//                   }
//                   onClose();
//                   navigate(`/customize/${product.id}`);
//                 }}
//                 className="w-full border-2 border-[#9c7635] text-[#9c7635] py-3 rounded-xl font-semibold hover:bg-[#9c7635]/10 transition"
//               >
//                 Customize
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "#c4a96a" : "none"} stroke="#c4a96a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const CustomizeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M12 2v2M12 20v2M4.93 4.93l1.41 1.41M18.66 18.66l1.41 1.41M2 12h2M20 12h2" />
  </svg>
);

function ProductModal({ product, onClose }) {
  const [visible, setVisible] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const overlayRef = useRef(null);
  const navigate = useNavigate();

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const wishlisted = isWishlisted(product);
  const isCustomer = user?.role === "customer";

  // Check if it's a coffee product
  const isCoffee = product?.category?.toLowerCase().includes("coffee");

  // Open animation
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  // Escape key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  const handleCustomize = () => {
    handleClose();
    setTimeout(() => navigate(`/customize/${product.id}`), 380);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');
      `}</style>

      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[500] bg-[#050402]/95 backdrop-blur-[18px] flex items-center justify-center p-4 md:p-6 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={(e) => e.target === overlayRef.current && handleClose()}
      >
        <div
          className={`bg-[#13100a] border border-[#c4a96a]/20 w-full max-w-[860px] max-h-[92vh] overflow-hidden grid grid-cols-1 md:grid-cols-2 relative transition-all duration-400 ${
            visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-[#0a0804]/70 backdrop-blur-md border border-[#c4a96a]/30 rounded-full flex items-center justify-center text-[#faf8f5]/70 hover:bg-[#6c5225]/50 hover:text-[#c4a96a] hover:scale-110 transition-all"
          >
            <CloseIcon />
          </button>

          {/* Image Side - FIXED HEIGHT */}
          <div className="relative overflow-hidden bg-[#1e1810] h-[380px] md:h-[460px]">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover brightness-90 transition-transform duration-[8000ms] ${imgLoaded ? "scale-[1.03]" : ""}`}
              onLoad={() => setImgLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#0a0804]/70" />

            {isCustomer && (
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute bottom-4 left-4 flex items-center gap-2 bg-[#0a0804]/70 backdrop-blur-md border px-4 py-2 text-xs font-light tracking-widest uppercase transition-all ${
                  wishlisted ? "border-[#c4a96a] bg-[#6c5225]/40" : "border-[#c4a96a]/30 hover:border-[#c4a96a]"
                }`}
              >
                <HeartIcon filled={wishlisted} />
                {wishlisted ? "WISHLISTED" : "WISHLIST"}
              </button>
            )}
          </div>

          {/* Content Side */}
          <div className="p-8 md:p-10 overflow-y-auto">
            {product.category && (
              <p className="font-['Jost'] text-xs tracking-[0.4em] uppercase text-[#c4a96a]/60 mb-2">
                {product.category}
              </p>
            )}

            <h2 className="font-['Cormorant_Garamond'] text-[2.1rem] leading-none font-light text-[#faf8f5] mb-4">
              {product.name}
            </h2>

            <div className="h-px w-10 bg-gradient-to-r from-[#6c5225] to-transparent mb-6" />

            <p className="font-['Jost'] text-sm leading-relaxed text-[#faf8f5]/50 mb-8 flex-1">
              {product.description || "A carefully crafted specialty item, made with the finest ingredients and served with intention."}
            </p>

            {/* Meta Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags?.map((tag) => (
                <span key={tag} className="font-['Jost'] text-[10px] tracking-widest uppercase border border-[#c4a96a]/20 px-3 py-1 text-[#c4a96a]/70">
                  {tag}
                </span>
              )) || (
                <>
                  <span className="font-['Jost'] text-[10px] tracking-widest uppercase border border-[#c4a96a]/20 px-3 py-1 text-[#c4a96a]/70">Artisan</span>
                  <span className="font-['Jost'] text-[10px] tracking-widest uppercase border border-[#c4a96a]/20 px-3 py-1 text-[#c4a96a]/70">Small Batch</span>
                  <span className="font-['Jost'] text-[10px] tracking-widest uppercase border border-[#c4a96a]/20 px-3 py-1 text-[#c4a96a]/70">Fresh Daily</span>
                </>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-8 border-b border-[#c4a96a]/10 mb-8">
              <span className="font-['Cormorant_Garamond'] text-4xl font-light text-[#c4a96a]">₹{product.basePrice}</span>
              <span className="font-['Jost'] text-xs tracking-widest uppercase text-[#c4a96a]/50">BASE PRICE</span>
            </div>

            {/* Action Buttons */}
            {isCustomer ? (
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs tracking-[0.28em] uppercase font-light transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]/50 ${
                    addedToCart ? "bg-green-800 text-white" : " bg-[#c9a96e] hover:bg-[#8e7c57] hover:tracking-[0.28em]"
                  }`}
                >
                  <CartIcon />
                  {addedToCart ? "ADDED ✓" : "ADD TO CART"}
                </button>

                {/* Customize Button - ONLY FOR COFFEE */}
                {isCoffee && (
                  <button
                    onClick={handleCustomize}
                    className="flex-1 flex items-center justify-center gap-2 py-4 text-xs tracking-[0.25em] uppercase border border-[#c4a96a]/40 hover:border-[#c4a96a] hover:bg-[#c4a96a]/10 transition-all  duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]/50 text-white"
                  >
                    <CustomizeIcon />
                    CUSTOMIZE
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full py-4 bg-[#6c5225]  hover:border-[#c9a96e]/30 text-xs tracking-[0.28em] uppercase font-light transition-all"
              >
                SIGN IN TO ORDER
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductModal;