import { useEffect, useState } from "react";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    users: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/orders").then((res) => res.json()),
      fetch("http://localhost:3000/products").then((res) => res.json()),
      fetch("http://localhost:3000/users").then((res) => res.json()),
    ]).then(([orders, products, users]) => {
      const totalRevenue = orders.reduce(
        (sum, order) => sum + order.total,
        0
      );

      setStats({
        revenue: totalRevenue.toFixed(2),
        orders: orders.length,
        products: products.length,
        users: users.length,
      });
    });
  }, []);

  return stats;
}
