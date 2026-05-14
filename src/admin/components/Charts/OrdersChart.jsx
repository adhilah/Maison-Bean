// import { useEffect, useState } from "react";
// import api from "../../../services/api";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";

// const COLORS = {
//   delivered: "#22C55E",
//   processing: "#3B82F6",
//   pending: "#F59E0B",
//   out_for_delivery: "#8B5CF6", // Added for your "out_for_delivery" status
//   cancelled: "#EF4444",
// };

// export default function OrdersChart() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   // Custom label - only show on larger screens to avoid clutter on mobile
//   const renderCustomLabel = ({
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     value,
//     name,
//   }) => {
//     if (value === 0) return null;

//     const RADIAN = Math.PI / 180;
//     const radius = outerRadius * 1.2;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text
//         x={x}
//         y={y}
//         fill="#1F2937"
//         textAnchor={x > cx ? "start" : "end"}
//         dominantBaseline="central"
//         className="text-xs font-medium hidden sm:block"  // Hide labels on mobile
//       >
//         {`${name} (${value})`}
//       </text>
//     );
//   };

//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const { name, value, percent } = payload[0].payload;
//       return (
//         <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-200">
//           <p className="font-bold text-gray-800">{name}</p>
//           <p className="text-sm text-gray-600 mt-1">Orders: <span className="font-semibold">{value}</span></p>
//           <p className="text-sm text-gray-600">
//             Share: <span className="font-semibold">{(percent * 100).toFixed(1)}%</span>
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   useEffect(() => {
//     api.get("/order/all/ad")
//       .then((res) => {
//         const orders = res.data || [];
//         console.log("Fetched orders:", orders); // Debug: Check console

        
//         const statusCount = { 
//           delivered: 0, 
//           processing: 0, 
//           pending: 0, 
//           out_for_delivery: 0,  // Added your actual status
//           cancelled: 0 
//         };

//         orders.forEach((order) => {
//           const status =
//   order.status?.toLowerCase();
//           console.log("Processing status:", status); // Debug each status
//           if (status && statusCount.hasOwnProperty(status)) {
//             statusCount[status]++;
//           }
//         });

//         console.log("Status count:", statusCount); // Debug counts

//         const total = Object.values(statusCount).reduce((a, b) => a + b, 0);
//         const chartData = Object.entries(statusCount)
//           .map(([key, value]) => ({
//             name: key
//   .split("_")
//   .map(
//     (word) =>
//       word.charAt(0).toUpperCase() +
//       word.slice(1)
//   )
//   .join(" "),
//             value,
//             percent: total > 0 ? value / total : 0,
//             color: COLORS[key],
//           }))
//           .filter((item) => item.value > 0) // Only show non-zero
//           .sort((a, b) => b.value - a.value);

//         console.log("Final chart data:", chartData); // Debug final data

//         setData(chartData);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch orders:", err);
//         setError(true);
//         setLoading(false);
//       });
//   }, []);

//   const totalOrders = data.reduce((sum, item) => sum + item.value, 0);

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 h-64 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mb-4"></div>
//           <p className="text-gray-500">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || data.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 h-64 flex flex-col items-center justify-center text-center">
//         <p className="text-lg font-medium text-gray-700">No Orders Found</p>
//         <p className="text-sm text-gray-500 mt-2">There are no orders to display right now.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 h-64 sm:h-full flex flex-col">
//       {/* Header */}
//       <div className="mb-4 flex-shrink-0">
//         <h3 className="text-lg sm:text-xl font-bold text-gray-900">Order Status</h3>
//         <p className="text-xs sm:text-sm text-gray-500 mt-1">Distribution overview</p>
//       </div>

//       {/* Chart - Fixed minimum height on mobile */}
//       <div className="flex-1 min-h-0">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               innerRadius="45%"
//               outerRadius="70%"
//               paddingAngle={4}
//               labelLine={false}
//               label={renderCustomLabel}
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={3} />
//               ))}
//             </Pie>
//             <Tooltip content={<CustomTooltip />} />
//             <Legend
//               layout="horizontal"
//               verticalAlign="bottom"
//               align="center"
//               iconType="circle"
//               wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
//               formatter={(value, entry) => (
//                 <span className="text-xs sm:text-sm text-gray-700 font-medium">
//                   {value} ({entry.payload.value})
//                 </span>
//               )}
//             />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Footer Summary - Only show on mobile if space allows */}
//       <div className="mt-4 pt-3 border-t border-gray-200 flex-shrink-0 hidden sm:block">
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-600">Total Orders</span>
//           <span className="text-lg font-bold text-gray-900">{totalOrders.toLocaleString()}</span>
//         </div>
//       </div>
//     </div>
//   );
// }



//=========================================



import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import api from "../../../services/api";

const STATUS_CONFIG = {
  delivered:      { label: "Delivered",        color: "#4ade80" },
  processing:     { label: "Processing",       color: "#3b82f6" },
  pending:        { label: "Pending",          color: "#f5a623" },
  outfordelivery: { label: "Out for Delivery", color: "#fb923c" },
  shipping:       { label: "Shipping",         color: "#a78bfa" },
  cancelled:      { label: "Cancelled",        color: "#f87171" },
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value, color } = payload[0].payload;
  return (
    <div style={{ background: "#110d07", border: "1px solid rgba(201,169,110,0.25)", padding: "10px 14px", fontFamily: "'Jost', sans-serif" }}>
      <p style={{ color: "rgba(201,169,110,0.6)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", margin: "0 0 4px" }}>{name}</p>
      <p style={{ color, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 300, margin: 0 }}>{value} orders</p>
    </div>
  );
};

export default function OrdersChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/order/all/ad").then((res) => {
      const counts = {};
      (res.data || []).forEach((order) => {
        const key = order.status?.toLowerCase().replace(/\s+/g, "") || "pending";
        counts[key] = (counts[key] || 0) + 1;
      });
      setData(
        Object.entries(counts)
          .map(([key, value]) => {
            const cfg = STATUS_CONFIG[key] || { label: key, color: "rgba(245,240,232,0.2)" };
            return { name: cfg.label, value, color: cfg.color, key };
          })
          .filter((d) => d.value > 0)
          .sort((a, b) => b.value - a.value)
      );
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "24px 24px 16px", boxSizing: "border-box" }}>
      <div style={{ marginBottom: 20, flexShrink: 0 }}>
        <p style={{ color: "rgba(201,169,110,0.5)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", margin: "0 0 6px" }}>Overview</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.75rem", color: "rgba(245,240,232,0.9)", margin: 0, lineHeight: 1 }}>
          Order <em style={{ color: "#c9a96e" }}>Status</em>
        </h2>
      </div>

      {loading ? (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "rgba(245,240,232,0.2)", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>Loading…</p>
        </div>
      ) : data.length === 0 ? (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "rgba(245,240,232,0.15)", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>No orders</p>
        </div>
      ) : (
        <>
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius="50%" outerRadius="75%" paddingAngle={3} strokeWidth={0}>
                  {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, color: "rgba(245,240,232,0.75)", margin: 0, lineHeight: 1 }}>{total}</p>
              <p style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", margin: "5px 0 0" }}>Total</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(201,169,110,0.07)", flexShrink: 0 }}>
            {data.map((d) => (
              <div key={d.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: d.color, boxShadow: `0 0 5px ${d.color}80`, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.55)" }}>{d.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: 10, color: "rgba(245,240,232,0.3)", minWidth: 36, textAlign: "right" }}>
                    {total > 0 ? ((d.value / total) * 100).toFixed(1) : 0}%
                  </span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 300, color: "rgba(245,240,232,0.65)", minWidth: 24, textAlign: "right" }}>
                    {d.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}