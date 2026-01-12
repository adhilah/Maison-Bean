import React, { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Package, Users } from "lucide-react";

export default function UserDashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const ordersRes = await fetch("http://localhost:3000/orders");
      const productsRes = await fetch("http://localhost:3000/products");
      const usersRes = await fetch("http://localhost:3000/users");

      const orders = await ordersRes.json();
      const products = await productsRes.json();
      const users = await usersRes.json();

      const totalRevenue = orders.reduce(
        (sum, order) => sum + (order.total || 0),
        0
      );

      setStats({
        revenue: totalRevenue,
        orders: orders.length,
        products: products.length,
        users: users.length,
      });
    } catch (error) {
      console.error("Dashboard data error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     LOADING SKELETON
     =============================== */
  if (loading) {
    return (
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 bg-gray-100 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  /* ===============================
     DASHBOARD UI
     =============================== */
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

        {/* TOTAL REVENUE */}
        <DashboardCard
          title="Total Revenue"
          value={`$${stats.revenue.toFixed(2)}`}
          icon={<DollarSign />}
        />

        {/* TOTAL ORDERS */}
        <DashboardCard
          title="Total Orders"
          value={stats.orders}
          icon={<ShoppingBag />}
        />

        {/* TOTAL PRODUCTS */}
        <DashboardCard
          title="Total Products"
          value={stats.products}
          icon={<Package />}
        />

        {/* TOTAL USERS */}
        <DashboardCard
          title="Total Users"
          value={stats.users}
          icon={<Users />}
        />
      </div>
    </div>
  );
}

/* ===============================
   REUSABLE CARD COMPONENT
   =============================== */
function DashboardCard({ title, value, icon }) {
  return (
    <div
      className="
        group bg-white p-4 sm:p-6 rounded-xl shadow
        flex justify-between items-center
        min-h-[110px]
        transition-all duration-300 ease-in-out
        hover:shadow-xl hover:-translate-y-1 hover:bg-orange-50
      "
    >
      <div>
        <p className="text-sm sm:text-base text-gray-500">{title}</p>
        <h2 className="text-xl sm:text-2xl font-bold">{value}</h2>
      </div>

      <div
        className="
          bg-[#a77c3b] p-2 sm:p-3 rounded-full text-white
          transition-transform duration-300
          group-hover:scale-110
        "
      >
        {icon}
      </div>
    </div>
  );
}
