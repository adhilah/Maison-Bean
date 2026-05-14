// import { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import api from "../../../services/api";

// export default function RevenueChart() {
//   const [data, setData] = useState([]);

//   console.log(data);

//   useEffect(() => {

//   api.get("/order/all/ad")

//     .then((res) => {

//       const orders = res.data;

//       const monthlyData = {};

//       orders.forEach((order) => {

//         if (!order.createdAt) return;

//         const date =
//           new Date(order.createdAt);

//         if (isNaN(date)) return;

//         const month =
//           date.toLocaleString(
//             "default",
//             {
//               month: "short",
//               year: "numeric",
//             }
//           );

//         if (!monthlyData[month]) {

//           monthlyData[month] = {
//             month,
//             revenue: 0,
//             orders: 0,
//           };
//         }

//         monthlyData[month].revenue +=
//           Number(order.total || 0);

//         monthlyData[month].orders += 1;
//       });

//       setData(
//         Object.values(monthlyData)
//       );
//     })

//     .catch((err) => {

//       console.error(
//         "Revenue chart error:",
//         err
//       );
//     });

// }, []);


//   return (
//     <div className="bg-white p-6 rounded-xl shadow">
//       <h2 className="font-semibold text-lg mb-4">Revenue Trend</h2>

//       {data.length === 0 ? (
//         <p className="text-gray-500 text-center">No data available</p>
//       ) : (
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />

//             <Line
//               type="monotone"
//               dataKey="orders"
//               stroke="#2563eb"
//               strokeWidth={2}
//               name="Orders"
//             />

//             <Line
//               type="monotone"
//               dataKey="revenue"
//               stroke="#a77c3b"
//               strokeWidth={3}
//               name="Revenue ($)"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// }



//========================================



import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from "recharts";
import api from "../../../services/api";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#110d07", border: "1px solid rgba(201,169,110,0.25)", padding: "12px 16px", fontFamily: "'Jost', sans-serif" }}>
      <p style={{ color: "rgba(201,169,110,0.7)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 8 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.dataKey === "revenue" ? "#c9a96e" : "rgba(245,240,232,0.55)", fontSize: 13, margin: "3px 0", fontWeight: 400 }}>
          {p.dataKey === "revenue" ? `₹${Number(p.value).toLocaleString("en-IN")}` : `${p.value} orders`}
        </p>
      ))}
    </div>
  );
};

const MONTH_ORDER = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function RevenueChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/order/all/ad").then((res) => {
      const monthly = {};
      (res.data || []).forEach((order) => {
        if (!order.createdAt) return;
        const d = new Date(order.createdAt);
        if (isNaN(d)) return;
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        const label = d.toLocaleString("default", { month: "short", year: "2-digit" });
        if (!monthly[key]) monthly[key] = { month: label, revenue: 0, orders: 0, _sort: d.getFullYear() * 100 + d.getMonth() };
        monthly[key].revenue += Number(order.total || 0);
        monthly[key].orders += 1;
      });
      setData(Object.values(monthly).sort((a, b) => a._sort - b._sort));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@300;400;500&display=swap');`}</style>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "24px 24px 16px", boxSizing: "border-box" }}>
        {/* Header */}
        <div style={{ marginBottom: 20, flexShrink: 0 }}>
          <p style={{ color: "rgba(201,169,110,0.5)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", margin: "0 0 6px" }}>Analytics</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.75rem", color: "rgba(245,240,232,0.9)", margin: 0, lineHeight: 1 }}>
            Revenue <em style={{ color: "#c9a96e" }}>Trend</em>
          </h2>
        </div>

        {/* Summary numbers */}
        {!loading && data.length > 0 && (
          <div style={{ display: "flex", gap: 28, marginBottom: 20, flexShrink: 0 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", margin: "0 0 4px" }}>Total Revenue</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "#c9a96e", margin: 0, lineHeight: 1 }}>
                ₹{data.reduce((s, d) => s + d.revenue, 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", margin: "0 0 4px" }}>Total Orders</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "rgba(245,240,232,0.6)", margin: 0, lineHeight: 1 }}>
                {data.reduce((s, d) => s + d.orders, 0)}
              </p>
            </div>
          </div>
        )}

        {/* Chart */}
        <div style={{ flex: 1, minHeight: 0 }}>
          {loading ? (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ color: "rgba(245,240,232,0.2)", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>Loading…</p>
            </div>
          ) : data.length === 0 ? (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ color: "rgba(245,240,232,0.15)", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>No data available</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9a96e" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#c9a96e" stopOpacity={0.01} />
                  </linearGradient>
                  <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="1 5" stroke="rgba(201,169,110,0.07)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "rgba(245,240,232,0.4)", fontSize: 11, fontFamily: "'Jost', sans-serif" }}
                  axisLine={false} tickLine={false} dy={8}
                />
                <YAxis
                  tick={{ fill: "rgba(245,240,232,0.35)", fontSize: 10, fontFamily: "'Jost', sans-serif" }}
                  axisLine={false} tickLine={false} width={52}
                  tickFormatter={(v) => v >= 1000 ? `₹${(v / 1000).toFixed(0)}k` : `₹${v}`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(201,169,110,0.2)", strokeWidth: 1, strokeDasharray: "3 3" }} />
                <Area type="monotone" dataKey="revenue" stroke="#c9a96e" strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 4, fill: "#c9a96e", stroke: "#080604", strokeWidth: 2 }} />
                <Area type="monotone" dataKey="orders" stroke="rgba(59,130,246,0.6)" strokeWidth={1.5} fill="url(#ordGrad)" dot={false} activeDot={{ r: 3, fill: "#3b82f6", stroke: "none" }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 20, marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(201,169,110,0.07)", flexShrink: 0 }}>
          {[{ color: "#c9a96e", label: "Revenue" }, { color: "rgba(59,130,246,0.7)", label: "Orders" }].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 20, height: 2, background: l.color, flexShrink: 0 }} />
              <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}