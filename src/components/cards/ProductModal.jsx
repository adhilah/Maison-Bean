import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

/* ── Icons ── */
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24"
    fill={filled ? "#c9a96e" : "none"} stroke="#c9a96e"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);
const CartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);
const CustomizeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M12 2v2M12 20v2M4.93 4.93l1.41 1.41M18.66 18.66l1.41 1.41M2 12h2M20 12h2" />
  </svg>
);
const FlameIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
  </svg>
);
const LeafIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0118 7l1-1A15 15 0 014 4a15 15 0 018 16" /><path d="M11 20l-4-4" />
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function ProductModal({ product, onClose }) {
  const [visible,     setVisible]     = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgLoaded,   setImgLoaded]   = useState(false);

  const overlayRef = useRef(null);
  const navigate   = useNavigate();

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const { user }      = useAuth();

  const wishlisted = isWishlisted(product);
  const isCustomer = user?.role === "CUSTOMER";
  const isCoffee   = product?.category?.toLowerCase().includes("coffee");

  const price          = Number(product.basePrice ?? product.price ?? 0);
  const calories       = product.baseCalories ?? product.calories ?? null;
  const healthBenefits = product.healthBenefits || product.health_benefits || null;
  const tags           = product.tags || [];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const fn = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 320);
  };

  const handleAddToCart = () => {
    addToCart({
      id:           Date.now().toString() + Math.random(),
      productId:    product.id,
      product,
      quantity:     1,
      bean:         null,
      milk:         null,
      isCustomized: false,
    });
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes modalIn {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pm-panel {
          animation: modalIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        /* Fixed panel size — never grows with image */
        .pm-panel {
          width: 100%;
          max-width: 860px;
          /* Fixed height: tall enough for content, never depends on image */
          height: 560px;
        }
        @media (max-width: 767px) {
          /* On mobile: stack vertically, height auto with max cap */
          .pm-panel {
            height: auto;
            max-height: 88vh;
          }
          .pm-img-side {
            height: 260px !important;
            flex-shrink: 0;
          }
        }

        .pm-img { transition: transform 6s ease; }
        .pm-img-loaded { transform: scale(1.04); }

        .pm-add-btn { transition: background 0.22s ease, transform 0.15s ease; }
        .pm-add-btn:hover:not(:disabled) { background: #d4b87a; }
        .pm-add-btn:active:not(:disabled) { transform: scale(0.97); }

        .pm-cust-btn { transition: border-color 0.2s ease, background 0.2s ease; }
        .pm-cust-btn:hover { border-color: rgba(201,169,110,0.6); background: rgba(201,169,110,0.07); }

        .pm-scroll::-webkit-scrollbar { width: 3px; }
        .pm-scroll::-webkit-scrollbar-track { background: transparent; }
        .pm-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.18); }
      `}</style>

      {/* Backdrop */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[500] bg-[#040200]/88 backdrop-blur-[16px] flex items-center justify-center p-4 md:p-6 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        onClick={(e) => e.target === overlayRef.current && handleClose()}
      >
        {/*
          Panel:
          - Fixed height (560px desktop) so image never drives the size
          - md:grid-cols-2 splits it 50/50; both sides are h-full
        */}
        <div className="pm-panel bg-[#110d07] border border-[#c9a96e]/18 overflow-hidden grid grid-cols-1 md:grid-cols-2 relative">

          {/* ✕ */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 bg-[#0a0804]/80 backdrop-blur-md border border-[#c9a96e]/20 rounded-full flex items-center justify-center text-[#f5f0e8]/50 hover:text-[#c9a96e] hover:border-[#c9a96e]/50 hover:scale-110 transition-all duration-200"
          >
            <CloseIcon />
          </button>

          {/* ── Image side — always fills its grid cell, never overflows ── */}
          <div className="pm-img-side relative overflow-hidden bg-[#1a1510] h-full">
            <img
              src={product.image}
              alt={product.name}
              className={`pm-img w-full h-full object-cover opacity-88 ${imgLoaded ? "pm-img-loaded" : ""}`}
              onLoad={() => setImgLoaded(true)}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#0d0a05]/70" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#110d07] to-transparent" />

            {/* Calories badge */}
            <div className="absolute bottom-4 left-4 flex flex-col gap-2">
              {calories != null && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#0d0a05]/75 border border-[#c9a96e]/15 backdrop-blur-sm">
                  <FlameIcon />
                  <span className="text-[#c9a96e]/65 text-[9px] tracking-[0.3em] uppercase font-light"
                    style={{ fontFamily: "'Jost', sans-serif" }}>
                    {calories} cal
                  </span>
                </div>
              )}
            </div>

            {/* Wishlist */}
            {isCustomer && (
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute bottom-4 right-4 flex items-center gap-2 bg-[#0d0a05]/75 backdrop-blur-md border px-3 py-1.5 text-[9px] font-light tracking-[0.3em] uppercase transition-all duration-200
                  ${wishlisted
                    ? "border-[#c9a96e]/50 text-[#c9a96e]"
                    : "border-[#c9a96e]/20 text-[#f5f0e8]/40 hover:border-[#c9a96e]/45 hover:text-[#c9a96e]"
                  }`}
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                <HeartIcon filled={wishlisted} />
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>
            )}
          </div>

          {/* ── Content side — scrollable within fixed height ── */}
          <div className="pm-scroll overflow-y-auto h-full p-8 md:p-10 flex flex-col">

            {/* Category */}
            {product.category && (
              <p className="text-[#c9a96e]/60 text-[10px] tracking-[0.45em] uppercase font-light mb-2"
                style={{ fontFamily: "'Jost', sans-serif" }}>
                {product.category}
              </p>
            )}

            {/* Name */}
            <h2
              className="text-[#f5f0e8] font-light leading-none mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem,3vw,2.2rem)" }}
            >
              {product.name}
            </h2>

            {/* Gold rule */}
            <div className="h-px w-10 bg-gradient-to-r from-[#c9a96e]/60 to-transparent mb-6" />

            {/* Description */}
            <p className="text-[#f5f0e8]/45 text-[13px] leading-relaxed mb-6 font-light"
              style={{ fontFamily: "'Jost', sans-serif" }}>
              {product.description || "A carefully crafted specialty item, made with the finest ingredients."}
            </p>

            {/* Stats: calories + health benefits */}
            {(calories != null || healthBenefits) && (
              <div className="border border-[#c9a96e]/10 bg-[#0d0a05]/40 p-4 mb-6 space-y-3">
                {calories != null && (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]/50 flex-shrink-0">
                      <FlameIcon />
                    </div>
                    <div>
                      <p className="text-[#c9a96e]/45 text-[9px] tracking-[0.4em] uppercase mb-0.5"
                        style={{ fontFamily: "'Jost', sans-serif" }}>Calories</p>
                      <p className="text-[#f5f0e8]/70 text-[13px] font-light"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {calories} kcal per serving
                      </p>
                    </div>
                  </div>
                )}

                {healthBenefits && (
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]/50 flex-shrink-0 mt-0.5">
                      <LeafIcon />
                    </div>
                    <div>
                      <p className="text-[#c9a96e]/45 text-[9px] tracking-[0.4em] uppercase mb-0.5"
                        style={{ fontFamily: "'Jost', sans-serif" }}>Health Benefits</p>
                      <p className="text-[#f5f0e8]/60 text-[12px] leading-relaxed font-light italic"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {healthBenefits}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {(tags.length > 0 ? tags : ["Artisan", "Small Batch", "Fresh Daily"]).map((t) => (
                <span key={t}
                  className="text-[9px] tracking-widest uppercase border border-[#c9a96e]/18 px-3 py-1 text-[#c9a96e]/55"
                  style={{ fontFamily: "'Jost', sans-serif" }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Price — pushed to bottom */}
            <div className="flex items-baseline gap-3 pb-7 border-b border-[#c9a96e]/10 mb-7 mt-auto">
              <span
                className="text-[#c9a96e] font-light leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.6rem" }}
              >
                ${price.toFixed(0)}
              </span>
              <span className="text-[#c9a96e]/45 text-[9px] tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Jost', sans-serif" }}>
                BASE PRICE
              </span>
            </div>

            {/* Actions */}
            {isCustomer ? (
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`pm-add-btn flex-1 flex items-center justify-center gap-2 py-4 text-[0.6rem] tracking-[0.3em] uppercase font-light
                    ${addedToCart
                      ? "bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30"
                      : "bg-[#c9a96e] text-[#0d0a05]"
                    }`}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {addedToCart ? <CheckIcon /> : <CartIcon />}
                  {addedToCart ? "Added" : "Add to Cart"}
                </button>

                {isCoffee && (
                  <button
                    onClick={handleCustomize}
                    className="pm-cust-btn flex-1 flex items-center justify-center gap-2 py-4 text-[0.6rem] tracking-[0.25em] uppercase font-light border border-[#c9a96e]/30 text-[#f5f0e8]/70"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    <CustomizeIcon />
                    Customise
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full py-4 bg-[#c9a96e]/15 border border-[#c9a96e]/30 text-[#c9a96e] text-[0.6rem] tracking-[0.3em] uppercase font-light hover:bg-[#c9a96e]/25 transition-all"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Sign in to Order
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductModal;