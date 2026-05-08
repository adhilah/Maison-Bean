// import { useState, useEffect, useRef } from "react";
// import { createPortal } from "react-dom";
// import { useSearch } from "../context/SearchContext";

// const SearchModal = ({ products }) => {
//   const { closeSearch, setSelectedProduct } = useSearch();
//   const [query, setQuery] = useState("");
//   const inputRef = useRef(null);

//   const filtered = products.filter(
//     (p) =>
//       p.name.toLowerCase().includes(query.toLowerCase()) ||
//       p.category.toLowerCase().includes(query.toLowerCase())
//   );

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   return createPortal(
//     <>
//       {/* Overlay */}
//       <div
//         className="fixed inset-0 bg-black/80 z-[999999]"
//         onClick={closeSearch}
//       />

//       {/* Modal */}
//       <div className="fixed inset-0 z-[9999999] flex flex-col items-center pt-20 px-4">
//         <div
//           className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Search Bar */}
//           <div className="p-6 bg-gradient-to-r from-[#9c7635] to-[#7a5c2a]">
//             <div className="relative">
//               <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-3xl text-white">
//                 search
//               </span>

//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search coffee, croissant, tea..."
//                 className="w-full pl-16 pr-16 py-5 text-xl bg-white/90 rounded-2xl focus:outline-none"
//               />

//               <button
//                 onClick={closeSearch}
//                 className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl text-white"
//               >
//                 ✕
//               </button>
//             </div>
//           </div>

//           {/* Results */}
//           <div className="max-h-96 overflow-y-auto bg-white">
//             {filtered.length === 0 ? (
//               <div className="py-20 text-center text-2xl text-gray-500">
//                 {query ? `No results for "${query}"` : "Start typing to search..."}
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
//                 {filtered.map((product) => (
//                   <div
//                     key={product.id}
//                     onClick={() => {
//                       setSelectedProduct(product);
//                       closeSearch();
//                     }}
//                     className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer shadow-md"
//                   >
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-28 h-28 object-cover rounded-2xl"
//                     />
//                     <div className="flex-1">
//                       <h3 className="text-2xl font-bold">{product.name}</h3>
//                       <p className="text-xl text-[#9c7635] font-semibold">
//                         ${Number(product.basePrice || 0).toFixed(2)}
//                       </p>
//                       <p className="text-gray-600">{product.category}</p>
//                     </div>
//                     <span className="text-4xl text-gray-400">›</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>,
//     document.body
//   );
// };

// export default SearchModal;

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import api from "../services/api";
import { useSearch } from "../context/SearchContext";

const SearchModal = ({ products }) => {
  const { closeSearch, selectProduct } = useSearch(); // ← changed: selectProduct instead of setSelectedProduct
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e) => { if (e.key === "Escape") closeSearch(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
  useEffect(() => {

  if (!query.trim()) {
    setFiltered([]);
    return;
  }

  const timer = setTimeout(async () => {

    try {

      const res = await api.get(
        `/products/search?term=${query}`
      );

      setFiltered(res.data);

    } catch (err) {

      console.error(err);

      setFiltered([]);

    }

  }, 300);

  return () => clearTimeout(timer);

}, [query]);

  return createPortal(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes mbOverlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes mbModalIn {
          from { opacity: 0; transform: translateY(-18px) scaleY(0.97); }
          to   { opacity: 1; transform: translateY(0)     scaleY(1); }
        }
        @keyframes mbResultIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mbLineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes mbSpin {
          to { transform: rotate(360deg); }
        }

        .mb-overlay {
          animation: mbOverlayIn 0.25s ease forwards;
        }
        .mb-modal {
          animation: mbModalIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top center;
        }
        .mb-result-item {
          animation: mbResultIn 0.3s ease both;
          border: 1px solid rgba(201,169,110,0.08);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .mb-result-item:hover {
          border-color: rgba(201,169,110,0.3);
          background: rgba(201,169,110,0.04);
        }
        .mb-input-line {
          transform-origin: left;
          animation: mbLineGrow 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }
        .mb-close-btn {
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .mb-close-btn:hover {
          color: #c9a96e;
          transform: rotate(90deg);
        }
        .mb-scroll::-webkit-scrollbar { width: 3px; }
        .mb-scroll::-webkit-scrollbar-track { background: transparent; }
        .mb-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.18); }

        .mb-category-tag {
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .mb-category-tag:hover {
          color: #c9a96e;
          border-color: rgba(201,169,110,0.45);
          cursor: pointer;
        }
      `}</style>

      {/* ── Overlay ── */}
      <div
        className="mb-overlay fixed inset-0 z-[999998]"
        style={{ background: "rgba(5,3,1,0.88)", backdropFilter: "blur(6px)" }}
        onClick={closeSearch}
      />

      {/* ── Modal ── */}
      <div
        className="mb-modal fixed inset-0 z-[999999] flex flex-col items-center pt-16 px-4 pointer-events-none"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        <div
          className="w-full max-w-3xl pointer-events-auto flex flex-col"
          style={{ maxHeight: "calc(100vh - 8rem)" }}
          onClick={(e) => e.stopPropagation()}
        >

          {/* ── Search Header ── */}
          <div
            className="flex-shrink-0"
            style={{
              background: "#110d07",
              border: "1px solid rgba(201,169,110,0.15)",
              borderBottom: "none",
              padding: "2rem 2rem 0",
            }}
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-between mb-5">
              <p style={{
                color: "rgba(201,169,110,0.55)",
                fontSize: "9px",
                letterSpacing: "0.5em",
                textTransform: "uppercase",
              }}>
                MAISON BEAN · SEARCH
              </p>
              <button
                onClick={closeSearch}
                className="mb-close-btn"
                style={{ color: "rgba(245,240,232,0.25)", fontSize: "18px", lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            {/* Input */}
            <div className="relative pb-5">
              {/* Search icon */}
              <svg
                style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-60%)", opacity: 0.25 }}
                width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="#f5f0e8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search coffees, teas, pastries…"
                style={{
                  width: "100%",
                  paddingLeft: "2rem",
                  paddingRight: "3rem",
                  paddingTop: "0.25rem",
                  paddingBottom: "0.75rem",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#f5f0e8",
                  fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                }}
              />

              {/* Clear button */}
              {query && (
                <button
                  onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                  style={{
                    position: "absolute", right: 0, top: "50%", transform: "translateY(-60%)",
                    color: "rgba(201,169,110,0.45)", fontSize: "13px", letterSpacing: "0.3em",
                    textTransform: "uppercase", transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.color = "#c9a96e"}
                  onMouseLeave={e => e.target.style.color = "rgba(201,169,110,0.45)"}
                >
                  CLEAR
                </button>
              )}

              {/* Animated underline */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
                background: "linear-gradient(90deg, rgba(201,169,110,0.6), rgba(201,169,110,0.1))",
              }}>
                <div
                  className="mb-input-line"
                  style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(90deg, #c9a96e, rgba(201,169,110,0.3))",
                    opacity: focused ? 1 : 0,
                    transition: "opacity 0.2s ease",
                  }}
                />
              </div>
            </div>

            {/* Category quick-filters */}
            <div
              className="flex gap-2 flex-wrap pb-4"
              style={{ borderTop: "1px solid rgba(201,169,110,0.07)", paddingTop: "1rem" }}
            >
              {["All", ...new Set(products.map((p) => p.category))].map((cat) => (
                <button
                  key={cat}
                  className="mb-category-tag"
                  onClick={() => setQuery(cat === "All" ? "" : cat)}
                  style={{
                    border: "1px solid rgba(201,169,110,0.14)",
                    padding: "3px 12px",
                    fontSize: "9px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "rgba(245,240,232,0.35)",
                    background: "transparent",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── Results ── */}
          <div
            className="mb-scroll flex-1 overflow-y-auto"
            style={{
              background: "#0d0a05",
              border: "1px solid rgba(201,169,110,0.15)",
              borderTop: "1px solid rgba(201,169,110,0.08)",
            }}
          >
            {/* Empty state */}
            {filtered.length === 0 ? (
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", padding: "4rem 2rem", gap: "1rem",
              }}>
                <div style={{
                  width: "44px", height: "44px",
                  border: "1px solid rgba(201,169,110,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(201,169,110,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.3rem", fontWeight: 300, fontStyle: "italic",
                  color: "rgba(245,240,232,0.25)",
                }}>
                  {query ? `Nothing found for "${query}"` : "Begin your search above…"}
                </p>
                {query && (
                  <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.15)" }}>
                    Try a different keyword or category
                  </p>
                )}
              </div>
            ) : (
              <>
                {/* Result count */}
                <div style={{
                  padding: "0.75rem 1.5rem",
                  borderBottom: "1px solid rgba(201,169,110,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(245,240,232,0.2)" }}>
                    {filtered.length} {filtered.length === 1 ? "result" : "results"}
                    {query && <span style={{ color: "rgba(201,169,110,0.4)" }}> for "{query}"</span>}
                  </p>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[...Array(Math.min(filtered.length, 5))].map((_, i) => (
                      <div key={i} style={{ width: "4px", height: "4px", background: "rgba(201,169,110,0.25)", transform: "rotate(45deg)" }} />
                    ))}
                  </div>
                </div>

                {/* Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1px", padding: "1rem", paddingTop: "0.75rem" }}>
                  {filtered.map((product, i) => (
                    <div
                      key={product.id}
                      className="mb-result-item"
                      onClick={() => selectProduct(product)} // ← changed: was setSelectedProduct(product); closeSearch()
                      style={{
                        display: "flex", alignItems: "center", gap: "1.25rem",
                        padding: "1rem 1.25rem",
                        cursor: "pointer",
                        animationDelay: `${i * 0.04}s`,
                      }}
                    >
                      {/* Image */}
                      <div style={{
                        width: "56px", height: "56px", flexShrink: 0,
                        border: "1px solid rgba(201,169,110,0.12)",
                        overflow: "hidden", background: "#1a1510",
                      }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                          onMouseEnter={e => e.target.style.opacity = 1}
                          onMouseLeave={e => e.target.style.opacity = 0.85}
                        />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.05rem", fontWeight: 400,
                          color: "rgba(245,240,232,0.75)",
                          marginBottom: "2px",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>
                          {product.name}
                        </p>
                        <p style={{
                          fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase",
                          color: "rgba(201,169,110,0.4)",
                        }}>
                          {product.category}
                        </p>
                      </div>

                      {/* Price */}
                      <div style={{ flexShrink: 0, textAlign: "right" }}>
                        <p style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.1rem", fontWeight: 300,
                          color: "#c9a96e",
                        }}>
                          ${Number(product.price ?? 0).toFixed(0)}
                        </p>
                      </div>

                      {/* Arrow */}
                      <svg
                        style={{ flexShrink: 0, color: "rgba(201,169,110,0.2)", transition: "color 0.2s, transform 0.2s" }}
                        width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── Footer hint ── */}
          <div
            style={{
              flexShrink: 0,
              background: "#110d07",
              border: "1px solid rgba(201,169,110,0.1)",
              borderTop: "none",
              padding: "0.65rem 1.5rem",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              {[
                { key: "↵", label: "Select" },
                { key: "ESC", label: "Close" },
              ].map(({ key, label }) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <kbd style={{
                    border: "1px solid rgba(201,169,110,0.2)",
                    padding: "1px 6px",
                    fontSize: "9px", letterSpacing: "0.1em",
                    color: "rgba(201,169,110,0.45)",
                    fontFamily: "'Jost', sans-serif",
                  }}>{key}</kbd>
                  <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.18)" }}>{label}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.12)" }}>
              MAISON BEAN
            </p>
          </div>

        </div>
      </div>
    </>,
    document.body
  );
};

export default SearchModal;