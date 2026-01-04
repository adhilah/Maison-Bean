import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function RevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((orders) => {
        const monthlyData = {};

        orders.forEach((order) => {
          const month = new Date(order.tracking.confirmed).toLocaleString(
            "default",
            { month: "short" }
          );

          if (!monthlyData[month]) {
            monthlyData[month] = { month, revenue: 0, orders: 0 };
          }

          monthlyData[month].revenue += order.total;
          monthlyData[month].orders += 1;
        });

        setData(Object.values(monthlyData));
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold text-lg mb-4">Revenue Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="orders"
            stroke="#2563eb"
            strokeWidth={2}
            name="Orders"
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#a77c3b"
            strokeWidth={3}
            name="Revenue ($)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
