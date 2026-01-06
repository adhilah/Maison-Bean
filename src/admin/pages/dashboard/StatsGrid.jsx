
// import React, { useEffect, useState } from "react";
// import { DollarSign, ShoppingBag, Package, Users } from "lucide-react";

// export default function UserDashboard() {

//   /* ===============================
//      1️⃣ STATE FOR DASHBOARD DATA
//      =============================== */
//   const [stats, setStats] = useState({
//     revenue: 0,
//     orders: 0,
//     products: 0,
//     users: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   /* ===============================
//      2️⃣ FETCH DATA ON PAGE LOAD
//      =============================== */
//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       // Fetch all data
//       const ordersRes = await fetch("http://localhost:3000/orders");
//       const productsRes = await fetch("http://localhost:3000/products");
//       const usersRes = await fetch("http://localhost:3000/users");

//       const orders = await ordersRes.json();
//       const products = await productsRes.json();
//       const users = await usersRes.json();

//       /* ===============================
//          3️⃣ SIMPLE LOGIC
//          =============================== */

//       // ➤ Total Revenue = sum of all order totals
//       const totalRevenue = orders.reduce(
//         (sum, order) => sum + (order.total || 0),
//         0
//       );

//       // ➤ Total Orders = number of orders
//       const totalOrders = orders.length;

//       // ➤ Total Products = number of products
//       const totalProducts = products.length;

//       // ➤ Total Users = number of users
//       const totalUsers = users.length;

//       /* ===============================
//          4️⃣ UPDATE STATE
//          =============================== */
//       setStats({
//         revenue: totalRevenue,
//         orders: totalOrders,
//         products: totalProducts,
//         users: totalUsers,
//       });

//       setLoading(false);
//     } catch (error) {
//       console.error("Dashboard data error:", error);
//       setLoading(false);
//     }
//   };

//   /* ===============================
//      5️⃣ LOADING STATE
//      =============================== */
//   if (loading) {
//     return <p className="p-6 text-lg">Loading dashboard...</p>;
//   }

//   /* ===============================
//      6️⃣ UI (SAME DESIGN)
//      =============================== */
//   return (
//     <div className="p-6 space-y-6">

//       <h1 className="text-2xl font-bold">Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//         {/* TOTAL REVENUE */}
//         <div className="
//   group bg-white p-6 rounded-xl shadow
//   flex justify-between items-center
//   transition-all duration-300 ease-in-out
//   hover:shadow-xl hover:-translate-y-1 hover:bg-orange-50
// ">
//   <div>
//             <p className="text-gray-500">Total Revenue</p>
//             <h2 className="text-2xl font-bold">
//               ${stats.revenue.toFixed(2)}
//             </h2>
//             {/* <p className="text-[#a77c3b] text-sm">+12.5% from last month</p> */}
//           </div>
//           <div className="
//     bg-[#a77c3b] p-3 rounded-full text-white
//     transition-transform duration-300
//     group-hover:scale-110
//   ">
//             <DollarSign />
//           </div>
//         </div>

//         {/* TOTAL ORDERS */}
//        <div className="
//   group bg-white p-6 rounded-xl shadow
//   flex justify-between items-center
//   transition-all duration-300 ease-in-out
//   hover:shadow-xl hover:-translate-y-1 hover:bg-orange-50
// ">
//           <div>
//             <p className="text-gray-500">Total Orders</p>
//             <h2 className="text-2xl font-bold">{stats.orders}</h2>
//             {/* <p className="text-[#a77c3b] text-sm">+8.2% from last month</p> */}
//           </div>
//           <div className="
//     bg-[#a77c3b] p-3 rounded-full text-white
//     transition-transform duration-300
//     group-hover:scale-110
//   ">
//             <ShoppingBag />
//           </div>
//         </div>

//         {/* TOTAL PRODUCTS */}
//         <div className="
//   group bg-white p-6 rounded-xl shadow
//   flex justify-between items-center
//   transition-all duration-300 ease-in-out
//   hover:shadow-xl hover:-translate-y-1 hover:bg-orange-50
// ">
//           <div>
//             <p className="text-gray-500">Total Products</p>
//             <h2 className="text-2xl font-bold">{stats.products}</h2>
//             {/* <p className="text-[#a77c3b] text-sm">+5.7% from last month</p> */}
//           </div>
//           <div className="
//     bg-[#a77c3b] p-3 rounded-full text-white
//     transition-transform duration-300
//     group-hover:scale-110
//   ">
//             <Package />
//           </div>
//         </div>

//         {/* TOTAL USERS */}
//         <div className="
//   group bg-white p-6 rounded-xl shadow
//   flex justify-between items-center
//   transition-all duration-300 ease-in-out
//   hover:shadow-xl hover:-translate-y-1 hover:bg-orange-50
// ">
//   <div>
//     <p className="text-gray-500">Total Users</p>
//     <h2 className="text-2xl font-bold">{stats.users}</h2>
//     {/* <p className="text-[#a77c3b] text-sm">+3.2% from last month</p> */}
//   </div>

//   <div className="
//     bg-[#a77c3b] p-3 rounded-full text-white
//     transition-transform duration-300
//     group-hover:scale-110
//   ">
//     <Users />
//   </div>
// </div>

//       </div>
//     </div>
//   );
// }





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
