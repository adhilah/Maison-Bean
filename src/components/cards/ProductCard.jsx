// import { useState, useMemo, memo } from "react";
// import ProductModal from "./ProductModal";
// import { useWishlist } from "../../context/WishlistContext";

// const ProductCard = ({ product }) => {
//   const [open, setOpen] = useState(false);
//   const { toggleWishlist, isWishlisted } = useWishlist();

//   // Memoize wishlisted status for performance
//   const wishlisted = useMemo(() => isWishlisted(product), [isWishlisted, product]);

//   return (
//     <>
//       <div
//         onClick={() => setOpen(true)}
//         className="relative cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
//       >
//         {/* Wishlist Icon */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleWishlist(product);
//           }}
//           className="absolute top-3 right-3 p-1 z-10"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             className={`w-6 h-6 transition-all duration-300 ${
//               wishlisted
//                 ? "fill-red-500 stroke-red-500 scale-110"
//                 : "fill-none stroke-gray-400 hover:stroke-red-500"
//             }`}
//             strokeWidth="2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 21s-7.5-4.35-10-8.5C.5 8 3.5 4 7.5 4c2 0 3.5 1 4.5 2.5C13 5 14.5 4 16.5 4 20.5 4 23.5 8 22 12.5 19.5 16.65 12 21 12 21z"
//             />
//           </svg>
//         </button>

//         <img
//           src={product.image}
//           alt={product.name}
//           className="h-40 w-full object-cover rounded"
//         />

//         <h3 className="mt-2 font-semibold">{product.name}</h3>

//         <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

//         <p className="mt-2 font-bold text-[#9c7635]">${product.basePrice}</p>
//       </div>

//       {open && <ProductModal product={product} onClose={() => setOpen(false)} />}
//     </>
//   );
// };

// // Memoize the entire component to prevent unnecessary re-renders
// export default memo(ProductCard);


import { useState, useMemo, memo } from "react";
import ProductModal from "./ProductModal";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

// ─────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────
const HeartIcon = ({ filled }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24"
    fill={filled ? "#c9a96e" : "none"}
    stroke={filled ? "#c9a96e" : "rgba(245,240,232,0.6)"}
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    className="transition-all duration-300"
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg
    width="13" height="13" viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

// ─────────────────────────────────────────────
// ProductCard
// ─────────────────────────────────────────────
const ProductCard = ({ product, index = 0 }) => {
  const [open,    setOpen]    = useState(false);
  const [added,   setAdded]   = useState(false);

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart }                    = useCart();

  const wishlisted = useMemo(
    () => isWishlisted(product),
    [isWishlisted, product]
  );

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@200;300;400&display=swap');

        @keyframes cardFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .card-appear {
          opacity: 0;
          animation: cardFadeUp 0.6s ease forwards;
        }
      `}</style>

      {/* ── CARD ── */}
      <div
        onClick={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        role="button"
        tabIndex={0}
        className="
          card-appear group relative
          bg-[#110d07] border border-[#c9a96e]/10
          hover:border-[#c9a96e]/30
          overflow-hidden flex flex-col
          cursor-pointer
          transition-all duration-500
          focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a96e]/50
        "
        style={{ animationDelay: `${index * 0.06}s` }}
      >

        {/* ── IMAGE ── */}
        <div className="relative h-[260px] overflow-hidden bg-[#1a1510] flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="
              w-full h-full object-cover
              opacity-90 group-hover:opacity-100
              scale-100 group-hover:scale-105
              transition-all duration-700
            "
          />

          {/* Bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-20
            bg-gradient-to-t from-[#110d07] to-transparent pointer-events-none" />

          {/* Wishlist button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="
              absolute top-3 right-3
              w-8 h-8 rounded-full
              bg-[#080502]/80 backdrop-blur-md
              border border-[#c9a96e]/20
              flex items-center justify-center
              hover:border-[#c9a96e]/50 hover:scale-110
              transition-all duration-300
              focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a96e]/40
            "
          >
            <HeartIcon filled={wishlisted} />
          </button>
        </div>

        {/* ── CONTENT ── */}
        <div className="flex-1 flex flex-col p-6 border-t border-[#c9a96e]/10">

          {/* Category */}
          {product.category && (
            <p className="
              text-[#c9a96e]/75 text-[10px] font-light
              tracking-[0.4em] uppercase mb-2
            "
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {product.category}
            </p>
          )}

          {/* Name */}
          <h3
            className="
              text-[1.35rem] font-light leading-tight
              text-[#f5f0e8] group-hover:text-[#c9a96e]
              transition-colors duration-300 mb-3
            "
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="
            text-[#f5f0e8]/45 text-[13px] leading-relaxed
            line-clamp-2 mb-6 flex-1
          "
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200 }}
          >
            {product.description}
          </p>

          {/* ── FOOTER ── */}
          <div className="flex items-center justify-between pt-4 border-t border-[#c9a96e]/10 mt-auto">

            {/* Price */}
            <span
              className="text-2xl text-[#c9a96e]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              ₹{product.basePrice}
            </span>

            {/* Add to Cart */}
           <button
  onClick={handleAddToCart}
  className={`
    flex items-center justify-center gap-2 
    w-full md:w-auto px-6 py-2.5
    text-[0.58rem] font-light tracking-[0.28em] uppercase
    text-[#0d0a05] bg-[#c9a96e]
    hover:bg-[#d4b87a] active:bg-[#a58956]
    transition-all duration-300
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]/50
  `}
  style={{ fontFamily: "'Jost', sans-serif" }}
>
  <CartIcon />
  {added ? "Added ✓" : "Add to Cart"}
</button>
          </div>
        </div>
      </div>

      {/* ── MODAL ── */}
      {open && (
        <ProductModal
          product={product}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default memo(ProductCard);