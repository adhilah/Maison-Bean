import React, { useState, useEffect, memo } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import ProductModal from "./cards/ProductModal";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

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

/* ── Skeleton Card ── */
const SkeletonCard = () => (
  <div className="bg-[#110d07] border border-[#c9a96e]/10 overflow-hidden">
    <div
      className="h-[260px] bg-[length:200%_100%] animate-[shimmer_1.8s_infinite]"
      style={{ backgroundImage: "linear-gradient(90deg,#1a1510 0%,#211a12 50%,#1a1510 100%)" }}
    />
    <div className="p-6 space-y-3">
      <div className="h-2.5 w-[35%] bg-[#1e1810] rounded" />
      <div className="h-5 w-[70%] bg-[#1e1810] rounded" />
      <div className="h-2.5 w-full bg-[#1e1810] rounded" />
      <div className="h-2.5 w-[55%] bg-[#1e1810] rounded" />
      <div className="h-px bg-[#1e1810] mt-4" />
      <div className="flex justify-between pt-1">
        <div className="h-6 w-[30%] bg-[#1e1810] rounded" />
        <div className="h-8 w-[35%] bg-[#1e1810] rounded" />
      </div>
    </div>
  </div>
);

/* ── Main ── */
const FeaturedProducts = () => {
  const [products, setProducts]         = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading]           = useState(true);
  const [addedId, setAddedId]           = useState(null);

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart }                    = useCart();

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        const data = res.data.$values || res.data;
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
  console.error(err);

  toast.error(
    err.response?.data ||
    "Failed to load products"
  );

  // KEEP loading UI visible
  setLoading(true);
});
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart({
      id:        Date.now().toString() + Math.random(),
      productId: product.id,
      product,
      quantity:  1,
      bean:      null,
      milk:      null,
      isCustomized: false,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
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

        .add-btn { transition: background 0.2s ease, tracking 0.2s ease, transform 0.15s ease; }
        .add-btn:hover  { background: #d4b87a; }
        .add-btn:active { transform: scale(0.97); }

        .heart-btn { transition: border-color 0.2s ease, transform 0.2s ease; }
        .heart-btn:hover { border-color: rgba(201,169,110,0.5); transform: scale(1.1); }
      `}</style>

      <section
        className="relative overflow-hidden bg-[#0d0a05] pt-16 pb-28 font-['Jost',sans-serif]"
      >
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.025] blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#c9a96e]/[0.018] blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-10">

          {/* ── Section Header ── */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.5em] uppercase mb-3 opacity-70">
                HANDPICKED FOR YOU
              </p>
              <h2
                className="text-[#f5f0e8] font-light leading-none tracking-wide"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem,5vw,3.5rem)" }}
              >
                Featured{" "}
                <span className="italic text-[#c9a96e]">Products</span>
              </h2>
            </div>

            <a
              href="/menu"
              className="group flex items-center gap-2.5 text-[#c9a96e]/70 hover:text-[#c9a96e] text-xs tracking-[0.3em] uppercase transition-colors self-end md:self-auto"
            >
              VIEW ALL
              <span className="h-px bg-current inline-block w-7 group-hover:w-11 transition-all duration-300" />
            </a>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#c9a96e]/10">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : products.slice(0, 8).map((product, idx) => {
                  const wishlisted = isWishlisted(product);
                  const isAdded    = addedId === product.id;
                  const price      = Number(product.price ?? product.basePrice ?? 0);
                  const calories   = product.baseCalories ?? product.calories ?? null;

                  return (
                    <div
                      key={product.id}
                      className="fp-card group bg-[#110d07] border border-[#c9a96e]/10 hover:border-[#c9a96e]/28 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
                      style={{ animationDelay: `${idx * 55}ms` }}
                      onClick={() => setSelectedProduct(product)}
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

                        {/* Gold top line */}
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
                          aria-label="Wishlist"
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
                          <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.4em] uppercase mb-2 opacity-70">
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
                        <p className="text-[#f5f0e8]/40 text-[12px] leading-relaxed line-clamp-2 mb-3 flex-1">
                          {product.description}
                        </p>

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
                            ${price.toFixed(0)}
                          </span>

                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className={`add-btn flex items-center gap-2 px-5 py-2.5 text-[0.58rem] font-light tracking-[0.28em] uppercase
                              ${isAdded
                                ? "bg-[#4ade80]/20 text-[#4ade80] border border-[#4ade80]/30"
                                : "bg-[#c9a96e] text-[#0d0a05]"
                              }`}
                            style={{ fontFamily: "'Jost', sans-serif" }}
                          >
                            {isAdded ? <CheckIcon /> : <CartIcon />}
                            {isAdded ? "Added" : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default memo(FeaturedProducts);