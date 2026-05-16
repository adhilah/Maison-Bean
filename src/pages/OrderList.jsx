import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

const API = "/order";

/* ─────────── Icons ─────────── */
const PackageIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const CloseIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const CodIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
  </svg>
);

const UpiIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const CardIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /><line x1="6" y1="16" x2="10" y2="16" />
  </svg>
);

const STATUS = {
  pending: {
    label: "Pending", dot: "#f5a623", step: 0,
    text: "text-[#f5a623]", bg: "bg-[#f5a62318]", border: "border-[#f5a623]/30",
  },
  processing: {
    label: "Processing", dot: "#3b82f6", step: 1,
    text: "text-[#3b82f6]", bg: "bg-[#3b82f618]", border: "border-[#3b82f6]/30",
  },
  "out for delivery": {
    label: "Out for Delivery", dot: "#a78bfa", step: 2,
    text: "text-[#a78bfa]", bg: "bg-[#a78bfa18]", border: "border-[#a78bfa]/30",
  },
  delivered: {
    label: "Delivered", dot: "#4ade80", step: 3,
    text: "text-[#4ade80]", bg: "bg-[#4ade8018]", border: "border-[#4ade80]/30",
  },
  cancelled: {
    label: "Cancelled", dot: "#f87171", step: -1,
    text: "text-[#f87171]", bg: "bg-[#f8717118]", border: "border-[#f87171]/30",
  },
  confirmed: {
    label: "Confirmed", dot: "#3b82f6", step: 1,
    text: "text-[#3b82f6]", bg: "bg-[#3b82f618]", border: "border-[#3b82f6]/30",
  },
  preparing: {
    label: "Preparing", dot: "#c9a96e", step: 1,
    text: "text-[#c9a96e]", bg: "bg-[#c9a96e18]", border: "border-[#c9a96e]/30",
  },
  shipped: {
    label: "Shipped", dot: "#a78bfa", step: 2,
    text: "text-[#a78bfa]", bg: "bg-[#a78bfa18]", border: "border-[#a78bfa]/30",
  },
};

const getStepIndex = (status) => STATUS[status?.toLowerCase()]?.step ?? 0;

const PAYMENT = {
  cod:  { label: "Cash on Delivery", Icon: CodIcon  },
  upi:  { label: "UPI Payment",      Icon: UpiIcon  },
  card: { label: "Card Payment",     Icon: CardIcon },
};

/* ─────────── Confirm Dialog ─────────── */
const ConfirmToast = ({ t, title, subtitle, confirmLabel, confirmClass, onConfirm }) => (
  <div className="p-5 bg-[#110d07] border border-[#c9a96e]/25 shadow-2xl min-w-[300px] font-['Jost',sans-serif]">
    <p className="font-['Cormorant_Garamond',serif] text-[1.1rem] font-light text-[#f5f0e8] mb-1">{title}</p>
    {subtitle && <p className="text-[#f5f0e8]/40 text-[11px] tracking-wide mb-4">{subtitle}</p>}
    <div className="flex gap-2.5 justify-end mt-4">
      <button
        onClick={() => { toast.dismiss(t.id); onConfirm(); }}
        className={`px-5 py-2 text-[0.6rem] tracking-[0.3em] uppercase transition-all ${confirmClass}`}
      >
        {confirmLabel}
      </button>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="px-5 py-2 text-[0.6rem] tracking-[0.3em] uppercase border border-[#c9a96e]/20 text-[#f5f0e8]/50 hover:border-[#c9a96e]/40 hover:text-[#f5f0e8]/80 transition-all"
      >
        Keep
      </button>
    </div>
  </div>
);

/* ─────────── Main ─────────── */
export default function OrderList() {
  const [orders, setOrders]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [deletingId, setDeletingId]   = useState(null);
  const [expandedId, setExpandedId]   = useState(null);
  // const [user, setUser] = useState(null);

  // const storedUser = localStorage.getItem("authUser");
  // const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => { toast.dismiss(); }, []);

//   useEffect(() => {

//   const checkAuth = async () => {

//     try {
//       await api.get("/auth/me");
//       setUser(true);
//       fetchOrders();
//     } catch {
//       setUser(false);
//       setLoading(false);
//     }
//   };
//   checkAuth();

// }, []);
useEffect(() => {
  fetchOrders();
}, []);

  const fetchOrders = async () => {

  try {

    const res = await api.get(API);

    setOrders(res.data);

  } catch (err) {

    if (err.response?.status === 401) {
      toast.error("Please login");
    } else {
      toast.error("Failed to fetch orders");
    }

  } finally {

    setLoading(false);
  }
};

  const confirmCancelOrder = (orderId) => {
    toast(
      (t) => (
        <ConfirmToast
          t={t}
          title="Cancel this order?"
          subtitle="This action cannot be undone."
          confirmLabel="Yes, Cancel"
          confirmClass="bg-[#f87171]/20 border border-[#f87171]/40 text-[#f87171] hover:bg-[#f87171]/30"
          onConfirm={() => handleCancelOrder(orderId)}
        />
      ),
      { duration: Infinity, style: { background: "transparent", boxShadow: "none", padding: 0 } }
    );
  };

  const handleCancelOrder = async (orderId) => {
    try {
      setCancelingId(orderId);
      await api.patch(`${API}/${orderId}/cancel`);
      await fetchOrders();
      toast.success("Order cancelled");
    } catch {
      toast.error("Failed to cancel order");
    } finally {
      setCancelingId(null);
    }
  };

  const confirmDeleteOrder = (orderId) => {
    toast(
      (t) => (
        <ConfirmToast
          t={t}
          title="Delete this order permanently?"
          subtitle="All order data will be removed."
          confirmLabel="Delete"
          confirmClass="bg-[#c9a96e] text-[#0d0a05] hover:bg-[#d4b87a]"
          onConfirm={() => handleDelete(orderId)}
        />
      ),
      { duration: Infinity, style: { background: "transparent", boxShadow: "none", padding: 0 } }
    );
  };

  const handleDelete = async (orderId) => {
    try {
      setDeletingId(orderId);
      await api.delete(`${API}/${orderId}`);
      await fetchOrders();
      toast.success("Order deleted");
    } catch {
      toast.error("Failed to delete order");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  // Helper to read item fields from both ASP.NET and old JSON Server shape
  const getItemField = (item, aspField, oldField) =>
    item[aspField] ?? item.product?.[oldField];

  /* ── Not logged in ── */
  // if (user === false) return (
  //   <>
  //     <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');`}</style>
  //     <div className="min-h-screen bg-[#0d0a05] flex items-center justify-center font-['Jost',sans-serif]">
  //       <div className="text-center space-y-4">
  //         <p className="font-['Cormorant_Garamond',serif] text-[2rem] italic text-[#f5f0e8]/40">Please sign in</p>
  //         <Link to="/login" className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase hover:text-[#d4b87a] transition-colors">
  //           Go to Login →
  //         </Link>
  //       </div>
  //     </div>
  //   </>
  // );

  /* ── Loading ── */
  if (loading) return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');`}</style>
      <div className="min-h-screen bg-[#0d0a05] flex items-center justify-center">
        <div className="text-center space-y-5">
          <div className="w-12 h-12 border border-[#c9a96e]/30 border-t-[#c9a96e] rounded-full animate-spin mx-auto" />
          <p className="font-['Cormorant_Garamond',serif] text-[1.2rem] italic text-[#f5f0e8]/30">
            Loading your orders...
          </p>
        </div>
      </div>
    </>
  );

  /* ── Empty ── */
  if (orders.length === 0) return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');`}</style>
      <div className="min-h-screen bg-[#0d0a05] flex flex-col items-center justify-center gap-7 font-['Jost',sans-serif]">
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 border border-[#c9a96e]/10 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 border border-[#c9a96e]/18 rounded-full flex items-center justify-center text-[#c9a96e]/25">
              <PackageIcon size={28} />
            </div>
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="font-['Cormorant_Garamond',serif] text-[2.2rem] font-light italic text-[#f5f0e8]/30">
            No orders yet
          </p>
          <p className="text-[#f5f0e8]/18 text-[10px] tracking-[0.4em] uppercase">
            Your order history will appear here
          </p>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2.5 px-8 py-3.5 bg-[#c9a96e] hover:bg-[#d4b87a] text-[#0d0a05] text-[0.6rem] tracking-[0.4em] uppercase transition-all duration-200"
          style={{ fontFamily: "'Jost',sans-serif" }}
        >
          <PackageIcon size={12} /> Shop Now
        </Link>
      </div>
    </>
  );

  /* ── Main ── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@100;200;300;400;500&display=swap');

        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

        .order-card { animation: fadeUp 0.45s ease forwards; }
        .status-bar-fill { transition: width 0.8s cubic-bezier(0.34,1.56,0.64,1); }

        .gold-btn { transition: background 0.22s ease, transform 0.15s ease; }
        .gold-btn:hover  { background: #d4b87a; }
        .gold-btn:active { transform: scale(0.97); }

        .item-card:hover { border-color: rgba(201,169,110,0.25); }
        .item-card:hover img { transform: scale(1.04); opacity:1; }
        .item-card img { transition: transform 0.6s ease, opacity 0.4s ease; }

        [data-hot-toast] > div { background: transparent !important; padding: 0 !important; }
      `}</style>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#110d07", color: "#f5f0e8",
            border: "1px solid rgba(201,169,110,0.2)", borderRadius: 0,
            fontSize: "13px", padding: "12px 18px",
            fontFamily: "'Jost',sans-serif", letterSpacing: "0.05em",
          },
          success: { iconTheme: { primary: "#c9a96e", secondary: "#0d0a05" } },
          error:   { iconTheme: { primary: "#f87171", secondary: "#0d0a05" } },
        }}
      />

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif]">

        {/* Ambient */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.02] blur-[130px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#c9a96e]/[0.015] blur-[110px]" />
        </div>

        <div className="relative z-10">
          <Navbar />

          {/* ══ PAGE HEADER ══ */}
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-14 pt-14 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <div>
                <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.55em] uppercase mb-3 opacity-75">
                  ORDER HISTORY
                </p>
                <div className="flex items-end gap-4 flex-wrap">
                  <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,5.5vw,4rem)] font-light leading-none tracking-wide text-[#f5f0e8]">
                    My <span className="italic text-[#c9a96e]">Orders</span>
                  </h1>
                  <span className="mb-1 font-['Cormorant_Garamond',serif] text-[1.3rem] text-[#c9a96e]/35 italic">
                    {orders.length} {orders.length === 1 ? "order" : "orders"}
                  </span>
                </div>
              </div>
              <Link
                to="/"
                className="text-[#c9a96e]/60 hover:text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 transition-all group self-end md:self-auto"
              >
                CONTINUE SHOPPING
                <span className="group-hover:w-10 transition-all duration-300 w-6 h-px bg-current inline-block" />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/45 via-[#c9a96e]/12 to-transparent" />
              <div className="w-[5px] h-[5px] rotate-45 bg-[#c9a96e]/35 flex-shrink-0" />
            </div>
          </div>

          {/* ══ ORDER CARDS ══ */}
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-14 pb-28 space-y-6">
            {orders.map((order, idx) => {

              const rawStatus   = (order.status || "pending").toLowerCase().trim();
              const st          = STATUS[rawStatus] || STATUS.pending;
              const isCancelled = rawStatus === "cancelled";
              const canCancel   = !isCancelled && rawStatus !== "delivered";

              const pm      = PAYMENT[order.paymentMethod] || { label: "Unknown", Icon: CardIcon };
              const PayIcon = pm.Icon;
              const isExpanded = expandedId === order.id;
              const shortId    = String(order.id).slice(-8).toUpperCase();

              const stepIdx  = getStepIndex(rawStatus);
              const barWidth = stepIdx <= 0 ? "0%" : stepIdx === 1 ? "33%" : stepIdx === 2 ? "66%" : "100%";

              return (
                <div
                  key={order.id}
                  className="order-card bg-[#110d07] border border-[#c9a96e]/12 overflow-hidden transition-all duration-500 hover:border-[#c9a96e]/25"
                  style={{ animationDelay: `${idx * 70}ms` }}
                >

                  {/* ── Card Header ── */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-7 py-5 cursor-pointer select-none border-b border-[#c9a96e]/10"
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-['Cormorant_Garamond',serif] text-[11px] italic text-[#c9a96e]/25 flex-shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[#c9a96e] text-[9px] tracking-[0.4em] uppercase opacity-60 mb-0.5">Order ID</p>
                        <p className="font-['Cormorant_Garamond',serif] text-[1.2rem] font-light text-[#f5f0e8]">
                          #{shortId}
                        </p>
                      </div>
                      <div className="hidden sm:block w-px h-8 bg-[#c9a96e]/10" />
                      <div className="hidden sm:block">
                        <p className="text-[#f5f0e8]/25 text-[10px] tracking-[0.2em] uppercase mb-0.5">Date</p>
                        <p className="text-[#f5f0e8]/55 text-[12px]">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`hidden md:flex items-center gap-1.5 px-3 py-1 border text-[9px] tracking-[0.3em] uppercase ${st.bg} ${st.border} ${st.text}`}>
                        <PayIcon /> {pm.label}
                      </span>
                      <span className={`flex items-center gap-1.5 px-3 py-1 border text-[9px] tracking-[0.3em] uppercase ${st.bg} ${st.border} ${st.text}`}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: st.dot }} />
                        {st.label}
                      </span>
                      <span className="font-['Cormorant_Garamond',serif] text-[1.6rem] font-light text-[#c9a96e]">
                        ₹{Number(order.total || 0).toFixed(0)}
                      </span>
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="#c9a96e" strokeWidth="1.5"
                        className={`transition-transform duration-300 opacity-50 ${isExpanded ? "rotate-180" : ""}`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* ── Progress Bar ── */}
                  {!isCancelled && (
                    <div className="px-7 py-3 border-b border-[#c9a96e]/08 bg-[#0d0a05]/40">
                      <div className="flex items-center justify-between mb-2">
                        {["Pending", "Processing", "Out for Delivery", "Delivered"].map((step) => {
                          const stepOrder = { Pending: 0, Processing: 1, "Out for Delivery": 2, Delivered: 3 };
                          const active    = stepIdx >= stepOrder[step];
                          return (
                            <span
                              key={step}
                              className={`text-[8px] tracking-[0.25em] uppercase transition-colors duration-500 ${
                                active ? "text-[#c9a96e]" : "text-[#f5f0e8]/18"
                              }`}
                            >
                              {step}
                            </span>
                          );
                        })}
                      </div>
                      <div className="h-px bg-[#c9a96e]/10 relative overflow-hidden">
                        <div
                          className="status-bar-fill absolute top-0 left-0 h-full bg-[#c9a96e]"
                          style={{ width: barWidth }}
                        />
                      </div>
                    </div>
                  )}

                  {/* ── Expandable Items ── */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="p-6">
                      <p className="sm:hidden text-[#f5f0e8]/30 text-[11px] mb-4">{formatDate(order.date)}</p>

                      {/* Items */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#c9a96e]/08 mb-6">
                        {order.items.map((item, i) => {
                          // Support both ASP.NET shape (flat) and old JSON Server shape (nested product)
                          const name     = item.productName     ?? item.product?.name;
                          const image    = item.productImage    ?? item.product?.image;
                          const category = item.productCategory ?? item.product?.category;
                          const price    = item.basePrice       ?? item.product?.basePrice ?? 0;

                          return (
                            <div
                              key={i}
                              className="item-card group bg-[#0d0a05] border border-[#c9a96e]/08 flex gap-4 p-4 transition-all duration-300"
                            >
                              <div className="relative w-[76px] h-[64px] flex-shrink-0 overflow-hidden bg-[#1a1510] border border-[#c9a96e]/10">
                                <img
                                  src={image}
                                  alt={name}
                                  className="w-full h-full object-cover opacity-85"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                {category && (
                                  <p className="text-[#c9a96e] text-[8px] tracking-[0.35em] uppercase opacity-55 mb-0.5">
                                    {category}
                                  </p>
                                )}
                                <h4 className="font-['Cormorant_Garamond',serif] text-[1rem] font-light text-[#f5f0e8] leading-snug group-hover:text-[#c9a96e] transition-colors truncate">
                                  {name}
                                </h4>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-[#f5f0e8]/35 text-[10px] tracking-wide">
                                    Qty: {item.quantity}
                                  </span>
                                  <span className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#c9a96e]">
                                    ₹{(price * item.quantity).toFixed(0)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Summary */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#c9a96e]/10">
                        <span className={`md:hidden flex items-center gap-1.5 px-3 py-1 border text-[9px] tracking-[0.3em] uppercase ${st.bg} ${st.border} ${st.text}`}>
                          <PayIcon /> {pm.label}
                        </span>
                        <div className="flex items-center gap-2 ml-auto">
                          <span className="text-[#f5f0e8]/35 text-[10px] tracking-[0.2em] uppercase">Order Total</span>
                          <span className="font-['Cormorant_Garamond',serif] text-[1.5rem] font-light text-[#c9a96e]">
                            ₹{Number(order.total || 0).toFixed(0)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center justify-end gap-3 mt-4 pt-4 border-t border-[#c9a96e]/08">
                        {canCancel && (
                          <button
                            onClick={() => confirmCancelOrder(order.id)}
                            disabled={cancelingId === order.id}
                            className="flex items-center gap-2 px-5 py-2.5 border border-[#f87171]/25 text-[#f87171]/70 hover:border-[#f87171]/50 hover:text-[#f87171] text-[0.58rem] tracking-[0.3em] uppercase transition-all disabled:opacity-40"
                            style={{ fontFamily: "'Jost',sans-serif" }}
                          >
                            {cancelingId === order.id ? "Cancelling..." : "Cancel Order"}
                          </button>
                        )}

                        {isCancelled && (
                          <div className="flex items-center gap-3">
                            <span className={`flex items-center gap-1.5 px-3 py-1.5 border text-[9px] tracking-[0.3em] uppercase ${st.bg} ${st.border} ${st.text}`}>
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: st.dot }} />
                              Order Cancelled
                            </span>
                            <button
                              onClick={() => confirmDeleteOrder(order.id)}
                              disabled={deletingId === order.id}
                              className="w-8 h-8 border border-[#c9a96e]/20 flex items-center justify-center text-[#f5f0e8]/30 hover:text-[#f5f0e8]/70 hover:border-[#c9a96e]/45 transition-all disabled:opacity-40"
                              title="Delete order"
                            >
                              {deletingId === order.id
                                ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                                : <CloseIcon />}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Collapsed preview */}
                  {!isExpanded && (
                    <div
                      className="flex items-center justify-between px-7 py-3 cursor-pointer hover:bg-[#c9a96e]/03 transition-colors group"
                      onClick={() => setExpandedId(order.id)}
                    >
                      <p className="text-[#f5f0e8]/25 text-[11px] tracking-wide truncate max-w-[60%]">
                        {order.items.map((i) => i.productName ?? i.product?.name).join(" · ")}
                      </p>
                      <span className="text-[#c9a96e]/40 group-hover:text-[#c9a96e]/70 text-[9px] tracking-[0.3em] uppercase flex items-center gap-2 transition-colors flex-shrink-0">
                        View Details <ArrowRight />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}