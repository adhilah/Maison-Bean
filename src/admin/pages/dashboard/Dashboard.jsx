

// // ===================================================================================================

// import React from "react";
// import AdminNavbar from "./AdminNavbar";
// import AdminSidebar from "./AdminSidebar";
// import UserDashboard from "./StatsGrid";
// import RevenueChart from "../../components/Charts/RevenueChart";
// import CategoryChart from "../../components/Charts/CategoryChart";
// import TopProductsCard from "../../components/Charts/TopProductsChart";
// import OrdersChart from "../../components/Charts/OrdersChart";
// import RecentOrders from "../../components/tables/RecentOrders";

// function Dashboard() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Fixed Navbar */}
//       <AdminNavbar />

//       <div className="flex flex-1">
//         {/* Sticky Sidebar - Full height, always visible on scroll */}
//         <aside className="hidden lg:block w-64 bg-white shadow-md">
//           <div className="h-screen sticky top-0 overflow-y-auto">
//             <AdminSidebar />
//           </div>
//         </aside>

//         {/* Scrollable Main Content */}
//         <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
//           <UserDashboard />

//           {/* Charts Grid - Responsive */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
//             <RevenueChart />
//             <CategoryChart />
//             <OrdersChart />
//             <TopProductsCard />
//           </div>

//           {/* Recent Orders */}
//           <div className="mt-8">
//             <RecentOrders />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;




import React from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import UserDashboard from "./StatsGrid";
import RevenueChart from "../../components/Charts/RevenueChart";
import CategoryChart from "../../components/Charts/CategoryChart";
import TopProductsCard from "../../components/Charts/TopProductsChart";
import OrdersChart from "../../components/Charts/OrdersChart";
import RecentOrders from "../../components/tables/RecentOrders";

function Dashboard() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#080808", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Navbar */}
      <AdminNavbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-[#1f1f1f]" style={{ background: "#0f0f0f" }}>
          <div className="h-screen sticky top-0 overflow-y-auto">
            <AdminSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10 lg:py-10">

          {/* Page Header */}
          <div className="mb-8">
            <p className="text-[11px] tracking-[3px] uppercase text-[#8a6e45] mb-1">
              Overview
            </p>
            <h1
              className="text-3xl font-medium text-[#f0ece4]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Dashboard
            </h1>
          </div>

          {/* Stats Grid */}
          <UserDashboard />

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#1f1f1f]" />
            <span className="text-[10px] tracking-[2px] uppercase text-[#3a3530]">
              Analytics
            </span>
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="rounded-2xl border border-[#1f1f1f] p-5 hover:border-[#2e2b26] transition-colors duration-300" style={{ background: "#111111" }}>
              <RevenueChart />
            </div>

            <div className="rounded-2xl border border-[#1f1f1f] p-5 hover:border-[#2e2b26] transition-colors duration-300" style={{ background: "#111111" }}>
              <CategoryChart />
            </div>

            <div className="rounded-2xl border border-[#1f1f1f] p-5 hover:border-[#2e2b26] transition-colors duration-300" style={{ background: "#111111" }}>
              <OrdersChart />
            </div>

            <div className="rounded-2xl border border-[#1f1f1f] p-5 hover:border-[#2e2b26] transition-colors duration-300" style={{ background: "#111111" }}>
              <TopProductsCard />
            </div>

          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#1f1f1f]" />
            <span className="text-[10px] tracking-[2px] uppercase text-[#3a3530]">
              Recent Activity
            </span>
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </div>

          {/* Recent Orders */}
          <div className="rounded-2xl border border-[#1f1f1f] overflow-hidden" style={{ background: "#111111" }}>
            <RecentOrders />
          </div>

          {/* Footer */}
          <p className="text-center text-[11px] text-[#2e2b26] mt-10 tracking-widest uppercase">
            Maison Bean ✦ Admin
          </p>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;