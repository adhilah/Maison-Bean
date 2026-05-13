// import { useEffect, useState } from "react";
// import api from "../../../services/api";

// export default function DashboardStats() {
//   const [stats, setStats] = useState({
//     revenue: 0,
//     orders: 0,
//     products: 0,
//     users: 0,
//   });

//   useEffect(() => {

//   const fetchDashboardStats =
//     async () => {

//       try {

//         const [
//           ordersRes,
//           productsRes,
//           usersRes
//         ] = await Promise.all([

//           api.get("/order"),

//           api.get("/products"),

//           api.get("/user")
//         ]);

//         const orders =
//           ordersRes.data || [];

//         const products =
//           productsRes.data || [];

//         const users =
//           usersRes.data || [];

//         const totalRevenue =
//           orders.reduce(
//             (sum, order) =>
//               sum + Number(order.total || 0),
//             0
//           );

//         setStats({

//           revenue:
//             totalRevenue.toFixed(2),

//           orders:
//             orders.length,

//           products:
//             products.length,

//           users:
//             users.length,
//         });

//       } catch (err) {

//         console.error(err);

//         toast.error(
//           "Failed to load dashboard"
//         );
//       }
//     };

//   fetchDashboardStats();

// }, []);

//   return stats;
// }





//=========================================



import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { getAllOrders }
  from "../../../services/orderApi";

import { getAllProductsForAdmin }
  from "../../../services/productApi";

import { getAllUsers }
  from "../../../services/userApi";

export default function DashboardStats() {

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

    const fetchDashboardStats =
      async () => {

        try {

          const [
            orders,
            products,
            usersResponse
          ] = await Promise.all([

            getAllOrders(),

            getAllProductsForAdmin(),

            getAllUsers(),
          ]);

          // USERS

          const users =
            usersResponse.data || [];

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

    fetchDashboardStats();

  }, []);

  return {
    ...stats,
    loading,
  };
}