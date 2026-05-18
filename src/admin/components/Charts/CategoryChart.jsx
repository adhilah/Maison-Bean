// import { useEffect, useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";
// import { getAllOrders } from "../../../services/orderApi";
// // import api from "../../../services/api";

// const CATEGORY_COLORS = {
//   "Hot Coffee": "#EF4444",
//   "Cold Coffee": "#3B82F6",
//   "Croissant": "#F59E0B",
// };

// const DEFAULT_COLOR = "#9CA3AF";

// export default function CategoryChart() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const formatCurrency = (value) =>
//     new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(value);

//   // Inner label: shows currency value in white
//   const renderInnerLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
//     const RADIAN = Math.PI / 180;
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text
//         x={x}
//         y={y}
//         fill="white"
//         textAnchor="middle"
//         dominantBaseline="central"
//         className="text-xs sm:text-sm font-bold"
//       >
//         {formatCurrency(value)}
//       </text>
//     );
//   };

//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const { name, value } = payload[0].payload;
//       return (
//         <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-200">
//           <p className="font-bold text-gray-800">{name}</p>
//           <p className="text-sm text-gray-700 mt-1">
//             Revenue: <span className="font-semibold">{formatCurrency(value)}</span>
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   useEffect(() => {

//   getAllOrders()
//     .then((orders) => {

//       const categoryMap = {};

//       orders.forEach((order) => {

//        order.items?.forEach((item) => {

//   const category =
//     item.productCategory;

//   const price =
//     item.unitPrice || 0;

//   const qty =
//     item.quantity || 1;

//   if (!category) return;

//   if (!categoryMap[category]) {
//     categoryMap[category] = 0;
//   }

//   categoryMap[category] +=
//     price * qty;
// });
//       });

//       const chartData =
//         Object.entries(categoryMap)
//           .map(([name, value]) => ({
//             name,
//             value: Number(value.toFixed(2)),
//           }))
//           .filter((item) => item.value > 0);

//       setData(chartData);

//       setLoading(false);
//     })
//     .catch((err) => {

//       console.log(err);

//       setLoading(false);
//     });

// }, []);


//   if (loading || data.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 h-64 flex items-center justify-center">
//         <p className="text-gray-500">{loading ? "Loading..." : "No data available"}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 h-64 sm:h-72 md:h-full flex flex-col">
//       {/* Title */}
//       <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
//         Category Performance
//       </h3>

//       {/* Full Circular Pie Chart */}
//       <div className="flex-1 min-h-0">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius="80%"   // Full circle (no innerRadius = no hole)
//               paddingAngle={3}
//               labelLine={false}
//               label={renderInnerLabel}
//             >
//               {data.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={CATEGORY_COLORS[entry.name] || DEFAULT_COLOR}
//                   stroke="#fff"
//                   strokeWidth={3}
//                 />
//               ))}
//             </Pie>
//             <Tooltip content={<CustomTooltip />} />
//             <Legend
//               verticalAlign="bottom"
//               align="center"
//               iconType="circle"
//               formatter={(value, entry) => (
//                 <span className="text-xs sm:text-sm text-gray-700">
//                   {value} — {formatCurrency(entry.payload.value)}
//                 </span>
//               )}
//             />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }




//===========================================


import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { getAllOrders } from "../../../services/orderApi";

const CATEGORY_COLORS = {
  "Hot Coffee":  "#c9a96e",
  "Cold Coffee": "#3b82f6",
  "Croissant":   "#a78bfa",
  "Coffee":      "#4ade80",
};
const FALLBACK_COLORS = ["#f5a623", "#fb923c", "#f87171", "#4ade80", "#a78bfa"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div style={{ background: "#110d07", border: "1px solid rgba(201,169,110,0.25)", padding: "10px 14px", fontFamily: "'Jost', sans-serif" }}>
      <p style={{ color: "rgba(201,169,110,0.6)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", margin: "0 0 4px" }}>{name}</p>
      <p style={{ color: "#c9a96e", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 300, margin: 0 }}>
        ${Number(value).toLocaleString("en-IN")}
      </p>
    </div>
  );
};

export default function CategoryChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrders().then((orders) => {
      const map = {};
      orders.forEach((o) => {
        o.items?.forEach((item) => {
          const cat = item.productCategory;
          if (!cat) return;
          map[cat] = (map[cat] || 0) + (item.unitPrice || 0) * (item.quantity || 1);
        });
      });
      setData(Object.entries(map).map(([name, value]) => ({ name, value: Number(value.toFixed(2)) })).filter((d) => d.value > 0).sort((a, b) => b.value - a.value));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const total = data.reduce((s, d) => s + d.value, 0);
  const getColor = (name, idx) => CATEGORY_COLORS[name] || FALLBACK_COLORS[idx % FALLBACK_COLORS.length];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "24px 24px 16px", boxSizing: "border-box" }}>
      <div style={{ marginBottom: 20, flexShrink: 0 }}>
        <p style={{ color: "rgba(201,169,110,0.5)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", margin: "0 0 6px" }}>Performance</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.75rem", color: "rgba(245,240,232,0.9)", margin: 0, lineHeight: 1 }}>
          Category <em style={{ color: "#c9a96e" }}>Split</em>
        </h2>
      </div>

      {loading ? (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "rgba(245,240,232,0.2)", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>Loading…</p>
        </div>
      ) : data.length === 0 ? (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "rgba(245,240,232,0.15)", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>No data</p>
        </div>
      ) : (
        <>
          {/* Donut */}
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius="50%" outerRadius="75%" paddingAngle={3} strokeWidth={0}>
                  {data.map((entry, i) => (
                    <Cell key={i} fill={getColor(entry.name, i)} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "#c9a96e", margin: 0, lineHeight: 1 }}>
                ${(total / 1000).toFixed(1)}k
              </p>
              <p style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", margin: "5px 0 0" }}>Total</p>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(201,169,110,0.07)", flexShrink: 0 }}>
            {data.map((d, i) => {
              const color = getColor(d.name, i);
              const pct = total > 0 ? ((d.value / total) * 100).toFixed(1) : 0;
              return (
                <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 5px ${color}80`, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.55)" }}>{d.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 10, color: "rgba(245,240,232,0.3)", minWidth: 36, textAlign: "right" }}>{pct}%</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 300, color: "rgba(201,169,110,0.8)", minWidth: 70, textAlign: "right" }}>
                      ${Number(d.value).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}