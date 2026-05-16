import { useEffect, useState, useRef } from "react";
import api from "../../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

/* ── Status config ── */
const STATUS_OPTIONS = [
  { value: "Pending",        label: "Pending",         dot: "#f5a623", text: "text-[#f5a623]",  bg: "bg-[#f5a62312]", border: "border-[#f5a623]/25" },
  { value: "Processing",     label: "Processing",       dot: "#3b82f6", text: "text-[#3b82f6]",  bg: "bg-[#3b82f612]", border: "border-[#3b82f6]/25" },
  { value: "Shipping",       label: "Shipping",         dot: "#a78bfa", text: "text-[#a78bfa]",  bg: "bg-[#a78bfa12]", border: "border-[#a78bfa]/25" },
  { value: "OutForDelivery", label: "Out for Delivery", dot: "#fb923c", text: "text-[#fb923c]",  bg: "bg-[#fb923c12]", border: "border-[#fb923c]/25" },
  { value: "Delivered",      label: "Delivered",        dot: "#4ade80", text: "text-[#4ade80]",  bg: "bg-[#4ade8012]", border: "border-[#4ade80]/25" },
  { value: "Cancelled",      label: "Cancelled",        dot: "#f87171", text: "text-[#f87171]",  bg: "bg-[#f8717112]", border: "border-[#f87171]/25" },
];

const NEXT_STATUSES = {
  Pending:        ["Pending", "Processing"],
  Processing:     ["Processing", "Shipping"],
  Shipping:       ["Shipping", "OutForDelivery"],
  OutForDelivery: ["OutForDelivery", "Delivered"],
  Delivered:      ["Delivered"],
  Cancelled:      ["Cancelled"],
};

const PAYMENT_LABELS = {
  cod:  "Cash on Delivery",
  upi:  "UPI",
  card: "Card",
};

const getStatus  = (v) => STATUS_OPTIONS.find((s) => s.value === v) || STATUS_OPTIONS[0];
const getPaymentLabel = (m) => PAYMENT_LABELS[m?.toLowerCase()] || m || "—";

/* ── Skeleton ── */
const SkeletonRow = () => (
  <tr className="border-b border-[#c9a96e]/05 animate-pulse">
    {[80, 150, 90, 80, 100, 120].map((w, i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-2.5 bg-[#ffffff06] rounded-full" style={{ width: w }} />
      </td>
    ))}
  </tr>
);

/* ── Status Pill (display only) ── */
const StatusPill = ({ status }) => {
  const st = getStatus(status || "Pending");
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-medium border ${st.bg} ${st.border} ${st.text}`}
      style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.18em" }}
    >
      <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: st.dot, boxShadow: `0 0 4px ${st.dot}99` }} />
      {st.label}
    </span>
  );
};

/* ── Status Changer — inline pill group ── */
const StatusChanger = ({ order, onUpdate }) => {
  const allowed = NEXT_STATUSES[order.status] || ["Pending"];
  const next = allowed.find((v) => v !== order.status);
  if (!next) return <span className="text-[#f5f0e8]/15 text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Jost',sans-serif" }}>—</span>;

  const nextSt = getStatus(next);

  return (
    <button
      onClick={() => onUpdate(order.id, next)}
      className="group relative inline-flex items-center gap-2 px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase transition-all duration-200 border border-[#c9a96e]/15 text-[#c9a96e]/40 hover:border-[#c9a96e]/40 hover:text-[#c9a96e]/80 hover:bg-[#c9a96e]/04"
      style={{ fontFamily: "'Jost',sans-serif" }}
      title={`Move to ${nextSt.label}`}
    >
      <span className="w-[5px] h-[5px] rounded-full flex-shrink-0 transition-all duration-200" style={{ background: nextSt.dot, opacity: 0.5 }} />
      <span>{nextSt.label}</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:translate-x-0.5 transition-transform duration-150">
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  );
};

/* ── Package icon ── */
const PackageIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const UnblockIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
/* ── Main ── */
export default function OrderManagement() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState("All");

  useEffect(() => {
    (async () => {
      try {
        const res    = await api.get("/order/all/ad");
        const sorted = [...(res.data || [])].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sorted);
      } catch {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/order/${orderId}/status/ad?newStatus=${newStatus}`);
      setOrders((prev) =>
        prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o)
      );
      toast.success(`Updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

  const filtered = orders.filter((o) => {
    const matchStatus = filter === "All" || o.status === filter;
    const matchSearch = !search ||
      String(o.id).toLowerCase().includes(search.toLowerCase()) ||
      (o.userEmail || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s.value] = orders.filter((o) => o.status === s.value).length;
    return acc;
  }, {});

  const tabs = [
    { label: "All", value: "All", count: orders.length },
    ...STATUS_OPTIONS.map((s) => ({ label: s.label, value: s.value, count: counts[s.value] || 0, dot: s.dot })),
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .om-row { animation: fadeUp 0.3s ease both; }
        .om-row:hover td { background: rgba(201,169,110,0.018); }

        input[type="text"]::placeholder { color: rgba(245,240,232,0.15); }
        input[type="text"]:focus { outline: none; }

        .tab-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px; font-size: 10px; letter-spacing: 0.2em;
          text-transform: uppercase; cursor: pointer; border: none;
          background: transparent; transition: all 0.15s; white-space: nowrap;
          font-family: 'Jost', sans-serif;
          border-bottom: 1px solid transparent;
        }
        .tab-pill.active { color: #c9a96e; border-bottom-color: #c9a96e; }
        .tab-pill:not(.active) { color: rgba(245,240,232,0.25); }
        .tab-pill:not(.active):hover { color: rgba(245,240,232,0.5); }

        .tab-count {
          font-size: 9px; padding: 1px 5px;
          background: rgba(201,169,110,0.1);
          color: rgba(201,169,110,0.5);
          font-family: 'Jost', sans-serif;
        }
        .tab-pill.active .tab-count {
          background: rgba(201,169,110,0.18);
          color: #c9a96e;
        }

        ::-webkit-scrollbar { width: 2px; height: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.15); }

        .search-wrap input { background: transparent; }
      `}</style>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f0b06", color: "#f5f0e8",
            border: "1px solid rgba(201,169,110,0.15)", borderRadius: 0,
            fontSize: "11px", padding: "10px 16px",
            fontFamily: "'Jost',sans-serif", letterSpacing: "0.06em",
          },
          success: { iconTheme: { primary: "#c9a96e", secondary: "#0d0a05" } },
          error:   { iconTheme: { primary: "#f87171", secondary: "#0d0a05" } },
        }}
      />

      <div className="min-h-screen bg-[#080604]" style={{ fontFamily: "'Jost', sans-serif" }}>

        {/* Subtle ambient light */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-[-120px] left-[20%] w-[600px] h-[400px] rounded-full bg-[#c9a96e]/[0.015] blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-10">

          {/* ── Header ── */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#c9a96e]/40 text-[9px] tracking-[0.7em] uppercase mb-3">
                Admin · Orders
              </p>
              <h1
                className="text-[#f5f0e8]/90 font-light leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", letterSpacing: "0.02em" }}
              >
                Order <em className="text-[#c9a96e] not-italic" style={{ fontWeight: 300 }}>Records</em>
              </h1>
            </div>

            <div className="flex items-center gap-6 pb-1">
              {/* Search */}
              <div className="search-wrap relative flex items-center gap-3 border-b border-[#c9a96e]/15 hover:border-[#c9a96e]/30 transition-colors pb-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search ID or email"
                  className="text-[#f5f0e8]/70 text-[11px] w-52 tracking-wide"
                  style={{ fontFamily: "'Jost',sans-serif", letterSpacing: "0.05em" }}
                />
              </div>

              <Link
                to="/admin/dashboard"
                className="text-[#c9a96e]/30 hover:text-[#c9a96e]/70 text-[9px] tracking-[0.45em] uppercase transition-colors"
              >
                ← Dashboard
              </Link>
            </div>
          </div>

          {/* ── Stats strip ── */}
          <div className="flex items-center gap-8 mb-1 pb-6 border-b border-[#c9a96e]/08">
            {[
              { label: "Total",     count: orders.length,                          color: "#c9a96e" },
              { label: "Pending",   count: counts["Pending"] || 0,                 color: "#f5a623" },
              { label: "Active",    count: (counts["Processing"] || 0) + (counts["Shipping"] || 0) + (counts["OutForDelivery"] || 0), color: "#3b82f6" },
              { label: "Delivered", count: counts["Delivered"] || 0,               color: "#4ade80" },
              { label: "Cancelled", count: counts["Cancelled"] || 0,               color: "#f87171" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span
                  className="font-light leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: s.color, opacity: 0.85 }}
                >
                  {s.count}
                </span>
                <span className="text-[#f5f0e8]/20 text-[9px] tracking-[0.35em] uppercase">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Filter tabs ── */}
          <div className="flex items-center gap-0 overflow-x-auto mb-0 border-b border-[#c9a96e]/08">
            {tabs.map((t) => (
              <button
                key={t.value}
                onClick={() => setFilter(t.value)}
                className={`tab-pill ${filter === t.value ? "active" : ""}`}
              >
                {t.dot && (
                  <span className="w-[5px] h-[5px] rounded-full" style={{ background: t.dot, opacity: filter === t.value ? 0.9 : 0.35 }} />
                )}
                {t.label}
                <span className="tab-count">{t.count}</span>
              </button>
            ))}
          </div>

          {/* ── Table ── */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#c9a96e]/06">
                  {["Order", "Customer", "Date", "Items", "Total", "Payment", "Status", "Next Step"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-[8.5px] tracking-[0.45em] uppercase text-[#c9a96e]/25 font-normal whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-32 text-center">
                      <div className="flex flex-col items-center gap-5 text-[#c9a96e]/15">
                        <PackageIcon />
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 300, color: "rgba(245,240,232,0.12)", fontStyle: "italic" }}>
                          No orders found
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((order, idx) => {
                    const st  = getStatus(order.status || "Pending");
                    const payLabel = getPaymentLabel(order.paymentMethod);
                    const itemsSummary = (order.items || []).slice(0, 1).map(i => i.product?.name || "Item").join(", ")
                      + (order.items?.length > 1 ? ` +${order.items.length - 1}` : "");

                    return (
                      <tr
                        key={order.id}
                        className="om-row border-b border-[#c9a96e]/04 transition-colors duration-150"
                        style={{ animationDelay: `${idx * 30}ms` }}
                      >
                        {/* Order ID */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className="text-[#c9a96e]/70 font-light tracking-wider"
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
                          >
                            #{String(order.id).slice(-8).toUpperCase()}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="px-6 py-4 max-w-[180px]">
                          <p className="text-[#f5f0e8]/50 text-[11px] truncate tracking-wide">
                            {order.userEmail || "Guest"}
                          </p>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-[#f5f0e8]/25 text-[11px] tracking-wide">{formatDate(order.createdAt)}</p>
                        </td>

                        {/* Items — plain text */}
                        <td className="px-6 py-4 max-w-[160px]">
                          <p className="text-[#f5f0e8]/35 text-[11px] truncate tracking-wide">
                            {itemsSummary || "—"}
                          </p>
                        </td>

                        {/* Total */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className="text-[#c9a96e]/80 font-light"
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
                          >
                            ₹{parseFloat(order.total || 0).toFixed(0)}
                          </span>
                        </td>

                        {/* Payment — plain text */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-[#f5f0e8]/30 text-[11px] tracking-wide">{payLabel}</p>
                        </td>

                        {/* Status pill */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusPill status={order.status} />
                        </td>

                        {/* Next step */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusChanger order={order} onUpdate={updateOrderStatus} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ── Footer ── */}
          {!loading && (
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#c9a96e]/06">
              <p className="text-[#f5f0e8]/08 text-[9px] tracking-[0.5em] uppercase">
                Maison Bean · Order Management
              </p>
              <p className="text-[#f5f0e8]/12 text-[9px] tracking-[0.4em] uppercase">
                {filtered.length} {filtered.length === 1 ? "record" : "records"}
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}