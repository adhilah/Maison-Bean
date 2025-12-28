// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const OrderList = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Get current logged-in user
//   const storedUser = localStorage.getItem("user");
//   const currentUser = storedUser ? JSON.parse(storedUser) : null;

//   useEffect(() => {
//     if (!currentUser) {
//       setLoading(false);
//       return;
//     }

//     fetch("http://localhost:3000/orders")
//       .then((res) => res.json())
//       .then((data) => {
//         // Filter orders for current user only
//         const userOrders = data
//           .filter((order) => order.userId === currentUser.id)
//           .reverse(); // newest first

//         setOrders(userOrders);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to load orders:", err);
//         setLoading(false);
//       });
//   }, [currentUser]);

//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "confirmed":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   if (!currentUser) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold mb-4">Please log in</h1>
//           <Link to="/login" className="text-[#9c7635] hover:underline text-lg">
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return <div className="text-center py-20 text-xl">Loading your orders...</div>;
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold mb-4">No orders yet</h1>
//           <p className="text-gray-600 mb-6">Start shopping to place your first order!</p>
//           <Link to="/menu" className="text-[#9c7635] hover:underline text-lg">
//             Browse Menu
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
//           My Orders
//         </h1>

//         <div className="space-y-8">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200"
//             >
//               {/* Header */}
//               <div className="bg-gradient-to-r from-[#9c7635] to-[#7a5c2a] text-white p-6">
//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//                   <div>
//                     <p className="text-sm opacity-90">Order ID</p>
//                     <p className="text-xl font-bold">#{order.id}</p>
//                     <p className="text-sm mt-1 opacity-90">
//                       Placed on {formatDate(order.date)}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-3xl font-bold">${order.total.toFixed(2)}</p>
//                     <span
//                       className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
//                         order.status
//                       )}`}
//                     >
//                       {order.status || "Confirmed"}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Items */}
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {order.items.map((item, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-4 bg-gray-50 rounded-xl p-4"
//                     >
//                       <img
//                         src={item.product.image}
//                         alt={item.product.name}
//                         className="w-20 h-20 object-cover rounded-lg"
//                       />
//                       <div className="flex-1">
//                         <h4 className="font-semibold text-lg">
//                           {item.product.name}
//                         </h4>
//                         {item.isCustomized && (
//                           <p className="text-sm text-gray-600 mt-1">
//                             Customized
//                           </p>
//                         )}
//                         <p className="text-sm text-gray-500 mt-1">
//                           Qty: {item.quantity}
//                         </p>
//                         <p className="font-bold mt-2">
//                           ${item.unitPrice.toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderList;




// src/components/OrderList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get current logged-in user
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((data) => {
        // Filter orders for current user only
        const userOrders = data
          .filter((order) => order.userId === currentUser.id)
          .reverse(); // newest first

        setOrders(userOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load orders:", err);
        setLoading(false);
      });
  }, [currentUser]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentText = (method) => {
    switch (method) {
      case "cod":
        return "Cash on Delivery";
      case "upi":
        return "Paid via UPI";
      case "card":
        return "Paid via Card";
      default:
        return "Paid";
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please log in</h1>
          <Link to="/login" className="text-[#9c7635] hover:underline text-lg">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No orders yet</h1>
          <p className="text-gray-600 mb-6">Start shopping to place your first order!</p>
          <Link to="/menu" className="text-[#9c7635] hover:underline text-lg">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          My Orders
        </h1>

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#9c7635] to-[#7a5c2a] text-white p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <p className="text-sm opacity-90">Order ID</p>
                    <p className="text-xl font-bold">#{order.id}</p>
                    <p className="text-sm mt-1 opacity-90">
                      Placed on {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">${order.total.toFixed(2)}</p>
                    <span
                      className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status || "Confirmed"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-gray-50 rounded-xl p-4"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">
                          {item.product.name}
                        </h4>
                        {item.isCustomized && (
                          <p className="text-sm text-gray-600 mt-1">
                            Customized
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          Qty: {item.quantity}
                        </p>
                        <p className="font-bold mt-2">
                          ${item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment Method Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-center text-lg font-medium text-gray-700">
                    Payment Method: <span className="font-bold text-[#9c7635]">
                      {getPaymentText(order.paymentMethod)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderList;