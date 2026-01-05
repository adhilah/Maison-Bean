import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  delivered: "#22C55E",
  processing: "#3B82F6",
  pending: "#F59E0B",
  cancelled: "#EF4444",
};

export default function OrdersChart() {
  const [data, setData] = useState([]);

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  name,
  percent,
}) => {
  if (value === 0) return null;

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#111827"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


  useEffect(() => {
    axios.get("http://localhost:3000/orders").then((res) => {
      const orders = res.data;

      const statusCount = {
        delivered: 0,
        processing: 0,
        pending: 0,
        cancelled: 0,
      };

      orders.forEach((order) => {
        if (order.status && statusCount[order.status] !== undefined) {
          statusCount[order.status]++;
        }
      });

      const chartData = Object.keys(statusCount).map((key) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: statusCount[key],
        color: COLORS[key],
      }));

      setData(chartData);
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6 h-full flex flex-col">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Order Status Distribution
      </h3>

      {/* Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
  data={data}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="45%"
  innerRadius={50}
  outerRadius={100}
  label={renderLabel}
  labelLine={false}
>

              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="square"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
