

// ===================================================================================================

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Fixed Navbar */}
      <AdminNavbar />

      <div className="flex flex-1">
        {/* Sticky Sidebar - Full height, always visible on scroll */}
        <aside className="hidden lg:block w-64 bg-white shadow-md">
          <div className="h-screen sticky top-0 overflow-y-auto">
            <AdminSidebar />
          </div>
        </aside>

        {/* Scrollable Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
          <UserDashboard />

          {/* Charts Grid - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <RevenueChart />
            <CategoryChart />
            <OrdersChart />
            <TopProductsCard />
          </div>

          {/* Recent Orders */}
          <div className="mt-8">
            <RecentOrders />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
