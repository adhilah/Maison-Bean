// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// /* ── Icons ── */
// const DashIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
//     <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
//   </svg>
// );
// const UsersIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
//     <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
//   </svg>
// );
// const ProductIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
//     <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
//     <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
//   </svg>
// );
// const BeanIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//     <ellipse cx="12" cy="12" rx="9" ry="6"/>
//     <path d="M12 6 Q8 12 12 18"/><path d="M12 6 Q16 12 12 18"/>
//   </svg>
// );
// const OrderIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
//     <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
//   </svg>
// );

// const menuItems = [
//   { to: "/admin/dashboard",            icon: DashIcon,    label: "Dashboard"            },
//   { to: "/admin/users-management",     icon: UsersIcon,   label: "Users"                },
//   { to: "/admin/products-management",  icon: ProductIcon, label: "Products"             },
//   { to: "/admin/bean-milk-management", icon: BeanIcon,    label: "Beans & Milk"         },
//   { to: "/admin/orders-management",    icon: OrderIcon,   label: "Orders"               },
// ];

// export default function AdminSidebar({ isOpen, onClose }) {
//   const location = useLocation();

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@200;300;400&display=swap');

//         .sb-link { transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
//         .sb-link:hover { background: rgba(201,169,110,0.05); border-color: rgba(201,169,110,0.18); }
//         .sb-link:hover .sb-icon { color: #c9a96e; }
//         .sb-link:hover .sb-label { color: rgba(245,240,232,0.75); }

//         .sb-link.active { background: rgba(201,169,110,0.08); border-color: rgba(201,169,110,0.3); }
//         .sb-link.active .sb-icon  { color: #c9a96e; }
//         .sb-link.active .sb-label { color: #c9a96e; }

//         .sb-scroll::-webkit-scrollbar { width: 2px; }
//         .sb-scroll::-webkit-scrollbar-track { background: transparent; }
//         .sb-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.15); }
//       `}</style>

//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           onClick={onClose}
//           className="fixed inset-0 bg-black/65 z-30 lg:hidden backdrop-blur-sm"
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-40 w-56 flex flex-col
//           border-r border-[#c9a96e]/10 bg-[#0a0804]
//           transform transition-transform duration-300 ease-in-out
//           lg:translate-x-0 lg:static lg:inset-0
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//         style={{ fontFamily: "'Jost', sans-serif" }}
//       >
//         {/* Brand */}
//         <div className="px-5 py-5 border-b border-[#c9a96e]/10 flex-shrink-0">
//           <p className="text-[#c9a96e]/40 text-[8px] tracking-[0.5em] uppercase mb-1.5">Control Panel</p>
//           <h2
//             className="text-[#f5f0e8] font-light"
//             style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
//           >
//             Maison <span className="italic text-[#c9a96e]">Bean</span>
//           </h2>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto sb-scroll">
//           {menuItems.map((item) => {
//             const active = location.pathname === item.to;
//             return (
//               <Link
//                 key={item.to}
//                 to={item.to}
//                 onClick={onClose}
//                 className={`sb-link flex items-center gap-3 px-3 py-2.5 border text-left w-full ${active ? "active" : "border-transparent"}`}
//               >
//                 <span className={`sb-icon flex-shrink-0 transition-colors duration-200 ${active ? "text-[#c9a96e]" : "text-[#f5f0e8]/20"}`}>
//                   <item.icon />
//                 </span>
//                 <span className={`sb-label text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-200 ${active ? "text-[#c9a96e]" : "text-[#f5f0e8]/35"}`}>
//                   {item.label}
//                 </span>
//                 {active && (
//                   <div className="ml-auto w-1 h-1 rotate-45 bg-[#c9a96e] flex-shrink-0" />
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="px-5 py-4 border-t border-[#c9a96e]/08 flex-shrink-0">
//           <div className="flex items-center gap-2">
//             <div className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/20 to-transparent" />
//             <p className="text-[#f5f0e8]/12 text-[8px] tracking-[0.4em] uppercase">© 2026</p>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }




//=========================================================================================================



import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* ── Icons ── */
const DashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const UsersIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const ProductIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const BeanIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="12" rx="9" ry="6"/>
    <path d="M12 6 Q8 12 12 18"/><path d="M12 6 Q16 12 12 18"/>
  </svg>
);
const OrderIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const menuItems = [
  { to: "/admin/dashboard",            icon: DashIcon,    label: "Dashboard"    },
  { to: "/admin/users-management",     icon: UsersIcon,   label: "Users"        },
  { to: "/admin/products-management",  icon: ProductIcon, label: "Products"     },
  { to: "/admin/bean-milk-management", icon: BeanIcon,    label: "Beans & Milk" },
  { to: "/admin/orders-management",    icon: OrderIcon,   label: "Orders"       },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@200;300;400&display=swap');

        .sb-link { transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
        .sb-link:hover { background: rgba(201,169,110,0.06); border-color: rgba(201,169,110,0.22); }
        .sb-link:hover .sb-icon  { color: #c9a96e; }
        .sb-link:hover .sb-label { color: rgba(245,240,232,0.90); }

        .sb-link.active { background: rgba(201,169,110,0.09); border-color: rgba(201,169,110,0.32); }
        .sb-link.active .sb-icon  { color: #c9a96e; }
        .sb-link.active .sb-label { color: #c9a96e; }

        .sb-scroll::-webkit-scrollbar { width: 2px; }
        .sb-scroll::-webkit-scrollbar-track { background: transparent; }
        .sb-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.15); }
      `}</style>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/65 z-30 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-56 flex flex-col
          border-r border-[#c9a96e]/12 bg-[#0a0804]
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        {/* Brand */}
        <div className="px-5 py-5 border-b border-[#c9a96e]/12 flex-shrink-0">
          <p className="text-[#c9a96e]/60 text-[9px] tracking-[0.5em] uppercase mb-1.5">
            Control Panel
          </p>
          <h2
            className="text-[#f5f0e8] font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}
          >
            Maison <span className="italic text-[#c9a96e]">Bean</span>
          </h2>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto sb-scroll">
          {menuItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`sb-link flex items-center gap-3 px-3 py-2.5 border text-left w-full ${active ? "active" : "border-transparent"}`}
              >
                <span
                  className={`sb-icon flex-shrink-0 transition-colors duration-200 ${
                    active ? "text-[#c9a96e]" : "text-[#f5f0e8]/45"
                  }`}
                >
                  <item.icon />
                </span>
                <span
                  className={`sb-label text-[12px] tracking-[0.18em] uppercase transition-colors duration-200 ${
                    active ? "text-[#c9a96e]" : "text-[#f5f0e8]/60"
                  }`}
                  style={{ fontWeight: 300 }}
                >
                  {item.label}
                </span>
                {active && (
                  <div className="ml-auto w-1 h-1 rotate-45 bg-[#c9a96e] flex-shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#c9a96e]/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/25 to-transparent" />
            <p className="text-[#f5f0e8]/25 text-[9px] tracking-[0.4em] uppercase">© 2026</p>
          </div>
        </div>
      </aside>
    </>
  );
}