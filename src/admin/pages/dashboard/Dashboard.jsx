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
//     <div className="min-h-screen" style={{ background: "#080604", fontFamily: "'Jost', sans-serif" }}>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />
//         <main className="flex-1 w-full lg:ml-64 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">

//           {/* HEADER */}
//           <div className="mb-8">
//             <p style={{ fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", color: "rgba(201,169,110,0.4)", marginBottom: 6 }}>
//               Overview
//             </p>
//             <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.4rem", color: "rgba(245,240,232,0.88)", margin: 0, lineHeight: 1 }}>
//               Admin <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Dashboard</em>
//             </h1>
//           </div>

//           {/* STATS */}
//           <UserDashboard />

//           {/* DIVIDER */}
//           <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "36px 0" }}>
//             <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.08)" }} />
//             <span style={{ fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(201,169,110,0.25)" }}>Analytics</span>
//             <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.08)" }} />
//           </div>

//           {/* CHARTS — all locked to same height via the wrapper div */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: 16 }}>
//             {[RevenueChart, CategoryChart, OrdersChart, TopProductsCard].map((Chart, i) => (
//               <div key={i} style={{ height: 480, background: "#0d0a05", border: "1px solid rgba(201,169,110,0.1)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
//                 <Chart />
//               </div>
//             ))}
//           </div>

//           {/* DIVIDER */}
//           <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "36px 0" }}>
//             <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.08)" }} />
//             <span style={{ fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(201,169,110,0.25)" }}>Recent Activity</span>
//             <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.08)" }} />
//           </div>

//           {/* RECENT ORDERS */}
//           <div style={{ border: "1px solid rgba(201,169,110,0.1)", overflow: "hidden", background: "#0d0a05" }}>
//             <RecentOrders />
//           </div>

//           <p style={{ textAlign: "center", fontSize: 9, color: "rgba(245,240,232,0.06)", marginTop: 40, letterSpacing: "0.5em", textTransform: "uppercase" }}>
//             Maison Bean · Admin
//           </p>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



//===============================================


import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import UserDashboard from "./StatsGrid";
import RevenueChart from "../../components/Charts/RevenueChart";
import CategoryChart from "../../components/Charts/CategoryChart";
import TopProductsCard from "../../components/Charts/TopProductsChart";
import OrdersChart from "../../components/Charts/OrdersChart";
import RecentOrders from "../../components/tables/RecentOrders";

/* ── Divider ── */
const Divider = ({ label }) => (
  <div className="flex items-center gap-4 my-9">
    <div className="flex-1 h-px bg-gradient-to-r from-[#c9a96e]/15 to-transparent" />
    <span className="text-[9px] tracking-[0.5em] uppercase text-[#c9a96e]/25 flex-shrink-0">
      {label}
    </span>
    <div className="flex-1 h-px bg-gradient-to-l from-[#c9a96e]/15 to-transparent" />
  </div>
);

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        /* Chart grid responsive */
        .chart-grid {
          display: grid;
          gap: 1px;
          background: rgba(201,169,110,0.08);
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px)  { .chart-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1280px) { .chart-grid { grid-template-columns: repeat(2, 1fr); } }

        .chart-cell {
          height: 420px;
          background: #0d0a05;
          border: 1px solid rgba(201,169,110,0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 768px) { .chart-cell { height: 460px; } }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.18); }
      `}</style>

      <div
        className="min-h-screen bg-[#080604] flex flex-col"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        {/* Navbar — manages sidebar toggle */}
        <AdminNavbar
          onMenuToggle={() => setSidebarOpen((v) => !v)}
          sidebarOpen={sidebarOpen}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* ── Main content ── */}
          <main className="flex-1 overflow-y-auto px-4 py-7 sm:px-6 lg:px-10 lg:py-10 min-w-0">

            {/* Ambient */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
              <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.018] blur-[140px]" />
              <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-[#c9a96e]/[0.012] blur-[110px]" />
            </div>

            <div className="relative z-10">

              {/* ── Page Header ── */}
              <div className="mb-8">
                <p className="text-[#c9a96e]/45 text-[9px] tracking-[0.6em] uppercase mb-2">
                  Overview
                </p>
                <h1
                  className="text-[#f5f0e8]/88 font-light leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,2.8rem)" }}
                >
                  Admin <em className="italic text-[#c9a96e]">Dashboard</em>
                </h1>
              </div>

              {/* ── Stats ── */}
              <UserDashboard />

              <Divider label="Analytics" />

              {/* ── Charts ── */}
              <div className="chart-grid">
                {[RevenueChart, CategoryChart, OrdersChart, TopProductsCard].map((Chart, i) => (
                  <div key={i} className="chart-cell">
                    <Chart />
                  </div>
                ))}
              </div>

              <Divider label="Recent Activity" />

              {/* ── Recent Orders ── */}
              <div
                className="overflow-hidden"
                style={{ border: "1px solid rgba(201,169,110,0.1)", background: "#0d0a05" }}
              >
                <RecentOrders />
              </div>

              {/* Footer */}
              <p className="text-center text-[9px] text-[#f5f0e8]/06 mt-12 tracking-[0.5em] uppercase">
                Maison Bean · Admin Panel
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;