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

