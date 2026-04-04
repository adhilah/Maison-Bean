// import React, { useState, useEffect, memo } from "react";
// import axios from "axios";
// import ProductModal from "./cards/ProductModal";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";
// import { FiShoppingCart } from "react-icons/fi";

// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const { toggleWishlist, isWishlisted } = useWishlist();
//   const { addToCart } = useCart();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("API ERROR:", err));
//   }, []);

//   if (products.length === 0) {
//     return (
//       <p className="text-center py-20 text-gray-600">
//         Loading products...
//       </p>
//     );
//   }

//   return (
//     <section className="bg-[#ded4b0] px-4 sm:px-10 py-12">
//       <h2 className="text-4xl font-bold text-center text-[#5c4033] mb-10">
//         Featured Products
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//         {products.slice(0, 8).map((product) => {
//           const wishlisted = isWishlisted(product);

//           return (
//             <div
//               key={product.id}
//               onClick={() => setSelectedProduct(product)}
//               className="relative cursor-pointer bg-white rounded-xl shadow
//                          hover:shadow-lg transition
//                          flex flex-col h-full overflow-hidden"
//             >
//               {/* Wishlist */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleWishlist(product);
//                 }}
//                 className="absolute top-3 right-3 z-10 p-1"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   className={`w-6 h-6 transition ${
//                     wishlisted
//                       ? "fill-red-500 stroke-red-500"
//                       : "fill-none stroke-gray-400 hover:stroke-red-500"
//                   }`}
//                   strokeWidth="2"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 21s-7.5-4.35-10-8.5C.5 8 3.5 4 7.5 4c2 0 3.5 1 4.5 2.5C13 5 14.5 4 16.5 4 20.5 4 23.5 8 22 12.5 19.5 16.65 12 21 12 21z"
//                   />
//                 </svg>
//               </button>

//               {/* Image */}
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="h-44 w-full object-cover"
//               />

//               {/* Content */}
//               <div className="p-4 flex flex-col flex-1">
//                 <h3 className="font-semibold text-lg text-gray-900">
//                   {product.name}
//                 </h3>

//                 <p className="text-sm text-gray-500 mt-1 line-clamp-2">
//                   {product.description}
//                 </p>

//                 {/* Bottom section */}
//                 <div className="mt-auto pt-4">
//                   <p className="font-bold text-[#9c7635] mb-3">
//                     ₹{product.basePrice}
//                   </p>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       addToCart(product);
//                     }}
//                     className="w-full bg-[#9c7635] hover:bg-[#8a6630]
//                                text-white font-medium py-2.5 rounded-lg
//                                flex items-center justify-center gap-2 transition"
//                   >
//                     <FiShoppingCart size={18} />
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Modal */}
//       {selectedProduct && (
//         <ProductModal
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//         />
//       )}
//     </section>
//   );
// };

// export default memo(FeaturedProducts);




import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import ProductModal from "./cards/ProductModal";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const HeartIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    style={{
      fill: filled ? "#c9a96e" : "none",
      stroke: filled ? "#c9a96e" : "rgba(245,240,232,0.6)",
      transition: "all 0.3s"
    }}>
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const SkeletonCard = () => (
  <div style={{
    background: "#110d07",
    border: "1px solid rgba(201,169,110,0.06)",
    overflow: "hidden",
  }}>
    <div style={{
      height: "260px",
      background: "linear-gradient(90deg, #1a1510 25%, #211a12 50%, #1a1510 75%)",
      backgroundSize: "200% 100%",
      animation: "mb-shimmer 1.8s infinite",
    }} />
    <div style={{ padding: "1.5rem" }}>
      <div style={{ height: "7px", width: "38%", background: "#1e1810", marginBottom: "0.8rem", borderRadius: "1px" }} />
      <div style={{ height: "16px", width: "72%", background: "#1e1810", marginBottom: "0.6rem", borderRadius: "1px" }} />
      <div style={{ height: "7px", width: "90%", background: "#1e1810", marginBottom: "0.35rem", borderRadius: "1px" }} />
      <div style={{ height: "7px", width: "55%", background: "#1e1810", borderRadius: "1px" }} />
    </div>
  </div>
);

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => { setProducts(res.data); setLoading(false); })
      .catch((err) => { console.error("API ERROR:", err); setLoading(false); });
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes mb-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes mb-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mb-fp-card {
          position: relative;
          background: #110d07;
          border: 1px solid rgba(201,169,110,0.08);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: border-color 0.4s, transform 0.4s;
          animation: mb-fadeUp 0.7s ease both;
        }
        .mb-fp-card:hover {
          border-color: rgba(201,169,110,0.28);
          transform: translateY(-4px);
        }
        .mb-fp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, #c9a96e, transparent);
          transform: scaleX(0);
          transition: transform 0.5s ease;
          z-index: 3;
        }
        .mb-fp-card:hover::before { transform: scaleX(1); }

        .mb-fp-img-wrap {
          position: relative;
          height: 260px;
          overflow: hidden;
          background: #1a1510;
        }
        .mb-fp-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.82;
          transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s;
        }
        .mb-fp-card:hover .mb-fp-img-wrap img {
          transform: scale(1.07);
          opacity: 1;
        }
        .mb-fp-img-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(to top, #110d07, transparent);
          pointer-events: none;
        }

        .mb-fp-wish-btn {
          position: absolute;
          top: 12px; right: 12px; z-index: 3;
          width: 30px; height: 30px;
          background: rgba(8,5,2,0.65);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s, transform 0.2s;
        }
        .mb-fp-wish-btn:hover {
          background: rgba(201,169,110,0.2);
          border-color: rgba(201,169,110,0.5);
          transform: scale(1.1);
        }

        .mb-fp-body {
          padding: 1.4rem 1.5rem 1.6rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          border-top: 1px solid rgba(201,169,110,0.06);
        }

        .mb-fp-category {
          font-family: 'Jost', sans-serif;
          font-size: 0.5rem;
          font-weight: 200;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 0.55rem;
          opacity: 0.75;
        }

        .mb-fp-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 300;
          color: #f5f0e8;
          line-height: 1.2;
          margin-bottom: 0.6rem;
          letter-spacing: 0.02em;
          transition: color 0.3s;
        }
        .mb-fp-card:hover .mb-fp-name { color: #c9a96e; }

        .mb-fp-desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.68rem;
          font-weight: 200;
          line-height: 1.85;
          color: rgba(245,240,232,0.42);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 1.4rem;
        }

        .mb-fp-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(201,169,110,0.08);
          padding-top: 1rem;
        }

        .mb-fp-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 300;
          color: #c9a96e;
        }

        .mb-fp-cart-btn {
          font-family: 'Jost', sans-serif;
          font-size: 0.55rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9a96e;
          background: transparent;
          border: 1px solid rgba(201,169,110,0.28);
          cursor: pointer;
          padding: 0.55rem 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          transition: background 0.3s, color 0.3s, border-color 0.3s;
          white-space: nowrap;
        }
        .mb-fp-cart-btn:hover {
          background: #c9a96e;
          color: #0d0a05;
          border-color: #c9a96e;
        }
        .mb-fp-cart-btn.added {
          background: rgba(50,100,50,0.15);
          color: #7ec87e;
          border-color: rgba(100,180,100,0.25);
        }

        .mb-fp-view-all {
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.5);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: color 0.3s;
        }
        .mb-fp-view-all::after {
          content: '';
          display: block;
          width: 28px; height: 1px;
          background: currentColor;
          transition: width 0.3s;
        }
        .mb-fp-view-all:hover { color: #c9a96e; }
        .mb-fp-view-all:hover::after { width: 44px; }
      `}</style>

      <section style={{
        background: "#0d0a05",
        padding: "7rem 2rem",
        fontFamily: "'Jost', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle top glow */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "4rem",
          }}>
            <div>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.55rem", fontWeight: 200,
                letterSpacing: "0.5em", textTransform: "uppercase",
                color: "#c9a96e", marginBottom: "0.9rem",
              }}>
                Handpicked for you
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 300,
                lineHeight: 1.05, letterSpacing: "0.02em",
                color: "#f5f0e8",
              }}>
                Featured <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Products</em>
              </h2>
              <div style={{
                width: "48px", height: "1px",
                background: "linear-gradient(to right, #c9a96e, transparent)",
                marginTop: "1.1rem",
              }} />
            </div>
            <a href="/menu" className="mb-fp-view-all">View All</a>
          </div>

          {/* Grid — tight 1px gap like a tiled wall */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1px",
            background: "rgba(201,169,110,0.07)",
            border: "1px solid rgba(201,169,110,0.07)",
          }}>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : products.slice(0, 8).map((product, idx) => {
                  const wishlisted = isWishlisted(product);
                  const isAdded = addedId === product.id;
                  return (
                    <div
                      key={product.id}
                      className="mb-fp-card"
                      style={{ animationDelay: `${idx * 0.06}s` }}
                      onClick={() => setSelectedProduct(product)}
                      onMouseEnter={() => setHoveredId(product.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <div className="mb-fp-img-wrap">
                        <img src={product.image} alt={product.name} />
                        <div className="mb-fp-img-fade" />
                        <button
                          className="mb-fp-wish-btn"
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                          aria-label="Toggle wishlist"
                        >
                          <HeartIcon filled={wishlisted} />
                        </button>
                      </div>

                      <div className="mb-fp-body">
                        {product.category && <p className="mb-fp-category">{product.category}</p>}
                        <h3 className="mb-fp-name">{product.name}</h3>
                        <p className="mb-fp-desc">{product.description}</p>
                        <div className="mb-fp-footer">
                          <span className="mb-fp-price">₹{product.basePrice}</span>
                          <button
                            className={`mb-fp-cart-btn${isAdded ? " added" : ""}`}
                            onClick={(e) => handleAddToCart(e, product)}
                          >
                            <CartIcon />
                            {isAdded ? "Added ✓" : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
};

export default memo(FeaturedProducts);