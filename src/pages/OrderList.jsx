// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { Package } from "lucide-react";

// const API = "http://localhost:3000";

// export default function OrderList() {
//   // State management
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cancelingId, setCancelingId] = useState(null); // Tracks which order is being cancelled
//   const [deletingId, setDeletingId] = useState(null);   // Tracks which order is being deleted

//   const navigate = useNavigate();
//   const storedUser = localStorage.getItem("authUser");
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   // -------------------------------------------------------------
//   // Clear all previous toasts when entering this page
//   // This prevents old toasts (from cart, login, etc.) from stacking up
//   // -------------------------------------------------------------
//   useEffect(() => {
//     toast.dismiss(); // Dismisses all active toasts instantly
//   }, []);

//   // -------------------------------------------------------------
//   // Fetch orders on mount (only if user is logged in)
//   // -------------------------------------------------------------
//   useEffect(() => {
//     if (!user) {
//       setLoading(false);
//       return;
//     }
//     fetchOrders();
//   }, []); // Empty dependency: run only once on mount

//   // -------------------------------------------------------------
//   // Fetch user's orders from json-server
//   // -------------------------------------------------------------
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`${API}/orders`);
//       const userOrders = res.data
//         .filter((o) => String(o.userId) === String(user.id))
//         .reverse(); // Newest orders first
//       setOrders(userOrders);
//     } catch (err) {
//       console.error("Failed to fetch orders", err);
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------------------------------------------------
//   // Show confirmation toast before cancelling an order
//   // Styled with Maison Bean theme colors
//   // -------------------------------------------------------------
//   const confirmCancelOrder = (orderId) => {
//     toast(
//       (t) => (
//         <div className="p-4 bg-white rounded-2xl shadow-2xl border border-amber-200">
//           <p className="font-semibold text-[#7a5c2a] mb-3">
//             Are you sure you want to cancel this order?
//           </p>
//           <div className="flex gap-3 justify-end">
//             <button
//               onClick={() => {
//                 toast.dismiss(t.id);
//                 handleCancelOrder(orderId);
//               }}
//               className="px-5 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
//             >
//               Yes, Cancel
//             </button>
//             <button
//               onClick={() => toast.dismiss(t.id)}
//               className="px-5 py-2 bg-amber-100 text-[#9c7635] rounded-xl font-medium hover:bg-amber-200 transition"
//             >
//               No
//             </button>
//           </div>
//         </div>
//       ),
//       {
//         duration: Infinity,
//         style: { background: "transparent", boxShadow: "none" }, // Remove default dark background
//       }
//     );
//   };

//   // -------------------------------------------------------------
//   // Actually cancel the order (after confirmation)
//   // -------------------------------------------------------------
//   const handleCancelOrder = async (orderId) => {
//     try {
//       setCancelingId(orderId);
//       await axios.patch(`${API}/orders/${orderId}`, { status: "cancelled" });
//       await fetchOrders();
//       toast.success("Order cancelled successfully");
//     } catch (err) {
//       console.error("Cancel failed", err);
//       toast.error("Failed to cancel order");
//     } finally {
//       setCancelingId(null);
//     }
//   };

//   // -------------------------------------------------------------
//   // Show confirmation toast before permanently deleting a cancelled order
//   // Themed with warm amber tones
//   // -------------------------------------------------------------
//   const confirmDeleteOrder = (orderId) => {
//     toast(
//       (t) => (
//         <div className="p-4 bg-white rounded-2xl shadow-2xl border border-amber-200">
//           <p className="font-semibold text-[#7a5c2a] mb-2">
//             Permanently delete this cancelled order?
//           </p>
//           <p className="text-sm text-[#b48a41] mb-4">This action cannot be undone.</p>
//           <div className="flex gap-3 justify-end">
//             <button
//               onClick={() => {
//                 toast.dismiss(t.id);
//                 handleDelete(orderId);
//               }}
//               className="px-5 py-2 bg-[#9c7635] text-white rounded-xl font-medium hover:bg-[#7f602b] transition"
//             >
//               Delete Permanently
//             </button>
//             <button
//               onClick={() => toast.dismiss(t.id)}
//               className="px-5 py-2 bg-amber-100 text-[#9c7635] rounded-xl font-medium hover:bg-amber-200 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ),
//       {
//         duration: Infinity,
//         style: { background: "transparent", boxShadow: "none" },
//       }
//     );
//   };

//   // -------------------------------------------------------------
//   // Permanently delete a cancelled order
//   // -------------------------------------------------------------
//   const handleDelete = async (orderId) => {
//     try {
//       setDeletingId(orderId);
//       await axios.delete(`${API}/orders/${orderId}`);
//       await fetchOrders();
//       toast.success("Order deleted permanently");
//     } catch (err) {
//       console.error("Delete failed", err);
//       toast.error("Failed to delete order");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // -------------------------------------------------------------
//   // Helper: Format date nicely
//   // -------------------------------------------------------------
//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   // -------------------------------------------------------------
//   // Helper: Payment method badge styling
//   // -------------------------------------------------------------
//   const paymentMethodBadge = (method) => {
//     switch (method) {
//       case "cod":
//         return { label: "Cash on Delivery", color: "bg-orange-100 text-orange-800" };
//       case "upi":
//         return { label: "UPI Payment", color: "bg-blue-100 text-blue-800" };
//       case "card":
//         return { label: "Card Payment", color: "bg-purple-100 text-purple-800" };
//       default:
//         return { label: "Unknown", color: "bg-gray-100 text-gray-800" };
//     }
//   };

//   // -------------------------------------------------------------
//   // Render: Not logged in
//   // -------------------------------------------------------------
//   if (!user) {
//     return (
//       <div className="min-h-screen bg-amber-50 flex items-center justify-center">
//         <Link to="/login" className="text-2xl font-medium text-[#9c7635] underline hover:text-[#7a5c2a]">
//           Please login to view your orders
//         </Link>
//       </div>
//     );
//   }

//   // -------------------------------------------------------------
//   // Render: Loading state
//   // -------------------------------------------------------------
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-amber-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-[#9c7635] border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-6 text-xl text-[#7a5c2a]">Loading your orders...</p>
//         </div>
//       </div>
//     );
//   }

//   // -------------------------------------------------------------
//   // Render: No orders yet
//   // -------------------------------------------------------------
//   if (orders.length === 0) {
//     return (
//       <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-4">
//         <Package size={80} className="text-amber-200 mb-6" />
//         <h1 className="text-3xl font-bold text-[#7a5c2a] mb-4">No orders yet</h1>
//         <p className="text-[#b48a41] mb-8">Start your coffee journey today!</p>
//         <Link
//           to="/"
//           className="px-8 py-4 bg-[#9c7635] hover:bg-[#7a5c2a] text-white rounded-xl font-bold transition transform hover:scale-105"
//         >
//           Shop Now
//         </Link>
//       </div>
//     );
//   }

//   // -------------------------------------------------------------
//   // Main Render: Orders List
//   // -------------------------------------------------------------
//   return (
//     <div className="min-h-screen bg-amber-50 py-10 px-4">
//       {/* Toaster with custom theme */}
//       <Toaster
//         position="top-center"
//         toastOptions={{
//           duration: 2000,
//           style: {
//             background: "#333",
//             color: "#fff",
//             fontSize: "16px",
//             padding: "12px 20px",
//             borderRadius: "12px",
//           },
//           success: { style: { background: "#756523" } },
//           error: { style: { background: "#b91c1c" } },
//         }}
//       />

//       <div className="max-w-6xl mx-auto">
//         {/* Page Header */}
//         <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//           <h1 className="text-4xl font-bold text-[#7a5c2a]">My Orders</h1>

//           <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
//             <Link
//               to="/"
//               className="text-[#9c7635] hover:underline font-medium flex items-center gap-2 transition-colors order-2 sm:order-1"
//             >
//               ← Continue Shopping
//             </Link>

//             <Link
//               to="/track-order/:orderId"
//               className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-[#9c7635] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#8a6a2f] hover:shadow-xl hover:-translate-y-1 order-1 sm:order-2"
//             >
//               <Package size={20} />
//               <span className="relative z-10">Track Products</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-[#b8964f] to-[#9c7635] opacity-0 transition-opacity group-hover:opacity-40"></div>
//             </Link>
//           </div>
//         </div>

//         {/* Orders Grid */}
//         <div className="space-y-10">
//           {orders.map((order) => {
//             const canCancel = order.status !== "cancelled" && order.status !== "delivered";
//             const isCancelled = order.status === "cancelled";
//             const paymentInfo = paymentMethodBadge(order.paymentMethod);

//             return (
//               <div
//                 key={order.id}
//                 className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 border border-amber-100"
//               >
//                 {/* Order Header */}
//                 <div className="bg-gradient-to-r from-[#9c7635] to-[#7a5c2a] text-white p-8">
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//                     <div>
//                       <p className="text-sm opacity-80">Order ID</p>
//                       <p className="text-2xl font-bold">#{order.id.slice(-8).toUpperCase()}</p>
//                       <p className="text-sm mt-2 opacity-90">{formatDate(order.date)}</p>
//                     </div>

//                     <div className="flex flex-col items-end gap-4">
//                       <div>
//                         <p className="text-4xl font-bold">
//                           ${Number(order.total || 0).toFixed(2)}
//                         </p>
//                       </div>

//                       <div className="flex flex-wrap justify-end gap-3">
//                         <span
//                           className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold ${paymentInfo.color}`}
//                         >
//                           {paymentInfo.label}
//                           {order.upiId && (
//                             <span className="text-xs opacity-80 ml-1">({order.upiId})</span>
//                           )}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Items */}
//                 <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {order.items.map((item, i) => (
//                     <div key={i} className="flex gap-5 bg-amber-50 p-6 rounded-2xl shadow">
//                       <img
//                         src={item.product.image}
//                         alt={item.product.name}
//                         className="w-24 h-24 rounded-xl object-cover shadow-md"
//                       />
//                       <div className="flex-1">
//                         <h4 className="font-bold text-gray-800 text-lg">{item.product.name}</h4>
//                         <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
//                         <p className="font-bold text-[#9c7635] mt-3 text-xl">
//                           ${(item.product.basePrice * item.quantity).toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="border-t border-amber-100 p-8 flex flex-col sm:flex-row gap-5 justify-end items-center bg-gray-50">
//                   {canCancel && (
//                     <button
//                       onClick={() => confirmCancelOrder(order.id)}
//                       disabled={cancelingId === order.id}
//                       className="px-8 py-3 rounded-xl bg-red-100 text-red-700 font-bold hover:bg-red-200 disabled:opacity-60 transition"
//                     >
//                       {cancelingId === order.id ? "Cancelling..." : "Cancel Order"}
//                     </button>
//                   )}

//                   {isCancelled && (
//                     <div className="flex items-center gap-4">
//                       <span className="text-red-700 font-bold text-lg">Order Cancelled</span>
//                       <button
//                         onClick={() => confirmDeleteOrder(order.id)}
//                         disabled={deletingId === order.id}
//                         className="w-12 h-12 rounded-full bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 transition flex items-center justify-center text-3xl font-light"
//                         title="Delete cancelled order"
//                       >
//                         {deletingId === order.id ? "..." : "×"}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

const API = "http://localhost:5000/api/Order";

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

  const storedUser = localStorage.getItem("authUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => { toast.dismiss(); }, []);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/${user.id}`);
      setOrders(res.data);
    } catch {
      toast.error("Failed to fetch orders");
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
      await axios.patch(`${API}/${orderId}/cancel`);
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
      await axios.delete(`${API}/${orderId}`);
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
  if (!user) return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');`}</style>
      <div className="min-h-screen bg-[#0d0a05] flex items-center justify-center font-['Jost',sans-serif]">
        <div className="text-center space-y-4">
          <p className="font-['Cormorant_Garamond',serif] text-[2rem] italic text-[#f5f0e8]/40">Please sign in</p>
          <Link to="/login" className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase hover:text-[#d4b87a] transition-colors">
            Go to Login →
          </Link>
        </div>
      </div>
    </>
  );

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
                        <p className="text-[#f5f0e8]/55 text-[12px]">{formatDate(order.date)}</p>
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