import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import api from "../../services/api";
import Navbar from "../Navbar";

const API = "/api";;

/* ── Icons ── */
const ArrowLeft = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const ArrowRight = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── Taste Profile Engine ── */
function getTasteProfile({ bean, milk, strength, temp, sweetness }) {
  if (!bean || !milk) return { desc: "Select your options to see your taste profile", chips: [] };

  const chips = [...(bean.notes || []), ...(milk.notes || [])];
  if (strength >= 4) chips.push("Bold");
  else if (strength <= 2) chips.push("Delicate");
  if (sweetness >= 4) chips.push("Sweet");
  else if (sweetness <= 1) chips.push("Unsweetened");
  if (temp === "iced") chips.push("Refreshing");
  else if (temp === "hot") chips.push("Warming");

  let desc = "";
  if (bean.id === "arabica" && milk.id === "whole" && temp === "hot")
    desc = "Silky, floral with caramel warmth";
  else if (bean.id === "robusta" && strength >= 4)
    desc = "Intense, bold with dark chocolate edges";
  else if (bean.id === "single" && temp === "iced")
    desc = "Bright, fruity with a jasmine finish";
  else if (bean.id === "blend" && milk.id === "oat")
    desc = "Smooth, nutty with a balanced sweetness";
  else if (bean.id === "arabica" && milk.id === "coconut")
    desc = "Exotic, floral with a tropical sweetness";
  else if (temp === "iced")
    desc = "Cool, refreshing with layered complexity";
  else
    desc = `${strength >= 4 ? "Rich, bold" : "Light, delicate"} with ${(bean.notes?.[0] || "smooth").toLowerCase()} notes`;

  if (sweetness >= 3) desc += " and a sweet finish";

  return { desc, chips: [...new Set(chips)].slice(0, 5) };
}

/* ── Strength Pips ── */
const StrengthPips = ({ value }) => (
  <div style={{ display: "flex", gap: 4 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        style={{
          width: 8, height: 8,
          border: `1px solid ${i <= value ? "#c9a96e" : "rgba(201,169,110,0.15)"}`,
          background: i <= value ? "rgba(201,169,110,0.6)" : "transparent",
          transition: "all 0.2s",
        }}
      />
    ))}
  </div>
);

/* ── Coffee Cup Preview ── */
const CupPreview = ({ bean, milk, strength, temp }) => {
  const liquidColor =
    bean?.id === "single"
      ? `rgba(160,100,60,${0.5 + strength * 0.08})`
      : bean?.id === "arabica"
      ? `rgba(140,90,50,${0.5 + strength * 0.08})`
      : `rgba(120,70,40,${0.5 + strength * 0.08})`;

  const liquidHeight = `${45 + strength * 9}%`;

  return (
    <div style={{
      position: "relative", height: 110,
      background: "#0d0a05",
      border: "1px solid rgba(201,169,110,0.08)",
      marginBottom: 14, overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {temp === "iced" ? (
        <>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${50 + strength * 8}%`, background: `rgba(180,140,80,${0.3 + strength * 0.07})`, transition: "all 0.4s" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "28%", background: "rgba(245,235,210,0.15)" }} />
          {[20, 45, 65, 80].map((l, i) => (
            <div key={i} style={{ position: "absolute", bottom: `${10 + i * 8}%`, left: `${l}%`, width: 2, height: `${15 + i * 5}px`, background: "rgba(201,169,110,0.2)", borderRadius: 1 }} />
          ))}
        </>
      ) : (
        <>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: liquidHeight, background: liquidColor, transition: "all 0.4s" }} />
          {milk && (
            <div style={{ position: "absolute", bottom: liquidHeight, left: 0, right: 0, height: "18%", background: "rgba(245,235,210,0.12)", transition: "all 0.4s" }} />
          )}
          {temp === "hot" && (
            <p style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", fontSize: 18, color: "rgba(201,169,110,0.3)", animation: "pulse 3s infinite" }}>~</p>
          )}
        </>
      )}
      <p style={{
        position: "absolute", fontFamily: "'Cormorant Garamond',serif",
        fontSize: 11, color: "rgba(201,169,110,0.3)", letterSpacing: "0.3em",
        textTransform: "uppercase",
      }}>
        {bean && milk ? `${bean.name} · ${temp}` : "Awaiting your picks"}
      </p>
    </div>
  );
};

/* ── Option Card ── */
const OptionCard = ({ item, selected, onClick, sub }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%", display: "flex", alignItems: "center", gap: 12,
      padding: "12px 16px", marginBottom: 6,
      border: `1px solid ${selected ? "rgba(201,169,110,0.5)" : "rgba(201,169,110,0.1)"}`,
      background: selected ? "rgba(201,169,110,0.07)" : "transparent",
      textAlign: "left", cursor: "pointer",
      transition: "all 0.2s", fontFamily: "'Jost',sans-serif", color: "#f5f0e8",
      position: "relative",
    }}
  >
    {selected && (
      <div style={{ position: "absolute", left: 0, top: "15%", bottom: "15%", width: 1, background: "#c9a96e" }} />
    )}
    <div style={{
      width: 16, height: 16, borderRadius: "50%",
      border: `1px solid ${selected ? "#c9a96e" : "rgba(201,169,110,0.2)"}`,
      background: selected ? "rgba(201,169,110,0.12)" : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, transition: "all 0.2s",
    }}>
      {selected && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#c9a96e" }} />}
    </div>
    <div style={{ flex: 1 }}>
      <p style={{
        fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", fontWeight: 300,
        color: selected ? "#c9a96e" : "rgba(245,240,232,0.8)", lineHeight: 1.2,
      }}>{item.name}</p>
      {sub && <p style={{ fontSize: 10, color: "rgba(245,240,232,0.3)", letterSpacing: "0.05em", marginTop: 2 }}>{sub}</p>}
    </div>
    <span style={{
      fontFamily: "'Cormorant Garamond',serif", fontSize: 13,
      color: selected ? "#c9a96e" : "rgba(201,169,110,0.35)",
      flexShrink: 0, transition: "colors 0.2s",
    }}>
      {item.priceAdd > 0 ? `+$${item.priceAdd}` : "Base"}
    </span>
  </button>
);

/* ── Slider Row ── */
const SliderRow = ({ min, max, value, step = 1, onChange, leftLabel, rightLabel }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 0 }}>
    <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", width: 30 }}>{leftLabel}</span>
    <input
      type="range" min={min} max={max} value={value} step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        flex: 1, WebkitAppearance: "none", appearance: "none",
        height: 2, background: "rgba(201,169,110,0.18)", borderRadius: 0, outline: "none", cursor: "pointer",
      }}
    />
    <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", width: 30, textAlign: "right" }}>{rightLabel}</span>
  </div>
);

/* ── SWEETNESS LABELS ── */
const SWEETNESS_LABELS = ["None", "Hint", "Light", "Medium", "Sweet", "Very Sweet"];

/* ── MAIN COMPONENT ── */
export default function CustomizeProduct() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [beanTypes, setBeanTypes] = useState([]);
  const [milkOptions, setMilkOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

  /* Customization state */
  const [selectedBean, setSelectedBean] = useState(null);
  const [selectedMilk, setSelectedMilk] = useState(null);
  const [strength, setStrength] = useState(3);
  const [temp, setTemp] = useState("hot");
  const [sweetness, setSweetness] = useState(2);

  useEffect(() => {
    if (!id) { setError("No product ID provided."); setLoading(false); return; }
    (async () => {
      try {
        const [pRes, bRes, mRes] = await Promise.all([
          api.get(`${API}/products/${id}`),
          api.get(`${API}/beanTypes`),
          api.get(`${API}/milkOptions`),
        ]);
        setProduct(pRes.data);
        setBeanTypes(bRes.data || []);
        setMilkOptions(mRes.data || []);
      } catch (err) {
        setError(err.response?.status === 404 ? "Product not found." : "Failed to load options.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const isCoffee = product?.category?.toLowerCase().includes("coffee");
  const basePrice = Number(product?.basePrice) || 0;
  const extraSweet = sweetness > 3 ? 10 : 0;
  const totalPrice = basePrice + (selectedBean?.priceAdd || 0) + (selectedMilk?.priceAdd || 0) + extraSweet;

  const tasteProfile = getTasteProfile({ bean: selectedBean, milk: selectedMilk, strength, temp, sweetness });

  const handleAddToCart = useCallback(() => {
    if (isCoffee && (!selectedBean || !selectedMilk)) {
      toast.error("Please select both bean and milk type");
      return;
    }
    setAdding(true);
    addToCart({
      id: Date.now().toString() + Math.random(),
      productId: product.id,
      product,
      quantity: 1,
      bean: selectedBean,
      milk: selectedMilk,
      strength,
      temp,
      sweetness,
      isCustomized: isCoffee,
    });
    setTimeout(() => navigate("/cart"), 600);
  }, [addToCart, isCoffee, selectedBean, selectedMilk, strength, temp, sweetness, product, navigate]);

  /* ── Loading ── */
  if (loading) return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@200;300&display=swap');`}</style>
      <div style={{ minHeight: "100vh", background: "#0d0a05", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Jost',sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: "1px solid rgba(201,169,110,0.25)", borderTopColor: "#c9a96e", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontStyle: "italic", color: "rgba(245,240,232,0.3)" }}>Loading customization…</p>
        </div>
      </div>
    </>
  );

  /* ── Error ── */
  if (error || !product) return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@200;300&display=swap');`}</style>
      <div style={{ minHeight: "100vh", background: "#0d0a05", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Jost',sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontStyle: "italic", color: "rgba(245,240,232,0.3)", marginBottom: 24 }}>{error || "Product not found"}</p>
          <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 auto", color: "rgba(201,169,110,0.6)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer" }}>
            <ArrowLeft /> Back to Menu
          </button>
        </div>
      </div>
    </>
  );

  const canAdd = !isCoffee || (selectedBean && selectedMilk);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
        .brew-in { animation: fadeUp 0.45s ease forwards; }
        .brew-range::-webkit-slider-thumb { -webkit-appearance:none; width:14px; height:14px; border-radius:50%; background:#c9a96e; border:2px solid #0d0a05; cursor:pointer; transition:transform .15s; }
        .brew-range::-webkit-slider-thumb:hover { transform:scale(1.2); }
        .brew-range::-moz-range-thumb { width:14px; height:14px; border-radius:50%; background:#c9a96e; border:2px solid #0d0a05; cursor:pointer; }
        .brew-range { -webkit-appearance:none; appearance:none; height:2px; background:rgba(201,169,110,0.18); border-radius:0; outline:none; cursor:pointer; }
        .temp-btn { padding:8px 14px; border:1px solid rgba(201,169,110,0.15); background:transparent; color:rgba(245,240,232,0.45); font-family:'Jost',sans-serif; font-size:9px; letter-spacing:.3em; text-transform:uppercase; cursor:pointer; transition:all .2s; flex:1; }
        .temp-btn:hover { border-color:rgba(201,169,110,0.3); color:rgba(245,240,232,0.7); }
        .temp-btn.active { border-color:rgba(201,169,110,0.5); background:rgba(201,169,110,0.1); color:#c9a96e; }
        .gold-btn { transition:background .22s ease, transform .15s ease; }
        .gold-btn:hover:not(:disabled) { background:#d4b87a; }
        .gold-btn:active:not(:disabled) { transform:scale(0.98); }
        .slim-scroll::-webkit-scrollbar { width:2px; }
        .slim-scroll::-webkit-scrollbar-track { background:transparent; }
        .slim-scroll::-webkit-scrollbar-thumb { background:rgba(201,169,110,0.2); }
        .taste-chip { display:inline-block; border:1px solid rgba(201,169,110,0.2); font-size:9px; letter-spacing:.3em; text-transform:uppercase; padding:4px 10px; color:rgba(201,169,110,0.6); margin:3px; font-family:'Jost',sans-serif; }
        .pulse-dot { width:6px; height:6px; border-radius:50%; background:#c9a96e; animation:pulse 2s infinite; display:inline-block; }
      `}</style>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#110d07", color: "#f5f0e8",
            border: "1px solid rgba(201,169,110,0.2)", borderRadius: 0,
            fontSize: "12px", padding: "12px 18px",
            fontFamily: "'Jost',sans-serif", letterSpacing: "0.05em",
          },
          success: { iconTheme: { primary: "#c9a96e", secondary: "#0d0a05" } },
          error:   { iconTheme: { primary: "#f87171", secondary: "#0d0a05" } },
        }}
      />

      <div style={{ minHeight: "100vh", background: "#0d0a05", fontFamily: "'Jost',sans-serif" }}>
        {/* Ambient glow */}
        <div style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, left: "33%", width: 500, height: 500, borderRadius: "50%", background: "rgba(201,169,110,0.022)", filter: "blur(140px)" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 350, height: 350, borderRadius: "50%", background: "rgba(201,169,110,0.015)", filter: "blur(110px)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10 }}>
          <Navbar />

          {/* PAGE HEADER */}
          <div className="brew-in" style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 32px" }}>
            <button
              onClick={() => navigate(-1)}
              style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(201,169,110,0.45)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", marginBottom: 40, transition: "color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(201,169,110,0.45)"}
            >
              <span style={{ height: 1, width: 20, background: "currentColor", display: "block" }} />
              Back to Menu
            </button>

            <p style={{ color: "#c9a96e", fontSize: 10, letterSpacing: "0.55em", textTransform: "uppercase", marginBottom: 12, opacity: 0.7 }}>BUILD YOUR CUP</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", color: "#f5f0e8", fontWeight: 300, lineHeight: 1, letterSpacing: "0.02em", fontSize: "clamp(2.5rem,5.5vw,4rem)" }}>
              Craft Your <em style={{ color: "#c9a96e" }}>{product.name}</em>
            </h1>

            <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(to right,rgba(201,169,110,0.45),rgba(201,169,110,0.12),transparent)" }} />
              <div style={{ width: 5, height: 5, transform: "rotate(45deg)", background: "rgba(201,169,110,0.35)", flexShrink: 0 }} />
            </div>
          </div>

          {/* CONTENT */}
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 112px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 2, background: "rgba(201,169,110,0.1)", alignItems: "start" }}>

              {/* ── LEFT ── */}
              <div style={{ background: "#0d0a05" }}>

                {/* Product strip */}
                <div style={{ background: "#110d07", border: "1px solid rgba(201,169,110,0.1)", display: "flex", alignItems: "center", gap: 20, padding: 24, marginBottom: 2 }}>
                  <div style={{ width: 64, height: 64, flexShrink: 0, overflow: "hidden", border: "1px solid rgba(201,169,110,0.12)", background: "#1a1510" }}>
                    <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "rgba(201,169,110,0.5)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 2 }}>{product.category}</p>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "rgba(245,240,232,0.85)", fontWeight: 300, fontSize: "1.2rem" }}>{product.name}</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ color: "rgba(245,240,232,0.25)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 2 }}>from</p>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#c9a96e", fontWeight: 300, fontSize: "1.3rem" }}>₹{basePrice}</p>
                  </div>
                </div>

                {/* BEAN SECTION */}
                {isCoffee && (
                  <div style={{ background: "#110d07", border: "1px solid rgba(201,169,110,0.1)", borderTop: "none", padding: "24px 22px", marginBottom: 2 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <span style={{ color: "rgba(201,169,110,0.55)", fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase" }}>01 · Bean Origin</span>
                      <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.08)" }} />
                    </div>
                    <div className="slim-scroll" style={{ maxHeight: 280, overflowY: "auto" }}>
                      {beanTypes.map((bean) => (
                        <OptionCard
                          key={bean.id}
                          item={bean}
                          selected={selectedBean?.id === bean.id}
                          onClick={() => setSelectedBean(bean)}
                          sub={bean.description}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* MILK SECTION */}
                {isCoffee && (
                  <div style={{ background: "#110d07", border: "1px solid rgba(201,169,110,0.1)", borderTop: "none", padding: "24px 22px", marginBottom: 2 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <span style={{ color: "rgba(201,169,110,0.55)", fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase" }}>02 · Milk Choice</span>
                      <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.08)" }} />
                    </div>
                    <div className="slim-scroll" style={{ maxHeight: 280, overflowY: "auto" }}>
                      {milkOptions.map((milk) => (
                        <OptionCard
                          key={milk.id}
                          item={milk}
                          selected={selectedMilk?.id === milk.id}
                          onClick={() => setSelectedMilk(milk)}
                          sub={milk.calories ? `${milk.calories} cal` : null}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* FINE TUNING SECTION */}
                <div style={{ background: "#110d07", border: "1px solid rgba(201,169,110,0.1)", borderTop: "none", padding: "24px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                    <span style={{ color: "rgba(201,169,110,0.55)", fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase" }}>
                      {isCoffee ? "03" : "01"} · Fine Tuning
                    </span>
                    <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.08)" }} />
                  </div>

                  {/* Strength */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                      <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(245,240,232,0.45)" }}>Strength</p>
                      <div style={{ marginLeft: "auto" }}>
                        <StrengthPips value={strength} />
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", width: 30 }}>Mild</span>
                      <input
                        className="brew-range"
                        type="range" min={1} max={5} value={strength} step={1}
                        onChange={(e) => setStrength(Number(e.target.value))}
                        style={{ flex: 1 }}
                      />
                      <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", width: 30, textAlign: "right" }}>Bold</span>
                    </div>
                  </div>

                  {/* Sweetness */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                      <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(245,240,232,0.45)" }}>Sweetness</p>
                      <span style={{ marginLeft: "auto", fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: "#c9a96e" }}>
                        {SWEETNESS_LABELS[sweetness]}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", width: 30 }}>None</span>
                      <input
                        className="brew-range"
                        type="range" min={0} max={5} value={sweetness} step={1}
                        onChange={(e) => setSweetness(Number(e.target.value))}
                        style={{ flex: 1 }}
                      />
                      <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", width: 30, textAlign: "right" }}>Sweet</span>
                    </div>
                    {sweetness > 3 && (
                      <p style={{ fontSize: 9, color: "rgba(201,169,110,0.45)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 6 }}>
                        Extra syrup · $₹2
                      </p>
                    )}
                  </div>

                  {/* Temperature */}
                  <div>
                    <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(245,240,232,0.45)", marginBottom: 10 }}>Temperature</p>
                    <div style={{ display: "flex", gap: 6 }}>
                      {["iced", "warm", "hot"].map((t) => (
                        <button
                          key={t}
                          className={`temp-btn${temp === t ? " active" : ""}`}
                          onClick={() => setTemp(t)}
                        >
                          {t === "iced" ? "Iced" : t === "warm" ? "Warm" : "Hot"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Security note */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 0", color: "rgba(245,240,232,0.18)", borderTop: "1px solid rgba(201,169,110,0.08)" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <span style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" }}>Secure · Fresh · Handcrafted</span>
                </div>
              </div>

              {/* ── RIGHT: Summary Panel ── */}
              <div style={{ background: "#110d07", borderLeft: "1px solid rgba(201,169,110,0.1)" }}>
                <div style={{ position: "sticky", top: 24, padding: 24 }}>

                  {/* Live badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <span className="pulse-dot" />
                    <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)" }}>Live Preview</p>
                  </div>

                  {/* Cup Visual */}
                  <CupPreview bean={selectedBean} milk={selectedMilk} strength={strength} temp={temp} />

                  {/* Taste Profile */}
                  <div style={{ border: "1px solid rgba(201,169,110,0.12)", background: "#0d0a05", padding: 16, marginBottom: 16 }}>
                    <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.5)", marginBottom: 8 }}>Taste Prediction</p>
                    <p style={{
                      fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", fontStyle: "italic", lineHeight: 1.4,
                      color: selectedBean && selectedMilk ? "#f5f0e8" : "rgba(245,240,232,0.2)",
                      marginBottom: tasteProfile.chips.length ? 10 : 0,
                    }}>
                      {tasteProfile.desc}
                    </p>
                    {tasteProfile.chips.length > 0 && (
                      <div>
                        {tasteProfile.chips.map((c) => (
                          <span className="taste-chip" key={c}>{c}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: "linear-gradient(to right,rgba(201,169,110,0.25),transparent)", marginBottom: 16 }} />

                  {/* Price Breakdown */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                      <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)" }}>Base</span>
                      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: "rgba(245,240,232,0.4)" }}>₹{basePrice}</span>
                    </div>
                    {selectedBean?.priceAdd > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                        <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selectedBean.name}</span>
                        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: "rgba(245,240,232,0.4)" }}>+₹{selectedBean.priceAdd}</span>
                      </div>
                    )}
                    {selectedMilk?.priceAdd > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                        <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selectedMilk.name}</span>
                        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: "rgba(245,240,232,0.4)" }}>+₹{selectedMilk.priceAdd}</span>
                      </div>
                    )}
                    {extraSweet > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                        <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)" }}>Extra Sweet</span>
                        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: "rgba(245,240,232,0.4)" }}>+₹{extraSweet}</span>
                      </div>
                    )}
                    {isCoffee && !selectedBean && !selectedMilk && (
                      <p style={{ fontSize: 10, fontStyle: "italic", color: "rgba(245,240,232,0.18)" }}>Select options to see breakdown</p>
                    )}

                    <div style={{ height: 1, background: "linear-gradient(to right,rgba(201,169,110,0.2),transparent)", margin: "10px 0" }} />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.6)" }}>Total</span>
                      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 300, color: "#c9a96e" }}>₹{totalPrice.toFixed(0)}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    className="gold-btn"
                    onClick={handleAddToCart}
                    disabled={adding || !canAdd}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "14px 22px", background: "#c9a96e", color: "#0d0a05",
                      fontFamily: "'Jost',sans-serif", fontSize: "0.62rem", letterSpacing: "0.38em", textTransform: "uppercase",
                      border: "none", cursor: canAdd && !adding ? "pointer" : "not-allowed",
                      opacity: !canAdd || adding ? 0.3 : 1,
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {adding && <div style={{ width: 12, height: 12, border: "1px solid rgba(13,10,5,0.4)", borderTopColor: "#0d0a05", borderRadius: "50%", animation: "spin 1s linear infinite" }} />}
                      {adding ? "Adding…" : canAdd ? "Add to Cart" : "Select options"}
                    </span>
                    {!adding && <ArrowRight />}
                  </button>

                  {!canAdd && (
                    <p style={{ textAlign: "center", color: "rgba(245,240,232,0.18)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 10 }}>
                      Select bean &amp; milk to continue
                    </p>
                  )}

                  {/* Trust badges */}
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(201,169,110,0.08)", display: "flex", justifyContent: "center", gap: 8 }}>
                    {["Fresh", "Handcrafted", "Your Way"].map((b) => (
                      <span key={b} style={{ color: "rgba(201,169,110,0.25)", fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", border: "1px solid rgba(201,169,110,0.08)", padding: "3px 8px", fontFamily: "'Jost',sans-serif" }}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}