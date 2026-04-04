// import { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import ProductCard from "./ProductCard";
// import Navbar from "../Navbar";

// function Cards() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [loading, setLoading] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile collapsible

//   const { category } = useParams();
//   const navigate = useNavigate();

//   const categories = ["All", "Hot Coffee", "Cold Coffee", "Croissant"];

//   // Capitalize words from URL
//   useEffect(() => {
//     if (category) {
//       const formatted = category
//         .split("-")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");
//       setSelectedCategory(formatted);
//     } else {
//       setSelectedCategory("All");
//     }
//   }, [category]);

//   // Fetch products
//   useEffect(() => {
//     setLoading(true);
//     fetch("http://localhost:3000/products")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         setFilteredProducts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch products:", err);
//         setLoading(false);
//       });
//   }, []);

//   // Filter products
//   useEffect(() => {
//     if (selectedCategory === "All") {
//       setFilteredProducts(products);
//     } else {
//       const filtered = products.filter(
//         (p) => p.category === selectedCategory
//       );
//       setFilteredProducts(filtered);
//     }
//   }, [selectedCategory, products]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
//           <h1 className="text-3xl font-bold">Café Menu</h1>
//           <Link to="/">
//             <button className="text-[#9c7635] hover:underline font-medium">
//               ← Continue Shopping
//             </button>
//           </Link>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Mobile Collapsible Categories */}
//           <div className="lg:hidden mb-4">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="w-full bg-[#9c7635] text-white p-3 rounded-lg font-medium flex justify-between items-center"
//             >
//               {selectedCategory}
//               <span className={`transform transition-transform duration-300 ${mobileMenuOpen ? "rotate-180" : ""}`}>
//                 ▼
//               </span>
//             </button>
//             {mobileMenuOpen && (
//               <ul className="mt-2 bg-white border rounded-lg shadow overflow-hidden">
//                 {categories.map((cat) => (
//                   <li key={cat}>
//                     <button
//                       onClick={() => {
//                         setSelectedCategory(cat);
//                         navigate(
//                           cat === "All"
//                             ? "/menu"
//                             : `/menu/${cat.toLowerCase().replace(" ", "-")}`
//                         );
//                         setMobileMenuOpen(false);
//                       }}
//                       className={`w-full text-left px-4 py-3 transition-all duration-200 ${
//                         selectedCategory === cat
//                           ? "bg-[#9c7635] text-white font-semibold"
//                           : "hover:bg-[#efe6d6] text-gray-800"
//                       }`}
//                     >
//                       {cat}
//                       {selectedCategory === cat && (
//                         <span className="ml-2 text-sm">✓</span>
//                       )}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Desktop Sidebar */}
//           <aside className="hidden lg:block w-64 sticky top-24 h-fit">
//             <div className="bg-white rounded-2xl shadow-md p-5">
//               <h3 className="text-lg font-semibold text-gray-800 mb-5">
//                 Categories
//               </h3>
//               <ul className="space-y-3">
//                 {categories.map((cat) => (
//                   <li key={cat}>
//                     <button
//                       onClick={() => {
//                         setSelectedCategory(cat);
//                         navigate(
//                           cat === "All"
//                             ? "/menu"
//                             : `/menu/${cat.toLowerCase().replace(" ", "-")}`
//                         );
//                       }}
//                       className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex justify-between items-center ${
//                         selectedCategory === cat
//                           ? "bg-[#9c7635] text-white shadow font-semibold"
//                           : "bg-gray-50 hover:bg-[#efe6d6] text-gray-800"
//                       }`}
//                     >
//                       {cat}
//                       {selectedCategory === cat && <span>✓</span>}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </aside>

//           {/* Products Grid */}
//           <main className="flex-1">
//             {loading ? (
//               <p className="text-center py-20 text-xl text-gray-600">
//                 Loading all products...
//               </p>
//             ) : filteredProducts.length === 0 ? (
//               <p className="text-center py-20 text-xl text-gray-600">
//                 No products found in this category.
//               </p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                 {filteredProducts.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cards;

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Navbar from "../Navbar";

const categories = ["All", "Hot Coffee", "Cold Coffee", "Croissant"];

const CATEGORY_META = {
  "All":         { sub: "Every cup, every bite",   line: "Curated Selection" },
  "Hot Coffee":  { sub: "Warmth in every sip",     line: "Artisan Roasts"    },
  "Cold Coffee": { sub: "Chilled to perfection",   line: "Refresh & Revive"  },
  "Croissant":   { sub: "Flaky, buttery, golden",  line: "Freshly Baked"     },
};

const NAVBAR_HEIGHT = 72; // px — adjust if your Navbar is taller/shorter
const CATBAR_HEIGHT = 52; // px

const SkeletonCard = () => (
  <div style={{ background: "#13100a", border: "1px solid rgba(196,169,106,0.08)", borderRadius: "2px", overflow: "hidden" }}>
    <div style={{ height: "280px", background: "linear-gradient(90deg,#1a1610 25%,#221b14 50%,#1a1610 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.6s infinite" }} />
    <div style={{ padding: "1.75rem" }}>
      <div style={{ height: "8px",  width: "25%", background: "rgba(196,169,106,0.10)", marginBottom: "1rem",    borderRadius: "2px" }} />
      <div style={{ height: "20px", width: "75%", background: "rgba(196,169,106,0.15)", marginBottom: "0.75rem", borderRadius: "2px" }} />
      <div style={{ height: "8px",  width: "60%", background: "rgba(196,169,106,0.08)",                          borderRadius: "2px" }} />
    </div>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"8rem 2rem", textAlign:"center" }}>
    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.5rem", fontWeight:300, color:"rgba(250,248,245,0.8)", marginBottom:"0.75rem" }}>
      Connection interrupted
    </p>
    <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.75rem", fontWeight:300, letterSpacing:"0.05em", color:"rgba(196,169,106,0.5)", marginBottom:"2.5rem" }}>
      Unable to reach our servers. Please try again.
    </p>
    <button onClick={onRetry} style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", fontWeight:400, letterSpacing:"0.2em", textTransform:"uppercase", color:"#0a0805", background:"#c4a96a", border:"none", padding:"1.1rem 2.5rem", cursor:"pointer", borderRadius:"2px" }}>
      Try Again
    </button>
  </div>
);

export default function Cards() {
  const [products,         setProducts]         = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading,          setLoading]          = useState(false);
  const [error,            setError]            = useState(false);
  const [mobileOpen,       setMobileOpen]       = useState(false);
  const [navH,             setNavH]             = useState(NAVBAR_HEIGHT);
  const navRef = useRef(null);

  const { category } = useParams();
  const navigate      = useNavigate();

  // Measure real Navbar height after mount
  useEffect(() => {
    if (navRef.current) {
      const h = navRef.current.getBoundingClientRect().height;
      if (h > 0) setNavH(h);
    }
  }, []);

  // Sync category from URL
  useEffect(() => {
    if (category) {
      const fmt = category.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
      setSelectedCategory(fmt);
    } else {
      setSelectedCategory("All");
    }
  }, [category]);

  // Fetch
  const fetchProducts = async () => {
    setLoading(true); setError(false);
    try {
      const res = await fetch("http://localhost:3000/products");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data); setFilteredProducts(data);
    } catch { setError(true); }
    finally  { setLoading(false); }
  };
  useEffect(() => { fetchProducts(); }, []);

  // Filter
  useEffect(() => {
    setFilteredProducts(
      selectedCategory === "All" ? products : products.filter(p => p.category === selectedCategory)
    );
  }, [selectedCategory, products]);

  const handleSelect = (cat) => {
    setSelectedCategory(cat);
    setMobileOpen(false);
    navigate(cat === "All" ? "/menu" : `/menu/${cat.toLowerCase().replace(/ /g, "-")}`);
  };

  const meta = CATEGORY_META[selectedCategory] ?? { sub: "", line: "" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@200;300;400;500&display=swap');
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        /* Always-visible sticky Navbar */
        .mb-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 300;
        }

        /* Always-visible sticky category bar, sits right below Navbar */
        .mb-cat {
          position: fixed;
          left: 0; right: 0;
          top: ${navH}px;
          z-index: 299;
          background: rgba(7,5,3,0.96);
          backdrop-filter: blur(20px) saturate(160%);
          border-bottom: 1px solid rgba(196,169,106,0.09);
          height: ${CATBAR_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mb-pills {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 0 2rem;
          width: 100%;
        }

        .cat-pill {
          font-family: 'Inter', sans-serif;
          font-size: 0.68rem;
          font-weight: 300;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(250,248,245,0.42);
          background: transparent;
          border: 1px solid transparent;
          padding: 0.52rem 1.25rem;
          border-radius: 100px;
          cursor: pointer;
          white-space: nowrap;
          line-height: 1;
          transition: color 0.22s, background 0.22s, border-color 0.22s;
        }
        .cat-pill:hover  { color:rgba(250,248,245,0.8); background:rgba(196,169,106,0.07); }
        .cat-pill.active { color:#c4a96a; background:rgba(196,169,106,0.11); border-color:rgba(196,169,106,0.3); font-weight:400; }

        /* Mobile trigger */
        .mb-mob { display:none; width:100%; height:100%; background:transparent; border:none; align-items:center; justify-content:center; gap:0.6rem; cursor:pointer; }
        .mb-mob-label { font-family:'Inter',sans-serif; font-size:0.72rem; font-weight:300; letter-spacing:0.2em; text-transform:uppercase; color:#c4a96a; }

        @media (max-width: 768px) {
          .mb-pills { display:none; }
          .mb-mob   { display:flex; }
        }

        /* Bottom sheet */
        .sheet-bg { position:fixed; inset:0; background:rgba(0,0,0,0.55); backdrop-filter:blur(4px); z-index:400; opacity:${mobileOpen?1:0}; pointer-events:${mobileOpen?"auto":"none"}; transition:opacity 0.3s ease; }
        .sheet    { position:fixed; bottom:0; left:0; right:0; background:linear-gradient(180deg,#15120d,#0f0c08); border-radius:20px 20px 0 0; z-index:401; max-height:65vh; overflow-y:auto; transform:translateY(${mobileOpen?"0":"100%"}); transition:transform 0.38s cubic-bezier(0.22,1,0.36,1); }

        .back-link { font-family:'Inter',sans-serif; font-size:0.7rem; font-weight:300; letter-spacing:0.15em; text-transform:uppercase; color:rgba(196,169,106,0.5); text-decoration:none; display:inline-flex; align-items:center; gap:10px; transition:all 0.25s; }
        .back-link:hover { color:#c4a96a; gap:14px; }
        .product-appear { animation:fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* 1 — Navbar (always visible) */}
      <div className="mb-nav" ref={navRef}>
        <Navbar />
      </div>

      {/* 2 — Category bar (always visible, below Navbar) */}
      <div className="mb-cat">
        <div className="mb-pills">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-pill${selectedCategory === cat ? " active" : ""}`}
              onClick={() => handleSelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="mb-mob" onClick={() => setMobileOpen(true)}>
          <span className="mb-mob-label">{selectedCategory}</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c4a96a" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>

      {/* Mobile sheet */}
      <div className="sheet-bg" onClick={() => setMobileOpen(false)} />
      <div className="sheet">
        <div style={{ padding:"1.2rem 1.5rem", borderBottom:"1px solid rgba(196,169,106,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.62rem", fontWeight:400, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(196,169,106,0.5)" }}>Categories</span>
          <button style={{ background:"none", border:"none", color:"rgba(250,248,245,0.5)", cursor:"pointer" }} onClick={() => setMobileOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        {categories.map(cat => (
          <button key={cat}
            style={{ width:"100%", padding:"1.2rem 1.5rem", background:selectedCategory===cat?"rgba(196,169,106,0.08)":"transparent", border:"none", borderBottom:"1px solid rgba(196,169,106,0.04)", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer" }}
            onClick={() => handleSelect(cat)}
          >
            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.85rem", fontWeight:300, letterSpacing:"0.1em", textTransform:"uppercase", color:selectedCategory===cat?"#c4a96a":"rgba(250,248,245,0.7)" }}>{cat}</span>
            {selectedCategory === cat && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c4a96a" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            )}
          </button>
        ))}
      </div>

      {/* 3 — Page content */}
      <div style={{ minHeight:"100vh", background:"#0a0805", fontFamily:"'Inter',sans-serif", paddingTop:`${navH + CATBAR_HEIGHT + 16}px` }}>

        {/* Hero */}
        <div style={{ padding:"2.5rem 0 4rem", textAlign:"center", position:"relative" }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%,rgba(196,169,106,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <p style={{ fontSize:"0.6rem", fontWeight:300, letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(196,169,106,0.45)", marginBottom:"1.25rem" }}>{meta.sub}</p>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(3rem,6vw,5rem)", fontWeight:300, letterSpacing:"-0.01em", lineHeight:1, color:"#faf8f5", marginBottom:"0.75rem" }}>
              {selectedCategory === "All"
                ? <span style={{ fontStyle:"italic" }}>Menu</span>
                : <span style={{ fontStyle:"italic", color:"#c4a96a" }}>{selectedCategory}</span>}
            </h1>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", fontStyle:"italic", color:"rgba(250,248,245,0.3)", letterSpacing:"0.03em" }}>{meta.line}</p>
            <div style={{ width:"40px", height:"1px", background:"linear-gradient(to right,transparent,#c4a96a,transparent)", margin:"2.5rem auto 0", opacity:0.4 }} />
          </div>
        </div>

        <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 3rem 6rem" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"3.5rem" }}>
            <Link to="/" className="back-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </Link>
            {!loading && !error && (
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.55rem 1.2rem", background:"rgba(196,169,106,0.06)", borderRadius:"100px", border:"1px solid rgba(196,169,106,0.1)" }}>
                <span style={{ width:"6px", height:"6px", background:"#c4a96a", borderRadius:"50%", boxShadow:"0 0 8px #c4a96a" }} />
                <span style={{ fontSize:"0.7rem", fontWeight:300, letterSpacing:"0.1em", color:"rgba(196,169,106,0.7)" }}>{filteredProducts.length} items</span>
              </div>
            )}
          </div>

          <main>
            {loading ? (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"2rem" }}>
                {Array.from({length:6}).map((_,i) => <SkeletonCard key={i} />)}
              </div>
            ) : error ? (
              <ErrorState onRetry={fetchProducts} />
            ) : filteredProducts.length === 0 ? (
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"10rem 2rem" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:300, color:"rgba(250,248,245,0.3)", fontStyle:"italic" }}>No items found</p>
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"2rem" }}>
                {filteredProducts.map((product,idx) => (
                  <div key={product.id} className="product-appear" style={{ animationDelay:`${idx*0.08}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}