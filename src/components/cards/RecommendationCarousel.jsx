import { useRef, useState, useMemo } from "react";
import ProductCard from "./ProductCard";

export default function RecommendationCarousel({ allProducts = [], allOrders = [] }) {
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // ── Top Selling Algorithm ─────────────────────────────────────────────
  const recommendations = useMemo(() => {
    if (!allProducts.length) return [];

    // 1. Calculate total sold quantity for each base product
    const salesMap = new Map();

    allOrders.forEach((order) => {
      if (order.status === "cancelled") return; // ignore cancelled orders

      order.items.forEach((item) => {
        const baseProductId = item.productId || item.product?.id || item.product?.productId;
        if (!baseProductId) return;

        // Extract only the base ID (remove custom suffix if any)
        const cleanId = String(baseProductId).split(".")[0];

        const quantity = item.quantity || 1;
        salesMap.set(cleanId, (salesMap.get(cleanId) || 0) + quantity);
      });
    });

    // 2. Score each product
    const scoredProducts = allProducts
      .filter((p) => p && p.id && p.name) // safety filter
      .map((product) => {
        const productId = String(product.id);
        const cleanId = productId.split(".")[0];

        const totalSold = salesMap.get(cleanId) || 0;

        // Popularity fallback when no sales
        const popularityScore = (product.rating || 0) * (product.reviewsCount || 0);

        return {
          ...product,
          score: totalSold * 100 + popularityScore, // sales heavily weighted
          totalSold,
        };
      });

    // 3. Sort by score (descending) and limit to 12
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [allProducts, allOrders]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  if (!recommendations.length) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        .reco-scroll {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .reco-scroll::-webkit-scrollbar { height: 2px; }
        .reco-scroll::-webkit-scrollbar-track { background: rgba(201,169,110,0.05); }
        .reco-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.25); }

        .reco-item { scroll-snap-align: start; }

        .reco-arrow {
          transition: background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease, transform 0.15s ease;
        }
        .reco-arrow:hover:not(:disabled) {
          background: rgba(201,169,110,0.12);
          border-color: rgba(201,169,110,0.5);
        }
        .reco-arrow:active:not(:disabled) { transform: scale(0.93); }
        .reco-arrow:disabled { opacity: 0.2; cursor: default; }
      `}</style>

      <div
        className="relative mt-20 pt-12"
        style={{
          fontFamily: "'Jost', sans-serif",
          borderTop: "1px solid rgba(201,169,110,0.12)",
        }}
      >
        {/* ── Section Header ── */}
        <div className="flex items-end justify-between mb-10 px-1">
          <div>
            <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.5em] uppercase mb-2 opacity-70">
              CURATED FOR YOU
            </p>
            <h2
              className="font-light leading-none tracking-wide text-[#f5f0e8]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              }}
            >
              Top Selling{" "}
              <span
                className="italic text-[#c9a96e]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Picks
              </span>
            </h2>
          </div>

          {/* Arrow controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scroll(-1)}
              disabled={atStart}
              className="reco-arrow w-9 h-9 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]/60"
              aria-label="Scroll left"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={atEnd}
              className="reco-arrow w-9 h-9 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]/60"
              aria-label="Scroll right"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Scroll Track ── */}
        <div className="relative">
          {/* Left fade mask */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-2 w-16 z-10 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to right, #0d0a05, transparent)",
              opacity: atStart ? 0 : 1,
            }}
          />
          {/* Right fade mask */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-2 w-16 z-10 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to left, #0d0a05, transparent)",
              opacity: atEnd ? 0 : 1,
            }}
          />

          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="reco-scroll flex gap-px pb-3"
            style={{ background: "transparent" }}
          >
            {recommendations.map((product, i) => (
              <div
                key={product.id}
                className="reco-item flex-shrink-0 w-[280px] sm:w-[300px]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom count hint ── */}
        <div className="flex items-center justify-between mt-5 px-1">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#c9a96e]/30 to-transparent" />
            <p className="text-[#f5f0e8]/18 text-[9px] tracking-[0.4em] uppercase">
              {recommendations.length} top selling
            </p>
          </div>
          <p className="text-[#f5f0e8]/15 text-[9px] tracking-[0.3em] uppercase hidden sm:block">
            Scroll to explore →
          </p>
        </div>
      </div>
    </>
  );
}

//=========================================================================



// ProductCard.jsx — Fixed 380px tall, luxury dark aesthetic
// Drop-in replacement. Props: { product }

// export default function ProductCard({ product }) {
//   const {
//     name = "Unnamed Product",
//     price,
//     originalPrice,
//     image,
//     images,
//     rating = 0,
//     reviewsCount = 0,
//     category = "",
//     totalSold,
//     badge,
//     inStock = true,
//   } = product || {};

//   const imgSrc = image || (Array.isArray(images) && images[0]) || null;
//   const discount =
//     originalPrice && price
//       ? Math.round(((originalPrice - price) / originalPrice) * 100)
//       : null;

//   const stars = Math.round(Math.min(5, Math.max(0, rating)));

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

//         .pc-root {
//           font-family: 'Jost', sans-serif;
//           width: 100%;
//           height: 380px;               /* ← FIXED HEIGHT — never changes */
//           display: flex;
//           flex-direction: column;
//           background: #111009;
//           border: 1px solid rgba(201,169,110,0.10);
//           position: relative;
//           overflow: hidden;
//           cursor: pointer;
//           transition: border-color 0.25s ease, transform 0.2s ease;
//         }
//         .pc-root:hover {
//           border-color: rgba(201,169,110,0.32);
//           transform: translateY(-2px);
//         }

//         /* ── Image zone — fixed 210px ── */
//         .pc-img-wrap {
//           flex: 0 0 210px;
//           position: relative;
//           background: #0d0a06;
//           overflow: hidden;
//         }
//         .pc-img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94);
//         }
//         .pc-root:hover .pc-img { transform: scale(1.06); }

//         /* placeholder when no image */
//         .pc-img-placeholder {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: rgba(201,169,110,0.15);
//           font-size: 2.5rem;
//           letter-spacing: 0.1em;
//           background: linear-gradient(135deg, #0d0a06 0%, #1a1408 100%);
//         }

//         /* discount badge */
//         .pc-badge {
//           position: absolute;
//           top: 10px;
//           left: 10px;
//           padding: 2px 8px;
//           font-size: 9px;
//           letter-spacing: 0.15em;
//           font-weight: 300;
//           text-transform: uppercase;
//           background: rgba(201,169,110,0.9);
//           color: #0d0a05;
//         }

//         /* out-of-stock overlay */
//         .pc-oos-overlay {
//           position: absolute;
//           inset: 0;
//           background: rgba(13,10,5,0.62);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .pc-oos-label {
//           font-size: 9px;
//           letter-spacing: 0.35em;
//           color: rgba(245,240,232,0.5);
//           text-transform: uppercase;
//           border: 1px solid rgba(245,240,232,0.15);
//           padding: 4px 12px;
//         }

//         /* ── Info zone — fills remaining 170px ── */
//         .pc-info {
//           flex: 1 1 0;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           padding: 14px 14px 12px;
//           min-height: 0;            /* critical: prevents flex children overflowing */
//         }

//         .pc-category {
//           font-size: 9px;
//           font-weight: 300;
//           letter-spacing: 0.4em;
//           text-transform: uppercase;
//           color: rgba(201,169,110,0.55);
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           margin-bottom: 5px;
//         }

//         .pc-name {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.05rem;
//           font-weight: 400;
//           color: #f5f0e8;
//           line-height: 1.3;
//           /* Clamp to exactly 2 lines */
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           margin: 0;
//         }

//         .pc-stars {
//           display: flex;
//           align-items: center;
//           gap: 3px;
//           margin-top: 8px;
//         }
//         .pc-star { color: rgba(201,169,110,0.25); font-size: 10px; }
//         .pc-star.filled { color: #c9a96e; }
//         .pc-reviews {
//           font-size: 9px;
//           font-weight: 300;
//           color: rgba(245,240,232,0.3);
//           letter-spacing: 0.1em;
//           margin-left: 5px;
//         }

//         /* ── Price row ── */
//         .pc-price-row {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           border-top: 1px solid rgba(201,169,110,0.08);
//           padding-top: 10px;
//           margin-top: auto;
//         }
//         .pc-price {
//           font-family: 'Jost', sans-serif;
//           font-size: 1rem;
//           font-weight: 300;
//           letter-spacing: 0.05em;
//           color: #c9a96e;
//         }
//         .pc-original {
//           font-size: 0.72rem;
//           color: rgba(245,240,232,0.25);
//           text-decoration: line-through;
//           margin-left: 6px;
//           font-weight: 300;
//         }
//         .pc-sold {
//           font-size: 8.5px;
//           letter-spacing: 0.25em;
//           color: rgba(245,240,232,0.22);
//           text-transform: uppercase;
//           font-weight: 300;
//         }

//         /* hover CTA line */
//         .pc-cta-line {
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           height: 2px;
//           background: linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent);
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }
//         .pc-root:hover .pc-cta-line { opacity: 1; }
//       `}</style>

//       <div className="pc-root">
//         {/* ── Image ── */}
//         <div className="pc-img-wrap">
//           {imgSrc ? (
//             <img src={imgSrc} alt={name} className="pc-img" loading="lazy" />
//           ) : (
//             <div className="pc-img-placeholder">✦</div>
//           )}

//           {discount && inStock && (
//             <div className="pc-badge">−{discount}%</div>
//           )}
//           {badge && !discount && inStock && (
//             <div className="pc-badge">{badge}</div>
//           )}
//           {!inStock && (
//             <div className="pc-oos-overlay">
//               <span className="pc-oos-label">Out of Stock</span>
//             </div>
//           )}
//         </div>

//         {/* ── Info ── */}
//         <div className="pc-info">
//           <div>
//             {category && <p className="pc-category">{category}</p>}
//             <h3 className="pc-name">{name}</h3>

//             {(rating > 0 || reviewsCount > 0) && (
//               <div className="pc-stars">
//                 {[1, 2, 3, 4, 5].map((s) => (
//                   <span key={s} className={`pc-star${s <= stars ? " filled" : ""}`}>★</span>
//                 ))}
//                 {reviewsCount > 0 && (
//                   <span className="pc-reviews">({reviewsCount})</span>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="pc-price-row">
//             <div style={{ display: "flex", alignItems: "baseline" }}>
//               {price != null && (
//                 <span className="pc-price">
//                   {typeof price === "number" ? `₹${price.toLocaleString("en-IN")}` : price}
//                 </span>
//               )}
//               {originalPrice != null && (
//                 <span className="pc-original">
//                   {typeof originalPrice === "number"
//                     ? `₹${originalPrice.toLocaleString("en-IN")}`
//                     : originalPrice}
//                 </span>
//               )}
//             </div>
//             {totalSold > 0 && (
//               <span className="pc-sold">{totalSold} sold</span>
//             )}
//           </div>
//         </div>

//         {/* hover accent line */}
//         <div className="pc-cta-line" />
//       </div>
//     </>
//   );
// }