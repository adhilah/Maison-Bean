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
// ProductCard — FIXED HEIGHT: 460px always
// Layout: image(240px) + content(160px) + footer(60px) = 460px
// ─────────────────────────────────────────────
const ProductCard = ({ product, index = 0 }) => {
  const [open,  setOpen]  = useState(false);
  const [added, setAdded] = useState(false);

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
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── ROOT: strict 460px, no exceptions ── */
        .pc-card {
          width: 100%;
          height: 460px;
          display: flex;
          flex-direction: column;
          background: #110d07;
          border: 1px solid rgba(201,169,110,0.10);
          overflow: hidden;
          cursor: pointer;
          position: relative;
          opacity: 0;
          animation: cardFadeUp 0.6s ease forwards;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.25s ease;
        }
        .pc-card:hover {
          border-color: rgba(201,169,110,0.30);
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(201,169,110,0.12);
        }
        .pc-card:focus-visible {
          outline: 1px solid rgba(201,169,110,0.5);
          outline-offset: 2px;
        }

        /* ── IMAGE: exactly 240px, never flexes ── */
        .pc-img-zone {
          flex: 0 0 240px;
          height: 240px;
          position: relative;
          overflow: hidden;
          background: #1a1510;
        }
        .pc-img-zone img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.88;
          transform: scale(1);
          transition: opacity 0.6s ease, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
          display: block;
        }
        .pc-card:hover .pc-img-zone img {
          opacity: 1;
          transform: scale(1.06);
        }
        .pc-img-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 64px;
          background: linear-gradient(to top, #110d07, transparent);
          pointer-events: none;
        }
        .pc-wish-btn {
          position: absolute;
          top: 10px; right: 10px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(8,5,2,0.80);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(201,169,110,0.20);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: border-color 0.3s ease, transform 0.2s ease;
        }
        .pc-wish-btn:hover {
          border-color: rgba(201,169,110,0.55);
          transform: scale(1.12);
        }

        /* ── CONTENT: exactly 160px, clips overflow ── */
        .pc-content {
          flex: 0 0 160px;
          height: 160px;
          overflow: hidden;
          padding: 14px 16px 0;
          border-top: 1px solid rgba(201,169,110,0.10);
          display: flex;
          flex-direction: column;
        }
        .pc-category {
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.65);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-shrink: 0;
          margin-bottom: 6px;
        }
        /* Name: 2-line max */
        .pc-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.22rem;
          font-weight: 300;
          line-height: 1.25;
          color: #f5f0e8;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-shrink: 0;
          margin-bottom: 8px;
          transition: color 0.3s ease;
        }
        .pc-card:hover .pc-name { color: #c9a96e; }
        /* Description: 2-line max */
        .pc-desc {
          font-family: 'Jost', sans-serif;
          font-size: 11.5px;
          font-weight: 200;
          line-height: 1.55;
          color: rgba(245,240,232,0.38);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-shrink: 0;
        }

        /* ── FOOTER: exactly 60px, pinned ── */
        .pc-footer {
          flex: 0 0 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 0 16px;
          border-top: 1px solid rgba(201,169,110,0.08);
        }
        .pc-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          font-weight: 300;
          color: #c9a96e;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .pc-cart-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 13px;
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #0d0a05;
          background: #c9a96e;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.25s ease, transform 0.15s ease;
        }
        .pc-cart-btn:hover  { background: #d4b87a; }
        .pc-cart-btn:active { background: #a58956; transform: scale(0.97); }

        /* bottom shimmer on hover */
        .pc-shimmer {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, rgba(201,169,110,0.6), transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .pc-card:hover .pc-shimmer { opacity: 1; }
      `}</style>

      {/* ── CARD ROOT ── */}
      <div
        onClick={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        role="button"
        tabIndex={0}
        className="pc-card"
        style={{ animationDelay: `${index * 0.06}s` }}
      >
        {/* IMAGE — 240px */}
        <div className="pc-img-zone">
          <img src={product.image} alt={product.name} />
          <div className="pc-img-fade" />
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="pc-wish-btn"
          >
            <HeartIcon filled={wishlisted} />
          </button>
        </div>

        {/* CONTENT — 160px */}
        <div className="pc-content">
          {product.category && <p className="pc-category">{product.category}</p>}
          <h3 className="pc-name">{product.name}</h3>
          {product.description && <p className="pc-desc">{product.description}</p>}
        </div>

        {/* FOOTER — 60px */}
        <div className="pc-footer">
          <span className="pc-price">₹{product.basePrice}</span>
          <button onClick={handleAddToCart} className="pc-cart-btn">
            <CartIcon />
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>

        <div className="pc-shimmer" />
      </div>

      {/* MODAL */}
      {open && <ProductModal product={product} onClose={() => setOpen(false)} />}
    </>
  );
};

export default memo(ProductCard);
//======================================================================================

// import { useState, useMemo, memo } from "react";
// import ProductModal from "./ProductModal";
// import { useWishlist } from "../../context/WishlistContext";
// import { useCart } from "../../context/CartContext";

// // ─────────────────────────────────────────────
// // Icons
// // ─────────────────────────────────────────────
// const HeartIcon = ({ filled }) => (
//   <svg
//     width="14" height="14" viewBox="0 0 24 24"
//     fill={filled ? "#c9a96e" : "none"}
//     stroke={filled ? "#c9a96e" : "rgba(245,240,232,0.6)"}
//     strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
//     className="transition-all duration-300"
//   >
//     <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
//   </svg>
// );

// const CartIcon = () => (
//   <svg
//     width="13" height="13" viewBox="0 0 24 24"
//     fill="none" stroke="currentColor"
//     strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
//   >
//     <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
//     <line x1="3" y1="6" x2="21" y2="6" />
//     <path d="M16 10a4 4 0 01-8 0" />
//   </svg>
// );

// // ─────────────────────────────────────────────
// // ProductCard
// // ─────────────────────────────────────────────
// const ProductCard = ({ product, index = 0 }) => {
//   const [open,    setOpen]    = useState(false);
//   const [added,   setAdded]   = useState(false);

//   const { toggleWishlist, isWishlisted } = useWishlist();
//   const { addToCart }                    = useCart();

//   const wishlisted = useMemo(
//     () => isWishlisted(product),
//     [isWishlisted, product]
//   );

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     addToCart(product);
//     setAdded(true);
//     setTimeout(() => setAdded(false), 1800);
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@200;300;400&display=swap');

//         @keyframes cardFadeUp {
//           from { opacity: 0; transform: translateY(24px); }
//           to   { opacity: 1; transform: translateY(0);    }
//         }
//         .card-appear {
//           opacity: 0;
//           animation: cardFadeUp 0.6s ease forwards;
//         }
//       `}</style>

//       {/* ── CARD ── */}
//       <div
//         onClick={() => setOpen(true)}
//         onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
//         role="button"
//         tabIndex={0}
//         className="
//           card-appear group relative
//           bg-[#110d07] border border-[#c9a96e]/10
//           hover:border-[#c9a96e]/30
//           overflow-hidden flex flex-col
//           cursor-pointer
//           transition-all duration-500
//           focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a96e]/50
//         "
//         style={{ animationDelay: `${index * 0.06}s` }}
//       >

//         {/* ── IMAGE ── */}
//         <div className="relative h-[260px] overflow-hidden bg-[#1a1510] flex-shrink-0">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="
//               w-full h-full object-cover
//               opacity-90 group-hover:opacity-100
//               scale-100 group-hover:scale-105
//               transition-all duration-700
//             "
//           />

//           {/* Bottom fade */}
//           <div className="absolute bottom-0 inset-x-0 h-20
//             bg-gradient-to-t from-[#110d07] to-transparent pointer-events-none" />

//           {/* Wishlist button */}
//           <button
//             onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
//             aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
//             className="
//               absolute top-3 right-3
//               w-8 h-8 rounded-full
//               bg-[#080502]/80 backdrop-blur-md
//               border border-[#c9a96e]/20
//               flex items-center justify-center
//               hover:border-[#c9a96e]/50 hover:scale-110
//               transition-all duration-300
//               focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a96e]/40
//             "
//           >
//             <HeartIcon filled={wishlisted} />
//           </button>
//         </div>

//         {/* ── CONTENT ── */}
//         <div className="flex-1 flex flex-col p-6 border-t border-[#c9a96e]/10">

//           {/* Category */}
//           {product.category && (
//             <p className="
//               text-[#c9a96e]/75 text-[10px] font-light
//               tracking-[0.4em] uppercase mb-2
//             "
//               style={{ fontFamily: "'Jost', sans-serif" }}
//             >
//               {product.category}
//             </p>
//           )}

//           {/* Name */}
//           <h3
//             className="
//               text-[1.35rem] font-light leading-tight
//               text-[#f5f0e8] group-hover:text-[#c9a96e]
//               transition-colors duration-300 mb-3
//             "
//             style={{ fontFamily: "'Cormorant Garamond', serif" }}
//           >
//             {product.name}
//           </h3>

//           {/* Description */}
//           <p className="
//             text-[#f5f0e8]/45 text-[13px] leading-relaxed
//             line-clamp-2 mb-6 flex-1
//           "
//             style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200 }}
//           >
//             {product.description}
//           </p>

//           {/* ── FOOTER ── */}
//           <div className="flex items-center justify-between pt-4 border-t border-[#c9a96e]/10 mt-auto">

//             {/* Price */}
//             <span
//               className="text-2xl text-[#c9a96e]"
//               style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
//             >
//               ₹{product.basePrice}
//             </span>

//             {/* Add to Cart */}
//            <button
//   onClick={handleAddToCart}
//   className={`
//     flex items-center justify-center gap-2 
//     w-full md:w-auto px-6 py-2.5
//     text-[0.58rem] font-light tracking-[0.28em] uppercase
//     text-[#0d0a05] bg-[#c9a96e]
//     hover:bg-[#d4b87a] active:bg-[#a58956]
//     transition-all duration-300
//     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]/50
//   `}
//   style={{ fontFamily: "'Jost', sans-serif" }}
// >
//   <CartIcon />
//   {added ? "Added ✓" : "Add to Cart"}
// </button>
//           </div>
//         </div>
//       </div>

//       {/* ── MODAL ── */}
//       {open && (
//         <ProductModal
//           product={product}
//           onClose={() => setOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default memo(ProductCard);