import { useState, useMemo, memo } from "react";
import ProductModal from "./ProductModal";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

/* ── Icons ── */
const HeartIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24"
    fill={filled ? "#c9a96e" : "none"}
    stroke={filled ? "#c9a96e" : "rgba(245,240,232,0.55)"}
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    className="transition-all duration-300"
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const FlameIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
  </svg>
);

/* ── ProductCard ── */
const ProductCard = ({ product, index = 0 }) => {
  const [open,  setOpen]  = useState(false);
  const [added, setAdded] = useState(false);

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart }                    = useCart();

  const wishlisted = useMemo(() => isWishlisted(product), [isWishlisted, product]);

  const price    = Number(product.basePrice ?? product.price ?? 0);
  const calories = product.baseCalories ?? product.calories ?? null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id:           Date.now().toString() + Math.random(),
      productId:    product.id,
      product,
      quantity:     1,
      bean:         null,
      milk:         null,
      isCustomized: false,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fp-card {
          animation: fadeUp 0.45s ease both;
        }
        .fp-card .fp-img {
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease;
        }
        .fp-card:hover .fp-img { transform: scale(1.05); opacity: 1 !important; }

        .fp-card .fp-title { transition: color 0.25s ease; }
        .fp-card:hover .fp-title { color: #c9a96e; }

        .fp-card .fp-border-top {
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .fp-card:hover .fp-border-top { transform: scaleX(1); }

        .add-btn { transition: background 0.2s ease, transform 0.15s ease; }
        .add-btn:hover  { background: #d4b87a; }
        .add-btn:active { transform: scale(0.97); }

        .heart-btn { transition: border-color 0.2s ease, transform 0.2s ease; }
        .heart-btn:hover { border-color: rgba(201,169,110,0.5); transform: scale(1.1); }
      `}</style>

      <div
        onClick={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        role="button"
        tabIndex={0}
        className="fp-card group bg-[#110d07] border border-[#c9a96e]/10 hover:border-[#c9a96e]/28 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
        style={{ animationDelay: `${index * 55}ms` }}
      >
        {/* ── Image ── */}
        <div className="relative h-[260px] overflow-hidden bg-[#1a1510] flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="fp-img w-full h-full object-cover opacity-88"
          />

          {/* Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#110d07] to-transparent" />

          {/* Gold top-line sweep */}
          <div className="absolute top-0 left-0 right-0 h-px z-10">
            <div
              className="fp-border-top h-full"
              style={{ background: "linear-gradient(to right,transparent,#c9a96e,transparent)" }}
            />
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            className="heart-btn absolute top-3 right-3 w-8 h-8 bg-[#080502]/80 backdrop-blur-md border border-[#c9a96e]/20 rounded-full flex items-center justify-center"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <HeartIcon filled={wishlisted} />
          </button>

          {/* Calories badge */}
          {calories != null && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 bg-[#0d0a05]/70 border border-[#c9a96e]/15 backdrop-blur-sm">
              <FlameIcon />
              <span className="text-[#c9a96e]/60 text-[9px] tracking-[0.2em]">{calories} cal</span>
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className="flex-1 p-6 flex flex-col border-t border-[#c9a96e]/10">

          {/* Category */}
          {product.category && (
            <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.4em] uppercase mb-2 opacity-70"
              style={{ fontFamily: "'Jost', sans-serif" }}>
              {product.category}
            </p>
          )}

          {/* Name */}
          <h3
            className="fp-title font-light leading-tight text-[#f5f0e8] mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem" }}
          >
            {product.name}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-[#f5f0e8]/40 text-[12px] leading-relaxed line-clamp-2 mb-3 flex-1"
              style={{ fontFamily: "'Jost', sans-serif" }}>
              {product.description}
            </p>
          )}

          {/* Health benefits */}
          {product.healthBenefits && (
            <p className="text-[#c9a96e]/35 text-[10px] leading-relaxed line-clamp-1 mb-4 italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {product.healthBenefits}
            </p>
          )}

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-[#c9a96e]/10 mt-auto">
            <span
              className="text-[#c9a96e] font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem" }}
            >
              {price > 0 ? `₹${price.toFixed(0)}` : "—"}
            </span>

            <button
              onClick={handleAddToCart}
              className={`add-btn flex items-center gap-2 px-5 py-2.5 text-[0.58rem] font-light tracking-[0.28em] uppercase
                ${added
                  ? "bg-[#4ade80]/20 text-[#4ade80] border border-[#4ade80]/30"
                  : "bg-[#c9a96e] text-[#0d0a05]"
                }`}
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {added ? <CheckIcon /> : <CartIcon />}
              {added ? "Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {open && <ProductModal product={product} onClose={() => setOpen(false)} />}
    </>
  );
};

export default memo(ProductCard);