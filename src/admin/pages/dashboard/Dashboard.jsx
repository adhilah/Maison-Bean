// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import {
//   LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from "recharts";

// export default function Dashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [timeRange, setTimeRange] = useState("monthly");

//   // Stats data
//   const stats = [
//     { title: "Total Revenue", value: "$54,239", change: "+12.5%", icon: "attach_money", color: "bg-green-500" },
//     { title: "Total Orders", value: "1,234", change: "+8.2%", icon: "receipt_long", color: "bg-blue-500" },
//     { title: "Total Products", value: "567", change: "+5.7%", icon: "inventory", color: "bg-purple-500" },
//     { title: "Total Users", value: "8,954", change: "+3.2%", icon: "group", color: "bg-amber-500" },
//   ];

//   // Revenue data for line chart
//   const revenueData = [
//     { month: "Jan", revenue: 4200, orders: 120 },
//     { month: "Feb", revenue: 5200, orders: 150 },
//     { month: "Mar", revenue: 3800, orders: 110 },
//     { month: "Apr", revenue: 6200, orders: 180 },
//     { month: "May", revenue: 7200, orders: 210 },
//     { month: "Jun", revenue: 8100, orders: 240 },
//     { month: "Jul", revenue: 9200, orders: 270 },
//     { month: "Aug", revenue: 10200, orders: 300 },
//     { month: "Sep", revenue: 8500, orders: 250 },
//     { month: "Oct", revenue: 9400, orders: 280 },
//     { month: "Nov", revenue: 11200, orders: 330 },
//     { month: "Dec", revenue: 12800, orders: 380 },
//   ];

//   // Category sales data for bar chart
//   const categoryData = [
//     { name: "Coffee Beans", sales: 4200, growth: "+12%" },
//     { name: "Brewing Equipment", sales: 3200, growth: "+8%" },
//     { name: "Merchandise", sales: 2800, growth: "+15%" },
//     { name: "Subscriptions", sales: 1800, growth: "+25%" },
//     { name: "Accessories", sales: 1200, growth: "+5%" },
//   ];

//   // Pie chart data for order status
//   const orderStatusData = [
//     { name: "Delivered", value: 65, color: "#10b981" },
//     { name: "Processing", value: 20, color: "#3b82f6" },
//     { name: "Pending", value: 10, color: "#f59e0b" },
//     { name: "Cancelled", value: 5, color: "#ef4444" },
//   ];

//   // Recent orders data
//   const recentOrders = [
//     { id: "#ORD-001", customer: "John Smith", date: "2024-01-15", amount: "$299.99", status: "delivered" },
//     { id: "#ORD-002", customer: "Emma Wilson", date: "2024-01-14", amount: "$499.99", status: "processing" },
//     { id: "#ORD-003", customer: "Robert Brown", date: "2024-01-14", amount: "$199.99", status: "pending" },
//     { id: "#ORD-004", customer: "Sarah Johnson", date: "2024-01-13", amount: "$899.99", status: "delivered" },
//     { id: "#ORD-005", customer: "Michael Lee", date: "2024-01-13", amount: "$149.99", status: "cancelled" },
//   ];

//   // Top products data
//   const topProducts = [
//     { name: "Ethiopian Yirgacheffe", sales: 234, revenue: "$4,212" },
//     { name: "Colombian Supremo", sales: 189, revenue: "$3,402" },
//     { name: "French Press Kit", sales: 156, revenue: "$3,744" },
//     { name: "Coffee Grinder", sales: 142, revenue: "$4,260" },
//     { name: "Mug Set", sales: 128, revenue: "$1,536" },
//   ];

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: "dashboard" },
//     { id: "analytics", label: "Analytics", icon: "analytics" },
//     { id: "users", label: "User Management", icon: "people" },
//     { id: "products", label: "Product Management", icon: "inventory_2" },
//     { id: "orders", label: "Order Management", icon: "shopping_bag" },
//     { id: "cart", label: "Cart Overview", icon: "shopping_cart" },
//     { id: "reports", label: "Reports", icon: "assessment" },
//     { id: "settings", label: "Settings", icon: "settings" },
//   ];

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "delivered": return "bg-green-100 text-green-800";
//       case "processing": return "bg-blue-100 text-blue-800";
//       case "pending": return "bg-yellow-100 text-yellow-800";
//       default: return "bg-red-100 text-red-800";
//     }
//   };

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
//           <p className="font-semibold text-gray-800">{label}</p>
//           {payload.map((entry, index) => (
//             <p key={index} style={{ color: entry.color }}>
//               {entry.name}: {entry.name === "revenue" ? "$" : ""}{entry.value}
//               {entry.name === "revenue" ? "" : " orders"}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <>
//       {/* Google Material Symbols Font */}
//       <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

//       <style jsx>{`
//         .material-symbols-outlined {
//           font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
//         }
//       `}</style>

//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <header className="bg-[#9c7635] text-white shadow-lg">
//           <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <span className="material-symbols-outlined text-3xl">local_cafe</span>
//               <h1 className="text-3xl font-bold">Maison Bean - Admin Dashboard</h1>
//             </div>
//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-lg">
//                 <span className="material-symbols-outlined">notifications</span>
//                 <span className="w-2 h-2 bg-red-400 rounded-full"></span>
//               </div>
//               <span className="text-sm">
//                 Welcome, <strong>{user?.email || "Admin"}</strong>
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-rose-600 hover:bg-rose-700 px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
//               >
//                 <span className="material-symbols-outlined text-lg">logout</span>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </header>

//         <div className="flex">
//           {/* Sidebar */}
//           {sidebarOpen && (
//             <aside className="w-64 bg-white border-r min-h-screen shadow-lg">
//               <div className="p-6 border-b">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
//                     <span className="material-symbols-outlined text-amber-700">admin_panel_settings</span>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-800">Admin Panel</p>
//                     <p className="text-xs text-gray-500">Full Access</p>
//                   </div>
//                 </div>
//               </div>
//               <nav className="mt-4">
//                 {menuItems.map((item) => (
//                   <button
//                     key={item.id}
//                     onClick={() => setActiveTab(item.id)}
//                     className={`w-full flex items-center gap-4 px-6 py-4 text-left transition ${
//                       activeTab === item.id
//                         ? "bg-amber-50 text-[#9c7635] border-r-4 border-[#9c7635]"
//                         : "text-gray-700 hover:bg-amber-50"
//                     }`}
//                   >
//                     <span className="material-symbols-outlined text-xl">{item.icon}</span>
//                     <span className="font-medium">{item.label}</span>
//                   </button>
//                 ))}
//               </nav>
//             </aside>
//           )}

//           {/* Main Content */}
//           <main className="flex-1 p-6">
//             <div className="max-w-7xl mx-auto">
//               {/* Top Bar */}
//               <div className="flex justify-between items-center mb-8">
//                 <div>
//                   <button
//                     onClick={() => setSidebarOpen(!sidebarOpen)}
//                     className="p-3 bg-white rounded-xl shadow hover:bg-gray-50 transition"
//                   >
//                     <span className="material-symbols-outlined">
//                       {sidebarOpen ? "menu_open" : "menu"}
//                     </span>
//                   </button>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="flex bg-white rounded-xl shadow overflow-hidden">
//                     {["daily", "weekly", "monthly", "yearly"].map((range) => (
//                       <button
//                         key={range}
//                         onClick={() => setTimeRange(range)}
//                         className={`px-4 py-2 text-sm font-medium transition ${
//                           timeRange === range
//                             ? "bg-[#9c7635] text-white"
//                             : "text-gray-700 hover:bg-gray-100"
//                         }`}
//                       >
//                         {range.charAt(0).toUpperCase() + range.slice(1)}
//                       </button>
//                     ))}
//                   </div>
//                   <button className="px-4 py-2 bg-white rounded-xl shadow hover:bg-gray-50 transition flex items-center gap-2">
//                     <span className="material-symbols-outlined">download</span>
//                     Export Report
//                   </button>
//                 </div>
//               </div>

//               {/* Dashboard Overview */}
//               {activeTab === "dashboard" && (
//                 <>
//                   {/* Stats Cards */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                     {stats.map((stat, i) => (
//                       <div key={i} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
//                             <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
//                             <div className="flex items-center gap-1">
//                               <span className="material-symbols-outlined text-sm text-green-500">trending_up</span>
//                               <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
//                             </div>
//                           </div>
//                           <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
//                             <span className="material-symbols-outlined text-white text-2xl">
//                               {stat.icon}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Charts Grid */}
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//                     {/* Revenue Trend Chart */}
//                     <div className="bg-white rounded-2xl shadow-lg p-6">
//                       <div className="flex justify-between items-center mb-6">
//                         <h3 className="text-xl font-semibold text-gray-900">Revenue Trend</h3>
//                         <span className="text-green-600 font-medium">+12.5% Growth</span>
//                       </div>
//                       <div className="h-80">
//                         <ResponsiveContainer width="100%" height="100%">
//                           <LineChart data={revenueData}>
//                             <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                             <XAxis dataKey="month" stroke="#666" />
//                             <YAxis stroke="#666" />
//                             <Tooltip content={<CustomTooltip />} />
//                             <Legend />
//                             <Line
//                               type="monotone"
//                               dataKey="revenue"
//                               stroke="#9c7635"
//                               strokeWidth={3}
//                               dot={{ stroke: '#9c7635', strokeWidth: 2, r: 4 }}
//                               activeDot={{ r: 6 }}
//                               name="Revenue ($)"
//                             />
//                             <Line
//                               type="monotone"
//                               dataKey="orders"
//                               stroke="#3b82f6"
//                               strokeWidth={2}
//                               strokeDasharray="5 5"
//                               name="Orders"
//                             />
//                           </LineChart>
//                         </ResponsiveContainer>
//                       </div>
//                     </div>

//                     {/* Category Sales Chart */}
//                     <div className="bg-white rounded-2xl shadow-lg p-6">
//                       <div className="flex justify-between items-center mb-6">
//                         <h3 className="text-xl font-semibold text-gray-900">Category Performance</h3>
//                         <span className="text-blue-600 font-medium">Top Selling Categories</span>
//                       </div>
//                       <div className="h-80">
//                         <ResponsiveContainer width="100%" height="100%">
//                           <BarChart data={categoryData}>
//                             <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                             <XAxis dataKey="name" stroke="#666" />
//                             <YAxis stroke="#666" />
//                             <Tooltip 
//                               formatter={(value) => [`$${value}`, 'Sales']}
//                               labelStyle={{ color: '#333' }}
//                             />
//                             <Legend />
//                             <Bar 
//                               dataKey="sales" 
//                               fill="#9c7635" 
//                               radius={[4, 4, 0, 0]}
//                               name="Sales ($)"
//                             />
//                           </BarChart>
//                         </ResponsiveContainer>
//                       </div>
//                     </div>

//                     {/* Order Status Distribution */}
//                     <div className="bg-white rounded-2xl shadow-lg p-6">
//                       <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Status Distribution</h3>
//                       <div className="h-80">
//                         <ResponsiveContainer width="100%" height="100%">
//                           <PieChart>
//                             <Pie
//                               data={orderStatusData}
//                               cx="50%"
//                               cy="50%"
//                               labelLine={false}
//                               label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                               outerRadius={80}
//                               fill="#8884d8"
//                               dataKey="value"
//                             >
//                               {orderStatusData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={entry.color} />
//                               ))}
//                             </Pie>
//                             <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
//                             <Legend />
//                           </PieChart>
//                         </ResponsiveContainer>
//                       </div>
//                     </div>

//                     {/* Top Products */}
//                     <div className="bg-white rounded-2xl shadow-lg p-6">
//                       <div className="flex justify-between items-center mb-6">
//                         <h3 className="text-xl font-semibold text-gray-900">Top Products</h3>
//                         <button className="text-[#9c7635] hover:underline flex items-center gap-1">
//                           <span className="material-symbols-outlined">visibility</span>
//                           View All
//                         </button>
//                       </div>
//                       <div className="space-y-4">
//                         {topProducts.map((product, index) => (
//                           <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
//                             <div className="flex items-center gap-4">
//                               <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
//                                 <span className="material-symbols-outlined text-amber-700">local_cafe</span>
//                               </div>
//                               <div>
//                                 <p className="font-medium text-gray-900">{product.name}</p>
//                                 <p className="text-sm text-gray-600">{product.sales} units sold</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="font-semibold text-gray-900">{product.revenue}</p>
//                               <p className="text-sm text-green-600">+{Math.floor(Math.random() * 20) + 5}%</p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recent Orders Table */}
//                   <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                     <div className="px-6 py-4 border-b flex justify-between items-center">
//                       <h3 className="text-xl font-semibold text-gray-900">Recent Orders</h3>
//                       <button className="text-[#9c7635] hover:underline flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg">
//                         <span className="material-symbols-outlined">add</span>
//                         New Order
//                       </button>
//                     </div>
//                     <div className="overflow-x-auto">
//                       <table className="w-full">
//                         <thead className="bg-gray-50">
//                           <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Order ID</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Customer</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Amount</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                           {recentOrders.map((order) => (
//                             <tr key={order.id} className="hover:bg-gray-50 transition">
//                               <td className="px-6 py-4">
//                                 <div className="flex items-center gap-3">
//                                   <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                                     <span className="material-symbols-outlined text-blue-600 text-sm">receipt</span>
//                                   </div>
//                                   <span className="font-medium text-gray-900">{order.id}</span>
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4">
//                                 <div className="flex items-center gap-3">
//                                   <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
//                                   <span>{order.customer}</span>
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 text-gray-600">{order.date}</td>
//                               <td className="px-6 py-4 font-semibold text-gray-900">{order.amount}</td>
//                               <td className="px-6 py-4">
//                                 <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                                   {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4">
//                                 <button className="p-2 hover:bg-gray-100 rounded-lg transition">
//                                   <span className="material-symbols-outlined text-gray-600">more_vert</span>
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {/* Placeholder for other tabs */}
//               {activeTab !== "dashboard" && (
//                 <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//                   <div className="w-24 h-24 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6">
//                     <span className="material-symbols-outlined text-5xl text-amber-600">
//                       {menuItems.find(m => m.id === activeTab)?.icon}
//                     </span>
//                   </div>
//                   <h3 className="text-3xl font-bold text-gray-900 mb-4">
//                     {menuItems.find(m => m.id === activeTab)?.label}
//                   </h3>
//                   <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
//                     This section is currently under development. We're working hard to bring you amazing features!
//                   </p>
//                   <button className="px-6 py-3 bg-[#9c7635] text-white rounded-lg font-medium hover:bg-amber-700 transition">
//                     Learn More About Upcoming Features
//                   </button>
//                 </div>
//               )}
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }






// ===================================================================================================
import React from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import UserDashboard from "./StatsGrid";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <AdminNavbar />

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 ml-20 mr-20">
          <UserDashboard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
