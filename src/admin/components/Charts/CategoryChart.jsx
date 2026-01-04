import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CategoryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((orders) => {
        const categorySales = {};

        orders.forEach((order) => {
          order.items.forEach((item) => {
            const category = item.product.category;
            const price = item.product.basePrice * item.quantity;

            if (!categorySales[category]) {
              categorySales[category] = 0;
            }

            categorySales[category] += price;
          });
        });

        const formattedData = Object.keys(categorySales).map((cat) => ({
          name: cat,
          sales: categorySales[cat],
        }));

        setData(formattedData);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold text-lg mb-4">Category Performance</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="sales"
            fill="#a77c3b"
            radius={[6, 6, 0, 0]}
            name="Sales ($)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
