//===================================================================================================================
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Navbar from "../Navbar";
import api from "../../services/api";
import ProductModal from "./ProductModal";

const categories = ["All", "Hot Coffee", "Cold Coffee", "Croissant"];

const CATEGORY_META = {
  "All":         { sub: "Every cup, every bite",   line: "Curated Selection" },
  "Hot Coffee":  { sub: "Warmth in every sip",     line: "Artisan Roasts"    },
  "Cold Coffee": { sub: "Chilled to perfection",   line: "Refresh & Revive"  },
  "Croissant":   { sub: "Flaky, buttery, golden",  line: "Freshly Baked"     },
};

const NAVBAR_HEIGHT = 72;
const CATBAR_HEIGHT = 52;

const SkeletonCard = () => (
  <div className="bg-[#13100a] border border-[#c4a96a]/10 rounded overflow-hidden">
    <div className="h-[280px] bg-gradient-to-r from-[#1a1610] via-[#221b14] to-[#1a1610] bg-[length:200%_100%] animate-[shimmer_1.6s_infinite]" />
    <div className="p-7">
      <div className="h-2 w-1/4 bg-[#c4a96a]/10 mb-4 rounded" />
      <div className="h-5 w-3/4 bg-[#c4a96a]/15 mb-3 rounded" />
      <div className="h-2 w-3/5 bg-[#c4a96a]/10 rounded" />
    </div>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-32 px-8 text-center">
    <p className="font-serif text-2xl text-[#faf8f5]/80 mb-3">Connection interrupted</p>
    <p className="text-xs tracking-widest text-[#c4a96a]/50 mb-10">Unable to reach our servers. Please try again.</p>
    <button 
      onClick={onRetry}
      className="text-xs tracking-widest uppercase bg-[#c4a96a] text-black px-10 py-4 rounded hover:brightness-110 transition"
    >
      Try Again
    </button>
  </div>
);

export default function MainProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [navH, setNavH] = useState(NAVBAR_HEIGHT);
  const navRef = useRef(null);
  const { category } = useParams();
  const navigate = useNavigate();

  // Measure Navbar height
  useEffect(() => {
    if (navRef.current) {
      const h = navRef.current.getBoundingClientRect().height;
      if (h > 0) setNavH(h);
    }
  }, []);

  // Sync category from URL
  useEffect(() => {
    if (!category) {
      setSelectedCategory("All");
      return;
    }
    const normalized = category
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    setSelectedCategory(categories.includes(normalized) ? normalized : "All");
  }, [category]);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("https://localhost:7257/api/products");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products
  useEffect(() => {
    setFilteredProducts(
      selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory)
    );
  }, [selectedCategory, products]);

  const handleSelect = (cat) => {
    setSelectedCategory(cat);
    setMobileOpen(false);
    const path = cat === "All" ? "/menu" : `/menu/${cat.toLowerCase().replace(/ /g, "-")}`;
    navigate(path);
  };

  const meta = CATEGORY_META[selectedCategory] ?? { sub: "", line: "" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@200;300;400;500&display=swap');
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .product-appear { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[300]" ref={navRef}>
        <Navbar />
      </div>

      {/* CENTERED Category Bar */}
      <div 
        className="fixed left-0 right-0 z-[299] bg-[#070503]/95 backdrop-blur-xl border-b border-[#c4a96a]/10 flex items-center justify-center"
        style={{ top: `${navH}px`, height: `${CATBAR_HEIGHT}px` }}
      >
        <div className="flex items-center gap-1 px-6 w-full max-w-[1280px] justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleSelect(cat)}
              className={`px-5 py-3 text-xs font-light tracking-widest uppercase rounded-full border transition-all whitespace-nowrap ${
                selectedCategory === cat 
                  ? "text-[#c4a96a] bg-[#c4a96a]/10 border-[#c4a96a]/30" 
                  : "text-[#faf8f5]/40 border-transparent hover:text-[#faf8f5]/80 hover:bg-[#c4a96a]/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Trigger */}
        <button 
          onClick={() => setMobileOpen(true)}
          className="md:hidden flex items-center justify-center gap-2 w-full h-full text-[#c4a96a]"
        >
          <span className="text-xs font-light tracking-widest uppercase">{selectedCategory}</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c4a96a" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>

      {/* Mobile Bottom Sheet */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur z-[400] transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-gradient-to-b from-[#15120d] to-[#0f0c08] rounded-t-3xl z-[401] max-h-[65vh] overflow-y-auto transition-transform duration-300 ${mobileOpen ? "translate-y-0" : "translate-y-full"}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#c4a96a]/10">
          <span className="text-xs tracking-[0.3em] uppercase text-[#c4a96a]/50">Categories</span>
          <button onClick={() => setMobileOpen(false)} className="text-[#faf8f5]/60 text-xl">✕</button>
        </div>

        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleSelect(cat)}
            className={`w-full px-6 py-5 flex justify-between items-center border-b border-[#c4a96a]/10 text-left transition-colors ${
              selectedCategory === cat ? "bg-[#c4a96a]/10" : "hover:bg-[#c4a96a]/5"
            }`}
          >
            <span className={`text-sm font-light tracking-widest uppercase ${selectedCategory === cat ? "text-[#c4a96a]" : "text-[#faf8f5]/70"}`}>
              {cat}
            </span>
            {selectedCategory === cat && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c4a96a" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-[#0a0805]" style={{ paddingTop: `${navH + CATBAR_HEIGHT + 16}px` }}>
        {/* Hero */}
        <div className="pt-10 pb-16 text-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(196,169,106,0.06)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c4a96a]/50 mb-5">{meta.sub}</p>
            <h1 className="font-serif text-[clamp(3rem,6vw,5rem)] font-light tracking-tight text-[#faf8f5] mb-3">
              {selectedCategory === "All" ? "Menu" : selectedCategory}
            </h1>
            <p className="font-serif text-lg italic text-[#faf8f5]/40 tracking-wide">{meta.line}</p>
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#c4a96a] to-transparent mx-auto mt-10 opacity-40" />
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
          <div className="flex items-center justify-between mb-14">
            <Link to="/" className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#c4a96a]/60 hover:text-[#c4a96a] transition">
              ← Back
            </Link>

            {!loading && !error && (
              <div className="flex items-center gap-3 px-5 py-2.5 bg-[#c4a96a]/5 border border-[#c4a96a]/10 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#c4a96a] rounded-full shadow-[0_0_8px_#c4a96a]" />
                <span className="text-xs tracking-widest text-[#c4a96a]/70">{filteredProducts.length} items</span>
              </div>
            )}
          </div>

          <main>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : error ? (
              <ErrorState onRetry={fetchProducts} />
            ) : filteredProducts.length === 0 ? (
              <div className="flex justify-center py-40">
                <p className="font-serif text-4xl font-light text-[#faf8f5]/30 italic">No items found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* SINGLE MODAL */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  );
}