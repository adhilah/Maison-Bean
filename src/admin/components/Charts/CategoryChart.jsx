import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CATEGORY_COLORS = {
  "Hot Coffee": "#EF4444",
  "Cold Coffee": "#3B82F6",
  "Croissant": "#F59E0B",
};

const DEFAULT_COLOR = "#9CA3AF";

export default function CategoryChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  // Inner label: shows currency value in white
  const renderInnerLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs sm:text-sm font-bold"
      >
        {formatCurrency(value)}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-200">
          <p className="font-bold text-gray-800">{name}</p>
          <p className="text-sm text-gray-700 mt-1">
            Revenue: <span className="font-semibold">{formatCurrency(value)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
  axios
    .get("http://localhost:3000/orders")
    .then((res) => {
      const categoryMap = {
        "Hot Coffee": 0,
        "Cold Coffee": 0,
        "Croissant": 0,
      };

      res.data.forEach((order) => {
        order.items?.forEach((item) => {
          const category = item.product?.category;
          const price = item.unitPrice || item.product?.basePrice || 0;
          const qty = item.quantity || 1;

          if (categoryMap.hasOwnProperty(category)) {
            categoryMap[category] += price * qty;
          }
        });
      });

      const chartData = Object.entries(categoryMap)
        .map(([name, value]) => ({
          name,
          value: Number(value.toFixed(2)),
        }))
        .filter((item) => item.value > 0); // remove empty slices

      setData(chartData);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);


  if (loading || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 h-64 flex items-center justify-center">
        <p className="text-gray-500">{loading ? "Loading..." : "No data available"}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-64 sm:h-72 md:h-full flex flex-col">
      {/* Title */}
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
        Category Performance
      </h3>

      {/* Full Circular Pie Chart */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"   // Full circle (no innerRadius = no hole)
              paddingAngle={3}
              labelLine={false}
              label={renderInnerLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CATEGORY_COLORS[entry.name] || DEFAULT_COLOR}
                  stroke="#fff"
                  strokeWidth={3}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(value, entry) => (
                <span className="text-xs sm:text-sm text-gray-700">
                  {value} — {formatCurrency(entry.payload.value)}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";

// const CATEGORY_COLORS = {
//   "Hot Coffee": "#EF4444",
//   "Cold Coffee": "#3B82F6",
//   "Croissant": "#F59E0B",
//   "Iced Tea": "#10B981",
//   "Pastries": "#8B5CF6",
//   "Sandwiches": "#EC4899",
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
//   axios
//     .get("http://localhost:3000/orders")
//     .then((res) => {
//       const categoryMap = {
//         "Hot Coffee": 0,
//         "Cold Coffee": 0,
//         "Croissant": 0,
//       };

//       res.data.forEach((order) => {
//         order.items?.forEach((item) => {
//           const category = item.product?.category;
//           const price = item.unitPrice || item.product?.basePrice || 0;
//           const qty = item.quantity || 1;

//           if (categoryMap.hasOwnProperty(category)) {
//             categoryMap[category] += price * qty;
//           }
//         });
//       });

//       const chartData = Object.entries(categoryMap)
//         .map(([name, value]) => ({
//           name,
//           value: Number(value.toFixed(2)),
//         }))
//         .filter((item) => item.value > 0); // remove empty slices

//       setData(chartData);
//       setLoading(false);
//     })
//     .catch(() => setLoading(false));
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