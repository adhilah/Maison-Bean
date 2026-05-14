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
    <div className="min-h-screen" style={{ background: "#080604", fontFamily: "'Jost', sans-serif" }}>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 w-full lg:ml-64 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">

          {/* HEADER */}
          <div className="mb-8">
            <p style={{ fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", color: "rgba(201,169,110,0.4)", marginBottom: 6 }}>
              Overview
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.4rem", color: "rgba(245,240,232,0.88)", margin: 0, lineHeight: 1 }}>
              Admin <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Dashboard</em>
            </h1>
          </div>

          {/* STATS */}
          <UserDashboard />

          {/* DIVIDER */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "36px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.08)" }} />
            <span style={{ fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(201,169,110,0.25)" }}>Analytics</span>
            <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.08)" }} />
          </div>

          {/* CHARTS — all locked to same height via the wrapper div */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: 16 }}>
            {[RevenueChart, CategoryChart, OrdersChart, TopProductsCard].map((Chart, i) => (
              <div key={i} style={{ height: 480, background: "#0d0a05", border: "1px solid rgba(201,169,110,0.1)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <Chart />
              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "36px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.08)" }} />
            <span style={{ fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(201,169,110,0.25)" }}>Recent Activity</span>
            <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.08)" }} />
          </div>

          {/* RECENT ORDERS */}
          <div style={{ border: "1px solid rgba(201,169,110,0.1)", overflow: "hidden", background: "#0d0a05" }}>
            <RecentOrders />
          </div>

          <p style={{ textAlign: "center", fontSize: 9, color: "rgba(245,240,232,0.06)", marginTop: 40, letterSpacing: "0.5em", textTransform: "uppercase" }}>
            Maison Bean · Admin
          </p>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;