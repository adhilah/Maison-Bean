import React, {
  useState,
  useEffect
} from "react";

import {
  Package,
  Calendar,
  CheckCircle
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

import api from "../services/api";

export default function App() {

  const {
    user,
    isLoading: authLoading
  } = useAuth();

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    expandedOrders,
    setExpandedOrders
  ] = useState({});

  const navigate = useNavigate();

  // FETCH ORDERS
  useEffect(() => {

    if (authLoading)
      return;

    if (!user) {

      setLoading(false);

      return;
    }

    const fetchOrders =
      async () => {

        try {

          const res =
            await api.get(
              "/order"
            );

          const orders =
            res.data || [];

          const sortedOrders =
            orders.sort(
              (a, b) =>
                new Date(b.date)
                - new Date(a.date)
            );

          setOrders(
            sortedOrders
          );

        } catch (err) {

          console.error(err);

        } finally {

          setLoading(false);
        }
      };

    fetchOrders();

  }, [user, authLoading]);

  // STATUS COLORS
  const getStatusColor =
    (status) => {

      switch (
        status?.toLowerCase()
      ) {

        case "delivered":
          return
            "bg-green-200 text-green-800";

        case "shipped":
          return
            "bg-blue-200 text-blue-800";

        case "processing":
          return
            "bg-yellow-200 text-yellow-800";

        case "pending":
          return
            "bg-gray-200 text-gray-800";

        case "cancelled":
          return
            "bg-red-200 text-red-800";

        default:
          return
            "bg-gray-200 text-gray-800";
      }
    };

  // TOGGLE EXPAND
  const toggleExpand =
    (orderId) => {

      setExpandedOrders(
        (prev) => ({
          ...prev,
          [orderId]:
            !prev[orderId],
        })
      );
    };

  // LOADING
  if (
    loading ||
    authLoading
  ) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-[#a77c3b] border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-3 text-gray-600">
            Loading orders...
          </p>

        </div>

      </div>
    );
  }

  // NOT LOGGED IN
  if (!user) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <p className="text-gray-600">
          Please login to view your orders
        </p>

      </div>
    );
  }

  // MAIN
  return (

    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-white px-4 py-4 shadow-md">

        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Package
              className="text-[#a77c3b]"
              size={24}
            />

            <h1 className="text-xl font-semibold">
              My Orders
            </h1>

          </div>

          <button
            onClick={() =>
              navigate("/")
            }
            className="text-[#9c7635] hover:underline font-medium"
          >
            ← Continue Shopping
          </button>

        </div>

      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-4">

        <div className="space-y-6">

          {/* EMPTY */}
          {orders.length === 0 && (

            <div className="text-center py-12">

              <Package
                size={48}
                className="mx-auto text-gray-300"
              />

              <p className="mt-3 text-gray-500">
                No orders found
              </p>

            </div>
          )}

          {/* ORDERS */}
          {orders.map((order) => {

            const isExpanded =
              expandedOrders[
                order.id
              ];

            const itemsToShow =
              isExpanded
                ? order.items
                : order.items.slice(
                    0,
                    3
                  );

            const remainingCount =
              order.items.length - 3;

            return (

              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-xl p-6 relative"
              >

                {/* TOP */}
                <div className="flex justify-between mb-4">

                  <div>

                    <h3 className="font-medium text-lg">

                      Order #
                      {String(
                        order.id
                      ).slice(-6)}

                    </h3>

                    <p className="text-sm text-gray-500 mt-1">

                      {user.email}

                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status?.toUpperCase()}
                  </span>

                </div>

                {/* PRICE + DATE */}
                <div className="flex justify-between items-center mb-3">

                  <p className="font-bold text-[#a77c3b] text-lg">

                    ₹
                    {Number(
                      order.total || 0
                    ).toFixed(2)}

                  </p>

                  <div className="flex items-center gap-1 text-sm text-gray-500">

                    <Calendar size={12} />

                    {new Date(
                      order.date
                    ).toLocaleDateString()}

                  </div>

                </div>

                {/* ITEMS */}
                <div className="space-y-3">

                  {itemsToShow.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={index}
                        className="flex justify-between text-sm"
                      >

                        <div>

                          <p className="font-medium">

                            {item.productName}

                          </p>

                          <p className="text-xs text-gray-500">

                            Qty:
                            {" "}
                            {item.quantity}

                          </p>

                        </div>

                        <CheckCircle
                          size={16}
                          className="text-green-500"
                        />

                      </div>
                    )
                  )}

                  {/* MORE ITEMS */}
                  {!isExpanded &&
                    order.items.length > 3 && (

                    <button
                      onClick={() =>
                        toggleExpand(
                          order.id
                        )
                      }
                      className="text-sm text-[#a77c3b] font-medium hover:underline"
                    >

                      +
                      {remainingCount}
                      {" "}
                      more items

                    </button>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}