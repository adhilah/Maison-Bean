// import { useAuth } from "../../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function AdminNavbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <header
//       className="h-16 flex items-center justify-between px-6 border-b border-[#1f1f1f] flex-shrink-0 sticky top-0 z-40"
//       style={{ background: "#0a0a0a" }}
//     >
//       {/* LEFT */}
//       <div className="flex items-center gap-3">
//         {/* Logo dot */}
//         <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />
//         <h1
//           className="text-[15px] font-medium text-[#f0ece4] tracking-wide"
//           style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
//         >
//           Maison Bean
//           <span className="text-[#c9a96e] ml-1.5 text-[13px] font-normal tracking-widest uppercase"
//             style={{ fontFamily: "'DM Sans', sans-serif" }}
//           >
//             ✦ Admin
//           </span>
//         </h1>
//       </div>

//       {/* RIGHT */}
//       <div className="flex items-center gap-4">

//         {/* User pill */}
//         {user?.email && (
//           <div className="hidden sm:flex items-center gap-2 bg-[#141414] border border-[#2b2b2b] rounded-full px-3.5 py-1.5">
//             <div className="w-5 h-5 rounded-full bg-[#7a5c2e] flex items-center justify-center text-[10px] text-[#f5e8c8] font-medium uppercase">
//               {user.email[0]}
//             </div>
//             <span className="text-[12px] text-[#8a8680]">{user.email}</span>
//           </div>
//         )}

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] text-[#8a8680] border border-[#1f1f1f] hover:border-[#c9a96e] hover:text-[#c9a96e] hover:bg-[#1a1500] transition-all duration-200 cursor-pointer"
//           style={{ background: "#111111" }}
//         >
//           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//             <polyline points="16 17 21 12 16 7" />
//             <line x1="21" y1="12" x2="9" y2="12" />
//           </svg>
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }


import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LogoutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function AdminNavbar({ onMenuToggle, sidebarOpen }) {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const [hovering, setHovering] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@200;300;400&display=swap');
        .nav-logout { transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
        .nav-logout:hover { background: rgba(201,169,110,0.08); border-color: rgba(201,169,110,0.45); color: #c9a96e; }
        .nav-ham span { transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease; }
      `}</style>

      <header
        className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-[#c9a96e]/10 flex-shrink-0 sticky top-0 z-40 bg-[#0a0804]"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        {/* ── LEFT ── */}
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            onClick={onMenuToggle}
            className="nav-ham lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] flex-shrink-0"
            aria-label="Toggle menu"
          >
            <span className={`block h-px bg-[#c9a96e] ${sidebarOpen ? "w-5 translate-y-[6px] rotate-45" : "w-5"}`} />
            <span className={`block h-px bg-[#c9a96e] ${sidebarOpen ? "opacity-0 w-0" : "w-4"}`} />
            <span className={`block h-px bg-[#c9a96e] ${sidebarOpen ? "w-5 -translate-y-[6px] -rotate-45" : "w-5"}`} />
          </button>

          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-[5px] h-[5px] rotate-45 bg-[#c9a96e] flex-shrink-0" />
            <h1
              className="text-[#f5f0e8] font-light tracking-[0.12em]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
            >
              Maison <span className="italic text-[#c9a96e]">Bean</span>
            </h1>
            <span className="hidden sm:block text-[8px] tracking-[0.5em] uppercase text-[#c9a96e]/40 font-light ml-1 mt-0.5">
              Admin
            </span>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex items-center gap-3">
          {/* User pill */}
          {user?.email && (
            <div className="hidden sm:flex items-center gap-2 border border-[#c9a96e]/12 px-3 py-1.5 bg-[#110d07]">
              <div
                className="w-5 h-5 flex items-center justify-center border border-[#c9a96e]/25 bg-[#c9a96e]/10 text-[#c9a96e] flex-shrink-0"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem" }}
              >
                {user.email[0].toUpperCase()}
              </div>
              <span className="text-[11px] text-[#f5f0e8]/40 tracking-wide max-w-[160px] truncate">
                {user.email}
              </span>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="nav-logout flex items-center gap-2 px-3 sm:px-4 py-2 border border-[#c9a96e]/15 text-[#f5f0e8]/40 text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            <LogoutIcon />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>
    </>
  );
}