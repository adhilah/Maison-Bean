import { useEffect, useState } from "react";
import api from "../../../services/api";

const SkeletonRow = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: "1px solid rgba(201,169,110,0.04)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 20, height: 9, background: "rgba(255,255,255,0.05)", borderRadius: 2 }} />
      <div style={{ width: 140, height: 9, background: "rgba(255,255,255,0.05)", borderRadius: 2 }} />
    </div>
    <div style={{ width: 55, height: 9, background: "rgba(255,255,255,0.05)", borderRadius: 2 }} />
  </div>
);

export default function TopProductsCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/order/all/ad").then((res) => {
      const map = {};
      (res.data || []).forEach((order) => {

  const status =
    (
      order.status ??
      order.Status ??
      ""
    ).toLowerCase();

  if (status === "cancelled")
    return;

  // SUPPORT BOTH items / Items / orderItems

  const items =
    order.items ??
    order.Items ??
    order.orderItems ??
    order.OrderItems ??
    [];

  items.forEach((item) => {

    // SUPPORT BOTH camelCase + PascalCase

    const name =
      item.productName ??
      item.ProductName ??
      item.product?.name ??
      item.Product?.Name ??
      "Unknown";

    const price =
      parseFloat(
        item.unitPrice ??
        item.UnitPrice ??
        0
      ) || 0;

    const qty =
      parseInt(
        item.quantity ??
        item.Quantity ??
        0
      ) || 0;

    if (!map[name]) {

      map[name] = {

        name,

        units: 0,

        revenue: 0,
      };
    }

    map[name].units += qty;

    map[name].revenue += qty * price;
  });
});
      const sorted = Object.values(map).sort((a, b) => b.units - a.units).slice(0, 10);
      const maxUnits = sorted[0]?.units || 1;
      setProducts(sorted.map((p) => ({ ...p, bar: (p.units / maxUnits) * 100 })));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        @keyframes barGrow { from { width: 0 } to { width: var(--w) } }
        .tp-bar { animation: barGrow 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .tp-row:hover .tp-name { color: rgba(245,240,232,0.75) !important; }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "24px 24px 16px", boxSizing: "border-box" }}>

        {/* Header */}
        <div style={{ marginBottom: 20, flexShrink: 0 }}>
          <p style={{ color: "rgba(201,169,110,0.5)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", margin: "0 0 6px" }}>Bestsellers</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.75rem", color: "rgba(245,240,232,0.9)", margin: 0, lineHeight: 1 }}>
            Top <em style={{ color: "#c9a96e" }}>Products</em>
          </h2>
        </div>

        {/* Column labels */}
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, borderBottom: "1px solid rgba(201,169,110,0.07)", marginBottom: 4, flexShrink: 0 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.3)" }}>Product</span>
          <div style={{ display: "flex", gap: 28 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.3)" }}>Units</span>
            <span style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.3)" }}>Revenue</span>
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
          ) : products.length === 0 ? (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ color: "rgba(245,240,232,0.15)", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>No sales yet</p>
            </div>
          ) : (
            products.map((p, idx) => (
              <div key={p.name} className="tp-row" style={{ padding: "12px 0", borderBottom: "1px solid rgba(201,169,110,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "rgba(201,169,110,0.3)", minWidth: 18 }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="tp-name" style={{ fontSize: 12, color: "rgba(245,240,232,0.5)", letterSpacing: "0.04em", maxWidth: 170, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "color 0.15s", fontFamily: "'Jost', sans-serif" }}>
                      {p.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                    <span style={{ fontSize: 12, color: "rgba(245,240,232,0.4)", textAlign: "right", minWidth: 28, fontFamily: "'Jost', sans-serif" }}>{p.units}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 300, color: "rgba(201,169,110,0.8)", minWidth: 58, textAlign: "right" }}>
                      ${p.revenue.toFixed(0)}
                    </span>
                  </div>
                </div>
                {/* Bar */}
                <div style={{ height: 1, background: "rgba(201,169,110,0.07)", marginLeft: 30 }}>
                  <div
                    className="tp-bar"
                    style={{ height: "100%", background: "rgba(201,169,110,0.35)", "--w": `${p.bar}%`, width: `${p.bar}%`, animationDelay: `${idx * 50}ms` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer count */}
        {!loading && products.length > 0 && (
          <div style={{ paddingTop: 12, borderTop: "1px solid rgba(201,169,110,0.07)", textAlign: "right", flexShrink: 0, marginTop: 4 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(245,240,232,0.1)" }}>Top {products.length} products</span>
          </div>
        )}
      </div>
    </>
  );
}