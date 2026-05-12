import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

/* ── Icons ── */
const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24"
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
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const BoltIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

function ProductModal({ product, onClose }) {
  const [visible,     setVisible]     = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgLoaded,   setImgLoaded]   = useState(false);
  const [activeTab,   setActiveTab]   = useState("details"); // "details" | "nutrition"

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

 const handleBuyNow = () => {

  handleClose();

  setTimeout(() => {

    navigate("/delivery-details", {
      state: {
        buyNow: true,

        product: {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.basePrice ?? product.price,
          quantity: 1,

          bean: null,
          milk: null,

          sweetness: null,
          strength: null,
          temp: null,

          isCustomized: false
        }
      }
    });

  }, 350);
};
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        /* ── Entrance animation ── */
        @keyframes pmSlideIn {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pmFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .pm-panel {
          animation: pmSlideIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
          width: 100%;
          max-width: 900px;
          height: 580px;
        }
        @media (max-width: 767px) {
          .pm-panel { height: auto; max-height: 92vh; }
          .pm-img-col { height: 280px !important; flex-shrink: 0; }
        }

        /* Image ken-burns */
        .pm-img {
          transition: transform 7s ease, opacity 0.6s ease;
          transform: scale(1.0);
          opacity: 0;
        }
        .pm-img.loaded {
          transform: scale(1.06);
          opacity: 1;
        }

        /* Scrollbar */
        .pm-content::-webkit-scrollbar { width: 2px; }
        .pm-content::-webkit-scrollbar-track { background: transparent; }
        .pm-content::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.15); border-radius: 2px; }

        /* Close button */
        .pm-close {
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .pm-close:hover { transform: rotate(90deg) scale(1.1); }

        /* Wishlist button */
        .pm-wishlist {
          transition: all 0.25s ease;
        }
        .pm-wishlist:hover { transform: scale(1.05); }
        .pm-wishlist.active {
          animation: pmFadeIn 0.2s ease;
        }

        /* Tab underline indicator */
        .pm-tab {
          position: relative;
          transition: color 0.2s ease;
        }
        .pm-tab::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0; right: 0;
          height: 1px;
          background: #c9a96e;
          transform: scaleX(0);
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .pm-tab.active::after { transform: scaleX(1); }

        /* Primary CTA button */
        .pm-btn-primary {
          position: relative;
          overflow: hidden;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }
        .pm-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%);
          background-size: 200% auto;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .pm-btn-primary:hover::before { opacity: 1; animation: shimmer 0.6s linear; }
        .pm-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,169,110,0.25); }
        .pm-btn-primary:active { transform: translateY(0); }

        /* Secondary CTA */
        .pm-btn-secondary {
          transition: all 0.2s ease;
        }
        .pm-btn-secondary:hover {
          background: rgba(201,169,110,0.08);
          border-color: rgba(201,169,110,0.5);
          transform: translateY(-1px);
        }
        .pm-btn-secondary:active { transform: translateY(0); }

        /* Buy now */
        .pm-btn-buy {
          transition: all 0.2s ease;
        }
        .pm-btn-buy:hover {
          background: #ede8df;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(245,240,232,0.15);
        }
        .pm-btn-buy:active { transform: translateY(0); }

        /* Stat card */
        .pm-stat {
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .pm-stat:hover {
          border-color: rgba(201,169,110,0.22);
          background: rgba(201,169,110,0.04);
        }

        /* Tag pill */
        .pm-tag {
          transition: all 0.2s ease;
        }
        .pm-tag:hover {
          border-color: rgba(201,169,110,0.45);
          color: rgba(201,169,110,0.85);
          background: rgba(201,169,110,0.06);
        }

        /* Number counter animation */
        @keyframes priceReveal {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pm-price { animation: priceReveal 0.5s 0.3s cubic-bezier(0.4,0,0.2,1) both; }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        ref={overlayRef}
        onClick={(e) => e.target === overlayRef.current && handleClose()}
        className={`fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-6
          transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ background: "rgba(4,2,0,0.92)", backdropFilter: "blur(20px)" }}
      >

        {/* ── Panel ── */}
        <div className="pm-panel grid grid-cols-1 md:grid-cols-2 relative overflow-hidden"
          style={{ background: "#0e0b06", border: "1px solid rgba(201,169,110,0.14)" }}>

          {/* Subtle inner glow top edge */}
          <div className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)" }} />

          {/* ── ✕ Close ── */}
          <button
            onClick={handleClose}
            className="pm-close absolute top-4 right-4 z-30 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(10,8,4,0.85)",
              border: "1px solid rgba(201,169,110,0.18)",
              color: "rgba(245,240,232,0.45)",
              backdropFilter: "blur(12px)",
            }}
          >
            <CloseIcon />
          </button>

          {/* ══════════════════════════════
              LEFT — Image Column
          ══════════════════════════════ */}
          <div className="pm-img-col relative overflow-hidden h-full" style={{ background: "#16110a" }}>

            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              onLoad={() => setImgLoaded(true)}
              className={`pm-img w-full h-full object-cover ${imgLoaded ? "loaded" : ""}`}
            />

            {/* Layered overlays for depth */}
            <div className="absolute inset-0" style={{
              background: "linear-gradient(180deg, rgba(14,11,6,0.12) 0%, rgba(14,11,6,0.0) 40%, rgba(14,11,6,0.75) 100%)"
            }} />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(90deg, rgba(14,11,6,0.0) 60%, rgba(14,11,6,0.5) 100%)"
            }} />

            {/* Category badge — top left */}
            {product.category && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 text-[9px] tracking-[0.4em] uppercase"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 300,
                    color: "rgba(201,169,110,0.8)",
                    background: "rgba(10,8,4,0.7)",
                    border: "1px solid rgba(201,169,110,0.2)",
                    backdropFilter: "blur(8px)",
                    display: "inline-block",
                  }}>
                  {product.category}
                </span>
              </div>
            )}

            {/* Bottom info strip */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">

              {/* Calories badge */}
              {calories != null && (
                <div className="flex items-center gap-2 px-2.5 py-1.5"
                  style={{
                    background: "rgba(10,8,4,0.72)",
                    border: "1px solid rgba(201,169,110,0.14)",
                    backdropFilter: "blur(10px)",
                  }}>
                  <FlameIcon />
                  <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                    className="text-[9px] tracking-[0.35em] uppercase text-[#c9a96e]/70">
                    {calories} cal
                  </span>
                </div>
              )}

              {/* Wishlist */}
              {isCustomer && (
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`pm-wishlist flex items-center gap-2 px-3 py-1.5 ${wishlisted ? "active" : ""}`}
                  style={{
                    background: "rgba(10,8,4,0.72)",
                    border: `1px solid ${wishlisted ? "rgba(201,169,110,0.45)" : "rgba(201,169,110,0.18)"}`,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <HeartIcon filled={wishlisted} />
                  <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                    className={`text-[9px] tracking-[0.35em] uppercase ${wishlisted ? "text-[#c9a96e]" : "text-[rgba(245,240,232,0.45)]"}`}>
                    {wishlisted ? "Saved" : "Save"}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* ══════════════════════════════
              RIGHT — Content Column
          ══════════════════════════════ */}
          <div className="pm-content overflow-y-auto h-full flex flex-col" style={{ padding: "36px 36px 32px" }}>

            {/* Name */}
            <h2 className="leading-none mb-2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(2rem, 3.2vw, 2.4rem)",
                color: "#f5f0e8",
                letterSpacing: "-0.01em",
              }}>
              {product.name}
            </h2>

            {/* Decorative rule */}
            <div className="mb-5" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ height: "1px", width: "28px", background: "linear-gradient(90deg, #c9a96e, transparent)" }} />
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(201,169,110,0.35)" }} />
            </div>

            {/* Description */}
            <p className="mb-5 leading-relaxed"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: "12.5px",
                color: "rgba(245,240,232,0.48)",
                letterSpacing: "0.01em",
              }}>
              {product.description || "A carefully crafted specialty item, made with the finest ingredients."}
            </p>

            {/* ── Tabs ── */}
            {(calories != null || healthBenefits || tags.length > 0) && (
              <>
                <div className="flex gap-6 mb-4" style={{ borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
                  {["details", "nutrition"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pm-tab pb-3 text-[10px] tracking-[0.35em] uppercase ${activeTab === tab ? "active text-[#c9a96e]" : "text-[rgba(245,240,232,0.3)] hover:text-[rgba(245,240,232,0.55)]"}`}
                      style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, background: "none", border: "none", cursor: "pointer" }}
                    >
                      {tab === "details" ? "Details" : "Nutrition"}
                    </button>
                  ))}
                </div>

                {/* Tab: Details */}
                {activeTab === "details" && (
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-2">
                      {(tags.length > 0 ? tags : ["Artisan", "Small Batch", "Fresh Daily"]).map((t) => (
                        <span key={t} className="pm-tag text-[9px] tracking-[0.35em] uppercase px-3 py-1.5 cursor-default"
                          style={{
                            fontFamily: "'Jost', sans-serif",
                            fontWeight: 300,
                            color: "rgba(201,169,110,0.5)",
                            border: "1px solid rgba(201,169,110,0.15)",
                          }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: Nutrition */}
                {activeTab === "nutrition" && (
                  <div className="flex flex-col gap-2 mb-5">
                    {calories != null && (
                      <div className="pm-stat flex items-center gap-3 p-3"
                        style={{ border: "1px solid rgba(201,169,110,0.1)", background: "rgba(10,8,4,0.3)" }}>
                        <div className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                          style={{ border: "1px solid rgba(201,169,110,0.18)", color: "rgba(201,169,110,0.6)" }}>
                          <FlameIcon />
                        </div>
                        <div>
                          <p className="text-[9px] tracking-[0.4em] uppercase mb-0.5"
                            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, color: "rgba(201,169,110,0.45)" }}>
                            Calories
                          </p>
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "15px", color: "rgba(245,240,232,0.75)" }}>
                            {calories} kcal per serving
                          </p>
                        </div>
                      </div>
                    )}
                    {healthBenefits && (
                      <div className="pm-stat flex items-start gap-3 p-3"
                        style={{ border: "1px solid rgba(201,169,110,0.1)", background: "rgba(10,8,4,0.3)" }}>
                        <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ border: "1px solid rgba(201,169,110,0.18)", color: "rgba(201,169,110,0.6)" }}>
                          <LeafIcon />
                        </div>
                        <div>
                          <p className="text-[9px] tracking-[0.4em] uppercase mb-0.5"
                            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, color: "rgba(201,169,110,0.45)" }}>
                            Health Benefits
                          </p>
                          <p className="italic leading-relaxed"
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "13px", color: "rgba(245,240,232,0.6)" }}>
                            {healthBenefits}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Spacer pushes price+CTA to bottom */}
            <div className="flex-1" />

            {/* ── Price ── */}
            <div className="pb-5 mb-5" style={{ borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
              <p className="text-[9px] tracking-[0.45em] uppercase mb-1"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, color: "rgba(201,169,110,0.4)" }}>
                Base Price
              </p>
              <div className="pm-price flex items-baseline gap-2">
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "3rem",
                  lineHeight: 1,
                  color: "#c9a96e",
                  letterSpacing: "-0.02em",
                }}>
                  ${price.toFixed(0)}
                </span>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "10px", color: "rgba(201,169,110,0.35)", letterSpacing: "0.15em" }}>
                  USD
                </span>
              </div>
            </div>

            {/* ── Action Buttons ── */}
            {isCustomer ? (
              <div className="flex flex-col gap-2.5">

                {/* Row 1: Add to Cart + Buy Now — equal width */}
                <div className="flex gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="pm-btn-primary flex-1 flex items-center justify-center gap-2 py-3.5"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 300,
                      fontSize: "10px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      background: addedToCart ? "rgba(74,222,128,0.12)" : "#c9a96e",
                      color: addedToCart ? "#4ade80" : "#0d0a05",
                      border: addedToCart ? "1px solid rgba(74,222,128,0.3)" : "1px solid transparent",
                    }}
                  >
                    {addedToCart ? <CheckIcon /> : <CartIcon />}
                    {addedToCart ? "Added" : "Add to Cart"}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="pm-btn-buy flex-1 flex items-center justify-center gap-2 py-3.5"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 300,
                      fontSize: "10px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      background: "#f5f0e8",
                      color: "#0d0a05",
                      border: "1px solid transparent",
                    }}
                  >
                    <BoltIcon />
                    Buy Now
                  </button>
                </div>

                {/* Row 2: Customize — full width, only for coffee */}
                {isCoffee && (
                  <button
                    onClick={handleCustomize}
                    className="pm-btn-secondary w-full flex items-center justify-center gap-2 py-3.5"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 300,
                      fontSize: "10px",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "rgba(245,240,232,0.65)",
                      border: "1px solid rgba(201,169,110,0.22)",
                      background: "transparent",
                    }}
                  >
                    <CustomizeIcon />
                    Customise Your Order
                  </button>
                )}

              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="pm-btn-secondary w-full py-3.5 text-[10px] tracking-[0.3em] uppercase"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  color: "#c9a96e",
                  border: "1px solid rgba(201,169,110,0.28)",
                  background: "rgba(201,169,110,0.06)",
                }}
              >
                Sign in to Order
              </button>
            )}

          </div>{/* end content col */}

        </div>{/* end panel */}
      </div>{/* end backdrop */}
    </>
  );
}

export default ProductModal;