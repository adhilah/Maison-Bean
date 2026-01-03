
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    { title: "Total Revenue", value: "$54,239", change: "+12.5%" },
    { title: "Total Orders", value: "1,234", change: "+8.2%" },
    { title: "Total Products", value: "567", change: "+5.7%" },
    { title: "Total Users", value: "8,954", change: "+3.2%" },
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "John Smith", date: "2024-01-15", amount: "$299.99", status: "delivered" },
    { id: "#ORD-002", customer: "Emma Wilson", date: "2024-01-14", amount: "$499.99", status: "processing" },
    { id: "#ORD-003", customer: "Robert Brown", date: "2024-01-14", amount: "$199.99", status: "pending" },
    { id: "#ORD-004", customer: "Sarah Johnson", date: "2024-01-13", amount: "$899.99", status: "delivered" },
    { id: "#ORD-005", customer: "Michael Lee", date: "2024-01-13", amount: "$149.99", status: "cancelled" },
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "users", label: "User Management", icon: "people" },
    { id: "products", label: "Product Management", icon: "inventory_2" },
    { id: "orders", label: "Order Management", icon: "shopping_bag" },
    { id: "cart", label: "Cart Overview", icon: "shopping_cart" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-red-100 text-red-800";
    }
  };

  return (
    <>
      {/* Google Material Symbols Font */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

      <style jsx>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      <div className="min-h-screen bg-amber-50">
        {/* Header */}
        <header className="bg-[#9c7635] text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Maison Bean - Admin Dashboard</h1>
            <div className="flex items-center gap-6">
              <span className="text-sm">
                Welcome, <strong>{user?.email || "Admin"}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-rose-600 hover:bg-rose-700 px-6 py-2 rounded-lg font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          {sidebarOpen && (
            <aside className="w-64 bg-white border-r min-h-screen">
              <nav className="mt-8">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-left transition ${
                      activeTab === item.id
                        ? "bg-amber-100 text-[#9c7635] border-r-4 border-[#9c7635]"
                        : "text-gray-700 hover:bg-amber-50"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              {/* Toggle Sidebar Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mb-6 p-2 bg-white rounded-lg shadow hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">
                  {sidebarOpen ? "menu_open" : "menu"}
                </span>
              </button>

              {/* Dashboard Overview */}
              {activeTab === "dashboard" && (
                <>
                  <h2 className="text-3xl font-bold text-amber-900 mb-2">Dashboard Overview</h2>
                  <p className="text-amber-700 mb-8">Monitor your coffee shop performance</p>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, i) => (
                      <div key={i} className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-amber-600">{stat.title}</p>
                            <p className="text-3xl font-bold text-amber-900 mt-2">{stat.value}</p>
                            <p className="text-sm text-green-600 mt-2">↑ {stat.change} from last month</p>
                          </div>
                          <span className="material-symbols-outlined text-4xl text-amber-500 opacity-20">
                            {i === 0 ? "attach_money" : i === 1 ? "receipt_long" : i === 2 ? "inventory" : "group"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-amber-900">Recent Orders</h3>
                      <button className="text-[#9c7635] hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                        View All
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-amber-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-amber-50 transition">
                              <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                              <td className="px-6 py-4 text-sm">{order.customer}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                              <td className="px-6 py-4 text-sm font-semibold">{order.amount}</td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* Placeholder for other tabs */}
              {activeTab !== "dashboard" && (
                <div className="text-center py-20">
                  <span className="material-symbols-outlined text-8xl text-amber-200 mb-4">
                    {activeTab === "users" ? "people" :
                     activeTab === "products" ? "inventory_2" :
                     activeTab === "orders" ? "receipt_long" :
                     activeTab === "cart" ? "shopping_cart" : "settings"}
                  </span>
                  <h3 className="text-2xl font-semibold text-amber-900 mt-4">
                    {menuItems.find(m => m.id === activeTab)?.label}
                  </h3>
                  <p className="text-amber-600 mt-2">Feature coming soon...</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}