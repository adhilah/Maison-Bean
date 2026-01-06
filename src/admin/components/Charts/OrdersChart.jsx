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

const COLORS = {
  delivered: "#22C55E",
  processing: "#3B82F6",
  pending: "#F59E0B",
  cancelled: "#EF4444",
};

export default function OrdersChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Custom label - only show on larger screens to avoid clutter on mobile
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    name,
  }) => {
    if (value === 0) return null;

    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#1F2937"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium hidden sm:block"  // Hide labels on mobile
      >
        {`${name} (${value})`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, percent } = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-200">
          <p className="font-bold text-gray-800">{name}</p>
          <p className="text-sm text-gray-600 mt-1">Orders: <span className="font-semibold">{value}</span></p>
          <p className="text-sm text-gray-600">
            Share: <span className="font-semibold">{(percent * 100).toFixed(1)}%</span>
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
        const orders = res.data || [];
        const statusCount = { delivered: 0, processing: 0, pending: 0, cancelled: 0 };

        orders.forEach((order) => {
          const status = order.status?.toLowerCase();
          if (status && statusCount.hasOwnProperty(status)) {
            statusCount[status]++;
          }
        });

        const total = Object.values(statusCount).reduce((a, b) => a + b, 0);
        const chartData = Object.entries(statusCount)
          .map(([key, value]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value,
            percent: total > 0 ? value / total : 0,
            color: COLORS[key],
          }))
          .filter((item) => item.value > 0)
          .sort((a, b) => b.value - a.value);

        setData(chartData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const totalOrders = data.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 h-64 flex flex-col items-center justify-center text-center">
        <p className="text-lg font-medium text-gray-700">No Orders Found</p>
        <p className="text-sm text-gray-500 mt-2">There are no orders to display right now.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-64 sm:h-full flex flex-col">
      {/* Header */}
      <div className="mb-4 flex-shrink-0">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Order Status</h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">Distribution overview</p>
      </div>

      {/* Chart - Fixed minimum height on mobile */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="70%"
              paddingAngle={4}
              labelLine={false}
              label={renderCustomLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={3} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
              formatter={(value, entry) => (
                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                  {value} ({entry.payload.value})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Summary - Only show on mobile if space allows */}
      <div className="mt-4 pt-3 border-t border-gray-200 flex-shrink-0 hidden sm:block">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Orders</span>
          <span className="text-lg font-bold text-gray-900">{totalOrders.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}