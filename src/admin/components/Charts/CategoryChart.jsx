import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CATEGORY_COLORS = {
  "Hot Coffee": "#EF4444",
  "Cold Coffee": "#3B82F6",
  "Croissant": "#F59E0B",
};

export default function CategoryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/orders").then((res) => {
      const categoryMap = {};

      res.data.forEach((order) => {
        order.items.forEach((item) => {
          const category = item.product?.category;
          const price = item.unitPrice || item.product?.basePrice || 0;
          const qty = item.quantity || 1;

          if (!category) return;

          categoryMap[category] =
            (categoryMap[category] || 0) + price * qty;
        });
      });

      setData(
        Object.entries(categoryMap).map(([name, value]) => ({
          name,
          value: Number(value.toFixed(2)),
        }))
      );
    });
  }, []);

  const renderLabel = ({ cx, cy, midAngle, outerRadius, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.6;
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
        fontWeight={500}
      >
        {value}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 h-full">
      <h3 className="text-lg font-semibold mb-4">
        Category Performance
      </h3>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
  data={data}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="45%"          
  outerRadius={95} 
  label={renderLabel}
  labelLine={false}
>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={CATEGORY_COLORS[entry.name] || "#9CA3AF"}
              />
            ))}
          </Pie>

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
