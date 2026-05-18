import { useEffect, useState } from "react";
import { getAllOrders } from "../../../services/orderApi";

const STATUS_CONFIG = {
  delivered:      { dot: "#4ade80", label: "Delivered" },
  processing:     { dot: "#3b82f6", label: "Processing" },
  pending:        { dot: "#f5a623", label: "Pending" },
  cancelled:      { dot: "#f87171", label: "Cancelled" },
  shipping:       { dot: "#a78bfa", label: "Shipping" },
  outfordelivery: { dot: "#fb923c", label: "Out for Delivery" },
};

const getStatusCfg = (s) => STATUS_CONFIG[s?.toLowerCase().replace(/\s+/g, "")] || { dot: "#c9a96e", label: s || "Unknown" };

const SkeletonRow = () => (
  <tr style={{ borderBottom: "1px solid rgba(201,169,110,0.04)", animation: "pulse 1.5s infinite" }}>
    {[80, 150, 90, 70, 90].map((w, i) => (
      <td key={i} style={{ padding: "14px 20px" }}>
        <div style={{ height: 10, background: "rgba(255,255,255,0.04)", borderRadius: 2, width: w }} />
      </td>
    ))}
  </tr>
);

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrders().then((all) => {
      const processed = all
        .map((o) => ({
          id: o.id,
          email: o.userEmail || "guest@—",
          date: new Date(o.createdAt || Date.now()),
          amount: parseFloat(o.total || o.items?.reduce((s, i) => s + (i.unitPrice || 0) * (i.quantity || 1), 0) || 0),
          status: (o.status || "pending").toLowerCase(),
        }))
        .sort((a, b) => b.date - a.date)
        .slice(0, 6);
      setOrders(processed);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const formatDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@200;300;400&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .ro-row { animation: fadeUp 0.3s ease both; }
        .ro-row:hover td { background: rgba(201,169,110,0.015) !important; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
      <div style={{ background: "#080604", border: "1px solid rgba(201,169,110,0.08)", fontFamily: "'Jost', sans-serif" }}>
        {/* Header */}
        <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid rgba(201,169,110,0.06)" }}>
          <p style={{ color: "rgba(201,169,110,0.4)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 6, margin: "0 0 6px" }}>Latest</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.8rem", color: "rgba(245,240,232,0.85)", margin: 0, lineHeight: 1 }}>
            Recent <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Orders</em>
          </h2>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(201,169,110,0.06)" }}>
                {["Order", "Customer", "Date", "Amount", "Status"].map((h) => (
                  <th key={h} style={{
                    padding: "10px 20px", textAlign: "left",
                    fontSize: 8.5, letterSpacing: "0.45em", textTransform: "uppercase",
                    color: "rgba(201,169,110,0.25)", fontWeight: 400,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "48px 20px", textAlign: "center", color: "rgba(245,240,232,0.12)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                    No orders
                  </td>
                </tr>
              ) : (
                orders.map((order, idx) => {
                  const cfg = getStatusCfg(order.status);
                  return (
                    <tr key={order.id} className="ro-row" style={{ borderBottom: "1px solid rgba(201,169,110,0.04)", animationDelay: `${idx * 40}ms` }}>
                      <td style={{ padding: "14px 20px", whiteSpace: "nowrap" }}>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontWeight: 300, color: "rgba(201,169,110,0.7)", letterSpacing: "0.05em" }}>
                          #{String(order.id).slice(-8).toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px", maxWidth: 160 }}>
                        <p style={{ fontSize: 11, color: "rgba(245,240,232,0.4)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
                          {order.email}
                        </p>
                      </td>
                      <td style={{ padding: "14px 20px", whiteSpace: "nowrap" }}>
                        <p style={{ fontSize: 11, color: "rgba(245,240,232,0.22)", margin: 0, letterSpacing: "0.04em" }}>{formatDate(order.date)}</p>
                      </td>
                      <td style={{ padding: "14px 20px", whiteSpace: "nowrap" }}>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 300, color: "rgba(201,169,110,0.75)" }}>
                          ${order.amount.toFixed(0)}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px", whiteSpace: "nowrap" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: cfg.dot }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.dot, flexShrink: 0, boxShadow: `0 0 4px ${cfg.dot}90` }} />
                          {cfg.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {!loading && orders.length > 0 && (
          <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(201,169,110,0.06)", textAlign: "right" }}>
            <span style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(245,240,232,0.1)" }}>
              Showing {orders.length} records
            </span>
          </div>
        )}
      </div>
    </>
  );
}