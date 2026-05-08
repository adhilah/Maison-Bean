import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useCart } from "../../context/CartContext";
import RecommendationCarousel from "../cards/RecommendationCarousel";
import { useWishlist } from "../../context/WishlistContext";
import api from "../../services/api";

/* ─────────── Icons ─────────── */
const HeartSolid = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#c9a96e" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);
const HeartOutline = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,232,0.25)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);
const CartIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
  </svg>
);
const WandIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M12.2 6.2L11 5M12.2 11.8L11 13" />
    <path d="M3 21l9-9" /><path d="M12.2 6.2l5.6 5.6" />
  </svg>
);
const CloseIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const GridViewIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);
const ListViewIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

/* ─────────── Main ─────────── */
const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const [view, setView] = useState("grid");
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    api.get("/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const getPrice = (p) => Number(p.basePrice ?? p.price ?? 0);

  const handleRemove = (e, product) => {
    e?.stopPropagation();
    setRemovingId(product.id);
    setTimeout(() => { toggleWishlist(product); setRemovingId(null); }, 380);
  };

  const handleAddToCart = (product, closeModal = false) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
    if (closeModal) setSelectedItem(null);
  };

  const isCoffee = (p) => p?.category?.toString().trim().toLowerCase().includes("coffee");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@100;200;300;400;500&display=swap');

        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeOut { to{opacity:0;transform:scale(0.95) translateX(12px)} }
        @keyframes modalReveal { from{opacity:0;transform:translateY(22px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes pulseRing { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.06)} }

        .wish-enter { animation: fadeUp 0.45s ease forwards; }
        .wish-exit  { animation: fadeOut 0.38s ease forwards; }
        .modal-panel { animation: modalReveal 0.32s cubic-bezier(0.16,1,0.3,1) forwards; }

        .card-img { transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease; }
        .wish-card:hover .card-img  { transform: scale(1.06); opacity: 1; }
        .wish-card:hover .card-title { color: #c9a96e; }
        .wish-card:hover { border-color: rgba(201,169,110,0.32); }

        .gold-btn { transition: background 0.22s ease, transform 0.15s ease; }
        .gold-btn:hover  { background: #d4b87a; }
        .gold-btn:active { transform: scale(0.97); }

        .ghost-btn { transition: border-color 0.22s, background 0.22s; }
        .ghost-btn:hover { border-color: rgba(201,169,110,0.55); background: rgba(201,169,110,0.05); }

        .list-row { position: relative; }
        .list-row::after {
          content:''; position:absolute; bottom:0; left:0; height:1px;
          background: linear-gradient(90deg, #c9a96e 0%, transparent 100%);
          width:0; transition: width 0.4s ease;
        }
        .list-row:hover::after { width:100%; }

        .pulse-ring { animation: pulseRing 3s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif]">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full bg-[#c9a96e]/[0.022] blur-[130px]" />
          <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-[#c9a96e]/[0.015] blur-[110px]" />
        </div>

        <div className="relative z-10">
          <Navbar />

          {/* ══ HEADER ══ */}
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-14 pt-14 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

              {/* Title */}
              <div>
                <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.55em] uppercase mb-3 opacity-75">
                  SAVED ITEMS
                </p>
                <div className="flex items-end gap-4 flex-wrap">
                  <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,5.5vw,4rem)] font-light leading-none tracking-wide text-[#f5f0e8]">
                    My <span className="italic text-[#c9a96e]">Wishlist</span>
                  </h1>
                  {wishlist.length > 0 && (
                    <span className="mb-1 font-['Cormorant_Garamond',serif] text-[1.3rem] text-[#c9a96e]/35 italic">
                      {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"}
                    </span>
                  )}
                </div>
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-4 self-end md:self-auto">

                {/* Grid / List toggle */}
                {wishlist.length > 0 && (
                  <div className="flex border border-[#c9a96e]/20">
                    <button
                      onClick={() => setView("grid")}
                      className={`w-9 h-9 flex items-center justify-center transition-all duration-200
                        ${view === "grid" ? "bg-[#c9a96e]/15 text-[#c9a96e]" : "text-[#f5f0e8]/25 hover:text-[#c9a96e]/55"}`}
                    >
                      <GridViewIcon />
                    </button>
                    <div className="w-px bg-[#c9a96e]/15 self-stretch" />
                    <button
                      onClick={() => setView("list")}
                      className={`w-9 h-9 flex items-center justify-center transition-all duration-200
                        ${view === "list" ? "bg-[#c9a96e]/15 text-[#c9a96e]" : "text-[#f5f0e8]/25 hover:text-[#c9a96e]/55"}`}
                    >
                      <ListViewIcon />
                    </button>
                  </div>
                )}

                <button
                  onClick={() => navigate("/")}
                  className="text-[#c9a96e]/60 hover:text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 transition-all group"
                >
                  CONTINUE SHOPPING
                  <span className="group-hover:w-10 transition-all duration-300 w-6 h-px bg-current inline-block" />
                </button>
              </div>
            </div>

            {/* Decorative rule */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/45 via-[#c9a96e]/12 to-transparent" />
              <div className="w-[5px] h-[5px] rotate-45 bg-[#c9a96e]/35 flex-shrink-0" />
            </div>
          </div>

          {/* ══ CONTENT ══ */}
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-14 pb-28">

            {/* ── Empty State ── */}
            {wishlist.length === 0 && (
              <div className="flex flex-col items-center justify-center py-40 gap-8">
                <div className="relative">
                  {/* Concentric rings */}
                  <div className="pulse-ring w-32 h-32 border border-[#c9a96e]/08 rounded-full absolute -inset-4" />
                  <div className="w-24 h-24 border border-[#c9a96e]/10 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 border border-[#c9a96e]/18 rounded-full flex items-center justify-center">
                      <HeartOutline size={28} />
                    </div>
                  </div>
                  <div className="absolute top-1 right-1 w-2 h-2 bg-[#c9a96e]/20 rounded-full" />
                  <div className="absolute bottom-2 left-0 w-1.5 h-1.5 bg-[#c9a96e]/12 rounded-full" />
                </div>

                <div className="text-center space-y-2">
                  <p className="font-['Cormorant_Garamond',serif] text-[2.2rem] font-light italic text-[#f5f0e8]/30">
                    Nothing saved yet
                  </p>
                  <p className="text-[#f5f0e8]/18 text-[10px] tracking-[0.4em] uppercase">
                    Items you love will appear here
                  </p>
                </div>

                <button
                  onClick={() => navigate("/menu")}
                  className="gold-btn flex items-center gap-2.5 px-8 py-3.5 bg-[#c9a96e] text-[#0d0a05] text-[0.6rem] tracking-[0.4em] uppercase"
                  style={{ fontFamily: "'Jost',sans-serif" }}
                >
                  <CartIcon size={12} />
                  Explore Menu
                </button>
              </div>
            )}

            {/* ── GRID VIEW ── */}
            {wishlist.length > 0 && view === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#c9a96e]/10 mt-1">
                {wishlist.map((product, idx) => (
                  <div
                    key={product.id}
                    className={`wish-card group bg-[#110d07] border border-[#c9a96e]/10
                      overflow-hidden flex flex-col cursor-pointer transition-all duration-500
                      ${removingId === product.id ? "wish-exit" : "wish-enter"}`}
                    style={{ animationDelay: `${idx * 55}ms` }}
                    onClick={() => setSelectedItem(product)}
                  >
                    {/* Image */}
                    <div className="relative h-[260px] overflow-hidden bg-[#1a1510]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="card-img w-full h-full object-cover opacity-85"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#110d07] via-[#110d07]/50 to-transparent" />

                      {/* Editorial index */}
                      <span className="absolute top-3 left-3 font-['Cormorant_Garamond',serif] text-[10px] italic text-[#c9a96e]/30">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* Wishlist remove btn */}
                      <button
                        onClick={(e) => handleRemove(e, product)}
                        className="absolute top-3 right-3 w-8 h-8 bg-[#080502]/80 backdrop-blur-md border border-[#c9a96e]/25 rounded-full flex items-center justify-center hover:border-red-400/40 hover:bg-red-950/40 transition-all duration-300 group/h"
                        aria-label="Remove from wishlist"
                      >
                        <span className="group-hover/h:scale-110 transition-transform duration-200 inline-flex">
                          <HeartSolid size={12} />
                        </span>
                      </button>
                    </div>

                    {/* Text */}
                    <div className="flex-1 p-5 flex flex-col border-t border-[#c9a96e]/10">
                      {product.category && (
                        <p className="text-[#c9a96e] text-[9px] tracking-[0.45em] uppercase mb-2 opacity-65">
                          {product.category}
                        </p>
                      )}
                      <h3 className="card-title font-['Cormorant_Garamond',serif] text-[1.3rem] leading-snug font-light text-[#f5f0e8] transition-colors duration-300 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-[#f5f0e8]/30 text-[12px] leading-relaxed line-clamp-2 mb-5 flex-1">
                        {product.description}
                      </p>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#c9a96e]/10">
                        <span className="font-['Cormorant_Garamond',serif] text-[1.5rem] font-light text-[#c9a96e]">
                          ${getPrice(product).toFixed(0)}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                          className="gold-btn flex items-center gap-1.5 px-4 py-2 bg-[#c9a96e] text-[#0d0a05] text-[0.55rem] tracking-[0.28em] uppercase"
                          style={{ fontFamily: "'Jost',sans-serif" }}
                        >
                          <CartIcon size={11} />
                          {addedId === product.id ? "Added ✓" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── LIST VIEW ── */}
            {wishlist.length > 0 && view === "list" && (
              <div className="mt-1 border-t border-[#c9a96e]/10">
                {/* List header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-3 py-3 bg-[#110d07] border-b border-[#c9a96e]/10">
                  <p className="col-span-1 text-[9px] text-[#c9a96e]/35 tracking-[0.35em] uppercase">#</p>
                  <p className="col-span-5 text-[9px] text-[#c9a96e]/35 tracking-[0.35em] uppercase">Item</p>
                  <p className="col-span-3 text-[9px] text-[#c9a96e]/35 tracking-[0.35em] uppercase">Description</p>
                  <p className="col-span-1 text-[9px] text-[#c9a96e]/35 tracking-[0.35em] uppercase text-right">Price</p>
                  <p className="col-span-2 text-[9px] text-[#c9a96e]/35 tracking-[0.35em] uppercase text-right">Actions</p>
                </div>

                {wishlist.map((product, idx) => (
                  <div
                    key={product.id}
                    className={`list-row group flex md:grid md:grid-cols-12 md:gap-4 items-center
                      gap-4 px-3 py-4 cursor-pointer hover:bg-[#110d07]/70 transition-colors duration-300 border-b border-[#c9a96e]/08
                      ${removingId === product.id ? "wish-exit" : "wish-enter"}`}
                    style={{ animationDelay: `${idx * 40}ms` }}
                    onClick={() => setSelectedItem(product)}
                  >
                    {/* Index */}
                    <span className="hidden md:block col-span-1 font-['Cormorant_Garamond',serif] text-[11px] italic text-[#c9a96e]/25">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    {/* Thumb + Name */}
                    <div className="md:col-span-5 flex gap-4 items-center min-w-0 flex-1 md:flex-none">
                      <div className="relative w-[88px] h-[64px] flex-shrink-0 overflow-hidden bg-[#1a1510] border border-[#c9a96e]/10">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="card-img w-full h-full object-cover opacity-85"
                        />
                      </div>
                      <div className="min-w-0">
                        {product.category && (
                          <p className="text-[#c9a96e] text-[9px] tracking-[0.4em] uppercase mb-0.5 opacity-55">
                            {product.category}
                          </p>
                        )}
                        <h3 className="card-title font-['Cormorant_Garamond',serif] text-[1.1rem] font-light text-[#f5f0e8] group-hover:text-[#c9a96e] transition-colors duration-300 truncate leading-tight">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    {/* Description — desktop only */}
                    <p className="hidden md:block md:col-span-3 text-[#f5f0e8]/28 text-[11px] leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="hidden md:block md:col-span-1 text-right">
                      <span className="font-['Cormorant_Garamond',serif] text-[1.15rem] font-light text-[#c9a96e]">
                        ${getPrice(product).toFixed(0)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-2 flex items-center justify-end gap-2 flex-shrink-0">
                      <span className="md:hidden font-['Cormorant_Garamond',serif] text-[1.1rem] text-[#c9a96e]">
                        ${getPrice(product).toFixed(0)}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                        className="gold-btn flex items-center gap-1.5 px-3.5 py-2 bg-[#c9a96e] text-[#0d0a05] text-[0.53rem] tracking-[0.28em] uppercase"
                        style={{ fontFamily: "'Jost',sans-serif" }}
                      >
                        <CartIcon size={10} />
                        {addedId === product.id ? "Added ✓" : "Add"}
                      </button>
                      <button
                        onClick={(e) => handleRemove(e, product)}
                        className="w-8 h-8 border border-[#c9a96e]/15 flex items-center justify-center text-[#c9a96e]/35 hover:text-red-400/55 hover:border-red-400/20 transition-all duration-200"
                        aria-label="Remove"
                      >
                        <HeartSolid size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Recommendations */}
           {products.length > 0 && (
          <RecommendationCarousel allProducts={products} />
        )}
        </div>
      </div>

      {/* ══ MODAL ══ */}
      <Dialog open={!!selectedItem} onClose={() => setSelectedItem(null)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-[#07060400]/90 backdrop-blur-md flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(7,6,4,0.88)" }}>
          {selectedItem && (
            <Dialog.Panel className="modal-panel bg-[#110d07] border border-[#c9a96e]/20 max-w-[500px] w-full relative overflow-hidden">

              {/* Close */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 bg-[#0d0a05] border border-[#c9a96e]/20 flex items-center justify-center text-[#f5f0e8]/35 hover:text-[#f5f0e8]/75 hover:border-[#c9a96e]/45 transition-all"
              >
                <CloseIcon />
              </button>

              {/* Image */}
              <div className="relative h-[250px] overflow-hidden bg-[#1a1510]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#110d07] via-[#110d07]/20 to-transparent" />

                {/* Floating price */}
                <div className="absolute bottom-5 left-6">
                  <span className="font-['Cormorant_Garamond',serif] text-[2.4rem] font-light text-[#c9a96e] drop-shadow-lg leading-none">
                    ${getPrice(selectedItem).toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-7">
                {selectedItem.category && (
                  <p className="text-[#c9a96e] text-[9px] tracking-[0.45em] uppercase mb-2 opacity-65">
                    {selectedItem.category}
                  </p>
                )}
                <h2 className="font-['Cormorant_Garamond',serif] text-[1.95rem] font-light text-[#f5f0e8] leading-tight mb-3">
                  {selectedItem.name}
                </h2>
                <div className="h-px bg-gradient-to-r from-[#c9a96e]/30 to-transparent mb-4" />
                <p className="text-[#f5f0e8]/38 text-[12.5px] leading-relaxed mb-7">
                  {selectedItem.description || "No description available."}
                </p>

                {/* CTAs */}
                <div className="space-y-2.5">
                  <button
                    onClick={() => handleAddToCart(selectedItem, true)}
                    className="gold-btn w-full flex items-center justify-between px-6 py-3.5 bg-[#c9a96e] text-[#0d0a05] text-[0.62rem] tracking-[0.35em] uppercase group/btn"
                    style={{ fontFamily: "'Jost',sans-serif" }}
                  >
                    <span className="flex items-center gap-2"><CartIcon size={12} /> Add to Cart</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-200"><ArrowRight /></span>
                  </button>

                  {isCoffee(selectedItem) && (
                    <button
                      onClick={() => navigate(`/customize/${selectedItem.id}`, { state: { product: selectedItem } })}
                      className="ghost-btn w-full flex items-center justify-center gap-2 py-3.5 border border-[#c9a96e]/25 text-[#c9a96e] text-[0.62rem] tracking-[0.35em] uppercase"
                      style={{ fontFamily: "'Jost',sans-serif" }}
                    >
                      <WandIcon size={12} /> Customize
                    </button>
                  )}

                  <button
                    onClick={() => { toggleWishlist(selectedItem); setSelectedItem(null); }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-[#f5f0e8]/22 hover:text-red-400/50 text-[0.6rem] tracking-[0.3em] uppercase transition-colors"
                    style={{ fontFamily: "'Jost',sans-serif" }}
                  >
                    <HeartSolid size={11} /> Remove from Wishlist
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default WishlistPage;