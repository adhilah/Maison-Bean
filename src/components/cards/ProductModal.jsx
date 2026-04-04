
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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24"
    style={{
      fill: filled ? "#c4a96a" : "none",
      stroke: "#c4a96a",
      strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round",
      transition: "all 0.3s",
    }}>
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const CustomizeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M12 2v2M12 20v2M4.93 4.93l1.41 1.41M18.66 18.66l1.41 1.41M2 12h2M20 12h2" />
  </svg>
);

function ProductModal({ product, onClose }) {
  const [visible, setVisible]       = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgLoaded, setImgLoaded]   = useState(false);
  const overlayRef                  = useRef(null);
  const navigate                    = useNavigate();

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart }                    = useCart();
  const { user }                         = useAuth();

  const wishlisted = isWishlisted(product);
  const isCustomer = user?.role === "customer";

  // Animate in
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  // Escape to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
    setTimeout(() => navigate(`/customize/${product.id}`), 360);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        @keyframes mb-modalIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes mb-modalOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(16px) scale(0.97); }
        }
        @keyframes mb-imgReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }

        .mb-modal-overlay {
          position: fixed; inset: 0; z-index: 500;
          background: rgba(5,4,2,0.88);
          backdrop-filter: blur(18px);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          transition: opacity 0.35s ease;
        }
        .mb-modal-overlay.visible  { opacity: 1; }
        .mb-modal-overlay.hidden   { opacity: 0; }

        .mb-modal-panel {
          position: relative;
          background: #13100a;
          border: 1px solid rgba(196,169,106,0.18);
          width: 100%; max-width: 860px;
          max-height: 90vh; overflow: hidden;
          display: grid; grid-template-columns: 1fr 1fr;
        }
        .mb-modal-panel.visible {
          animation: mb-modalIn 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }
        .mb-modal-panel.hidden  {
          animation: mb-modalOut 0.3s ease both;
        }

        /* Corner brackets */
        .mb-modal-panel::before, .mb-modal-panel::after {
          content: ''; position: absolute;
          width: 18px; height: 18px;
          border-color: rgba(196,169,106,0.35); border-style: solid;
          z-index: 2;
        }
        .mb-modal-panel::before { top: 10px; left: 10px; border-width: 1px 0 0 1px; }
        .mb-modal-panel::after  { bottom: 10px; right: 10px; border-width: 0 1px 1px 0; }

        /* Close btn */
        .mb-modal-close {
          position: absolute; top: 14px; right: 14px; z-index: 10;
          width: 32px; height: 32px;
          background: rgba(10,8,4,0.6);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(196,169,106,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(250,248,245,0.6);
          transition: background 0.3s, color 0.3s, transform 0.2s;
        }
        .mb-modal-close:hover {
          background: rgba(108,82,37,0.5);
          color: #c4a96a; transform: scale(1.08);
        }

        /* Image side */
        .mb-modal-img-side {
          position: relative; overflow: hidden; background: #1e1810;
          min-height: 420px;
        }
        .mb-modal-img-side img {
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(0.85);
          transition: transform 8s ease;
        }
        .mb-modal-img-side img.loaded { transform: scale(1.03); }

        .mb-modal-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, transparent 50%, rgba(10,8,4,0.6) 100%);
        }

        /* Wishlist btn on image */
        .mb-modal-wish-btn {
          position: absolute; bottom: 16px; left: 16px; z-index: 3;
          display: flex; align-items: center; gap: 0.5rem;
          background: rgba(10,8,4,0.55);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(196,169,106,0.2);
          padding: 0.5rem 0.85rem;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 0.52rem; font-weight: 200;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: #c4a96a;
          transition: background 0.3s, border-color 0.3s;
        }
        .mb-modal-wish-btn:hover,
        .mb-modal-wish-btn.wishlisted {
          background: rgba(108,82,37,0.35);
          border-color: #c4a96a;
        }

        /* Content side */
        .mb-modal-content {
          padding: 2.5rem 2rem 2rem;
          display: flex; flex-direction: column;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(108,82,37,0.3) transparent;
        }

        .mb-modal-category {
          font-family: 'Jost', sans-serif;
          font-size: 0.52rem; font-weight: 300;
          letter-spacing: 0.4em; text-transform: uppercase;
          color: rgba(196,169,106,0.55); margin-bottom: 0.6rem;
        }
        .mb-modal-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 300;
          color: #faf8f5; line-height: 1.1;
          margin-bottom: 0.5rem;
        }
        .mb-modal-divider {
          height: 1px; width: 40px;
          background: linear-gradient(to right, #6c5225, transparent);
          margin: 1rem 0;
        }
        .mb-modal-desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem; font-weight: 200;
          line-height: 1.9; letter-spacing: 0.03em;
          color: rgba(250,248,245,0.45);
          margin-bottom: 1.5rem; flex: 1;
        }

        /* Meta pills */
        .mb-modal-meta {
          display: flex; flex-wrap: wrap; gap: 0.5rem;
          margin-bottom: 1.75rem;
        }
        .mb-modal-pill {
          font-family: 'Jost', sans-serif;
          font-size: 0.5rem; font-weight: 200;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(196,169,106,0.5);
          border: 1px solid rgba(196,169,106,0.15);
          padding: 0.25rem 0.7rem;
        }

        .mb-modal-price-row {
          display: flex; align-items: baseline; gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(196,169,106,0.1);
        }
        .mb-modal-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 300;
          color: #c4a96a; letter-spacing: 0.03em;
        }
        .mb-modal-price-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.52rem; font-weight: 200;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(196,169,106,0.4);
        }

        /* CTA buttons */
        .mb-modal-btn-primary {
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem; font-weight: 300;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #faf8f5; background: #6c5225;
          border: none; cursor: pointer;
          padding: 0.9rem 1.5rem;
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          flex: 1;
          transition: background 0.3s, letter-spacing 0.3s;
        }
        .mb-modal-btn-primary:hover   { background: #8a6a30; letter-spacing: 0.35em; }
        .mb-modal-btn-primary.added   { background: #2d5a27; }

        .mb-modal-btn-secondary {
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem; font-weight: 300;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: #c4a96a;
          background: transparent;
          border: 1px solid rgba(196,169,106,0.25);
          cursor: pointer;
          padding: 0.9rem 1.5rem;
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          flex: 1;
          transition: background 0.3s, border-color 0.3s, letter-spacing 0.3s;
        }
        .mb-modal-btn-secondary:hover {
          background: rgba(108,82,37,0.12);
          border-color: #c4a96a;
          letter-spacing: 0.32em;
        }

        @media (max-width: 640px) {
          .mb-modal-panel { grid-template-columns: 1fr; }
          .mb-modal-img-side { min-height: 240px; }
        }
      `}</style>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`mb-modal-overlay ${visible ? "visible" : "hidden"}`}
        onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      >
        <div className={`mb-modal-panel ${visible ? "visible" : "hidden"}`}>

          {/* Close */}
          <button className="mb-modal-close" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </button>

          {/* ── Image side ── */}
          <div className="mb-modal-img-side">
            <img
              src={product.image}
              alt={product.name}
              className={imgLoaded ? "loaded" : ""}
              onLoad={() => setImgLoaded(true)}
            />
            <div className="mb-modal-img-overlay" />

            {/* Wishlist pill — customers only */}
            {isCustomer && (
              <button
                className={`mb-modal-wish-btn${wishlisted ? " wishlisted" : ""}`}
                onClick={() => toggleWishlist(product)}
              >
                <HeartIcon filled={wishlisted} />
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>
            )}
          </div>

          {/* ── Content side ── */}
          <div className="mb-modal-content">
            {product.category && (
              <p className="mb-modal-category">{product.category}</p>
            )}
            <h2 className="mb-modal-name">{product.name}</h2>
            <div className="mb-modal-divider" />

            <p className="mb-modal-desc">
              {product.description || "A carefully crafted specialty item, made with the finest ingredients and served with intention."}
            </p>

            {/* Meta pills */}
            <div className="mb-modal-meta">
              {product.tags?.map((tag) => (
                <span key={tag} className="mb-modal-pill">{tag}</span>
              ))}
              {!product.tags && (
                <>
                  <span className="mb-modal-pill">Artisan</span>
                  <span className="mb-modal-pill">Small Batch</span>
                  <span className="mb-modal-pill">Fresh Daily</span>
                </>
              )}
            </div>

            {/* Price */}
            <div className="mb-modal-price-row">
              <span className="mb-modal-price">₹{product.basePrice}</span>
              <span className="mb-modal-price-label">Base price</span>
            </div>

            {/* CTAs — customers only */}
            {isCustomer ? (
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  className={`mb-modal-btn-primary${addedToCart ? " added" : ""}`}
                  onClick={handleAddToCart}
                >
                  <CartIcon />
                  {addedToCart ? "Added ✓" : "Add to Cart"}
                </button>
                <button
                  className="mb-modal-btn-secondary"
                  onClick={handleCustomize}
                >
                  <CustomizeIcon />
                  Customize
                </button>
              </div>
            ) : (
              <button
                className="mb-modal-btn-primary"
                onClick={() => navigate("/login")}
                style={{ width: "100%" }}
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