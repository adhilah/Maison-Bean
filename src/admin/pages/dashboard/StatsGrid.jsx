// import React, { useEffect, useState } from "react";
// import { DollarSign, ShoppingBag, Package, Users } from "lucide-react";
// import api from "../../../services/api";
// import toast from "react-hot-toast";

// export default function UserDashboard() {
//   const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, users: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => { fetchDashboardData(); }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const dashboardRes =
//   await api.get(
//     "/admin/dashboard"
//   );

// const data =
//   dashboardRes.data;

// setStats({
//   revenue:
//     Number(data.revenue || 0)
//       .toFixed(2),

//   orders:
//     data.orders || 0,

//   products:
//     data.products || 0,

//   users:
//     data.users || 0,
// });

//       const orders   = ordersRes.data   || [];
//       const products = productsRes.data || [];
//       const users    = usersRes.data    || [];

//       const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);

//       setStats({ revenue: totalRevenue, orders: orders.length, products: products.length, users: users.length });
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load dashboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cards = [
//     {
//       title: "Total Revenue",
//       value: `${Number(stats.revenue).toFixed(2)}`,
//       icon: DollarSign,
//       sub: "All time earnings",
//     },
//     {
//       title: "Total Orders",
//       value: stats.orders,
//       icon: ShoppingBag,
//       sub: "Across all customers",
//     },
//     {
//       title: "Total Products",
//       value: stats.products,
//       icon: Package,
//       sub: "Active listings",
//     },
//     {
//       title: "Total Users",
//       value: stats.users,
//       icon: Users,
//       sub: "Registered accounts",
//     },
//   ];

//   /* Loading skeleton */
//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[1, 2, 3, 4].map((i) => (
//           <div
//             key={i}
//             className="h-[110px] rounded-2xl animate-pulse border border-[#1f1f1f]"
//             style={{ background: "#111111" }}
//           />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//       {cards.map((card) => (
//         <DashboardCard key={card.title} {...card} />
//       ))}
//     </div>
//   );
// }

// function DashboardCard({ title, value, icon: Icon, sub }) {
//   return (
//     <div
//       className="group relative rounded-2xl border border-[#1f1f1f] p-5 flex flex-col justify-between min-h-[110px] hover:border-[#2e2400] transition-all duration-300 overflow-hidden cursor-default"
//       style={{ background: "#111111" }}
//     >
//       {/* Subtle gold glow on hover */}
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
//         style={{ background: "radial-gradient(ellipse at top right, #1a130010, transparent 70%)" }}
//       />

//       {/* Top row */}
//       <div className="flex items-start justify-between">
//         <p className="text-[11px] tracking-[2px] uppercase text-[#5a5650]">
//           {title}
//         </p>
//         <div
//           className="w-8 h-8 rounded-xl flex items-center justify-center border border-[#2e2400] group-hover:border-[#c9a96e] transition-colors duration-300"
//           style={{ background: "#1a1500" }}
//         >
//           <Icon size={15} className="text-[#8a6e45] group-hover:text-[#c9a96e] transition-colors duration-300" />
//         </div>
//       </div>

//       {/* Value */}
//       <div>
//         <h2
//           className="text-2xl font-medium text-[#f0ece4] leading-none mb-1"
//           style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
//         >
//           {value}
//         </h2>
//         <p className="text-[11px] text-[#3a3530]">{sub}</p>
//       </div>

//       {/* Bottom accent line */}
//       <div className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-[#c9a96e] transition-all duration-500 opacity-30" />
//     </div>
//   );
// }



import React, {
  useEffect,
  useState
} from "react";

import {
  DollarSign,
  ShoppingBag,
  Package,
  Users
} from "lucide-react";

import toast from "react-hot-toast";

import { getAllOrders }
  from "../../../services/orderApi";

import { getAllProductsForAdmin }
  from "../../../services/productApi";

import { getAllUsers }
  from "../../../services/userApi";

export default function UserDashboard() {

  const [stats, setStats] =
    useState({
      revenue: 0,
      orders: 0,
      products: 0,
      users: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData =
    async () => {

      try {

        const [
          ordersRes,
          productsRes,
          usersRes
        ] = await Promise.all([

          getAllOrders(),

          getAllProductsForAdmin(),

          getAllUsers(),
        ]);

        // USERS RESPONSE

        const users =
          usersRes.data || [];

        // PRODUCTS RESPONSE

        const products =
          productsRes || [];

        // ORDERS RESPONSE

        const orders =
          ordersRes || [];

        // REVENUE

        const totalRevenue =
          orders.reduce(

            (sum, order) =>

              sum +
              Number(order.total || 0),

            0
          );

        setStats({

          revenue:
            totalRevenue,

          orders:
            orders.length,

          products:
            products.length,

          users:
            users.length,
        });

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to load dashboard"
        );

      } finally {

        setLoading(false);
      }
    };

  const cards = [

    {
      title: "Total Revenue",

      value:
        `₹${Number(
          stats.revenue
        ).toFixed(2)}`,

      icon: DollarSign,

      sub: "All time earnings",
    },

    {
      title: "Total Orders",

      value: stats.orders,

      icon: ShoppingBag,

      sub: "Across all customers",
    },

    {
      title: "Total Products",

      value: stats.products,

      icon: Package,

      sub: "Active listings",
    },

    {
      title: "Total Users",

      value: stats.users,

      icon: Users,

      sub: "Registered accounts",
    },
  ];

  // ======================================
  // LOADING
  // ======================================

  if (loading) {

    return (

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {[1, 2, 3, 4].map((i) => (

          <div
            key={i}
            className="h-[110px] rounded-2xl animate-pulse border border-[#1f1f1f]"
            style={{
              background: "#111111"
            }}
          />
        ))}

      </div>
    );
  }

  // ======================================
  // UI
  // ======================================

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {cards.map((card) => (

        <DashboardCard
          key={card.title}
          {...card}
        />
      ))}

    </div>
  );
}

function DashboardCard({
  title,
  value,
  icon: Icon,
  sub
}) {

  return (

    <div
      className="group relative rounded-2xl border border-[#1f1f1f] p-5 flex flex-col justify-between min-h-[110px] hover:border-[#2e2400] transition-all duration-300 overflow-hidden cursor-default"
      style={{
        background: "#111111"
      }}
    >

      {/* Glow */}

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"

        style={{
          background:
            "radial-gradient(ellipse at top right, #1a130010, transparent 70%)"
        }}
      />

      {/* Header */}

      <div className="flex items-start justify-between">

        <p className="text-[11px] tracking-[2px] uppercase text-[#5a5650]">
          {title}
        </p>

        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center border border-[#2e2400] group-hover:border-[#c9a96e] transition-colors duration-300"

          style={{
            background: "#1a1500"
          }}
        >

          <Icon
            size={15}
            className="text-[#8a6e45] group-hover:text-[#c9a96e] transition-colors duration-300"
          />

        </div>
      </div>

      {/* Value */}

      <div>

        <h2
          className="text-2xl font-medium text-[#f0ece4] leading-none mb-1"

          style={{
            fontFamily:
              "'Playfair Display', Georgia, serif"
          }}
        >
          {value}
        </h2>

        <p className="text-[11px] text-[#3a3530]">
          {sub}
        </p>

      </div>

      {/* Bottom line */}

      <div
        className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-[#c9a96e] transition-all duration-500 opacity-30"
      />

    </div>
  );
}