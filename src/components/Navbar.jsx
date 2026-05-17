// //-------------------------------------------------------------------------------------------------------------------------------
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useAuth } from "../context/AuthContext";
// import { useSearch } from "../context/SearchContext";
// import toast from "react-hot-toast";

// // ─────────────────────────────────────────────
// // Constants
// // ─────────────────────────────────────────────
// const NAV_LINKS = [
//   { label: "MENU",     href: "/menu"     },
//   { label: "STORY",    href: "/story"    },
//   { label: "SOURCING", href: "/sourcing" },
//   { label: "VISIT",    href: "/visit"    },
// ];

// // ─────────────────────────────────────────────
// // NavLink — single link with animated underline
// // ─────────────────────────────────────────────
// const NavLink = ({ href, label, isActive }) => (
//   <a
//     href={href}
//     className={`
//       relative pb-0.5 group
//       font-light text-[0.6rem] tracking-[0.3em] uppercase
//       transition-colors duration-300
//       ${isActive ? "text-[#c9a96e]" : "text-white/50 hover:text-[#c9a96e]"}
//     `}
//     style={{ fontFamily: "'Jost', sans-serif" }}
//   >
//     {label}
//     {/* Underline */}
//     <span
//       className={`
//         absolute bottom-0 left-0 w-full h-px bg-[#c9a96e]
//         transition-transform duration-300 origin-left
//         ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
//       `}
//     />
//   </a>
// );

// // ─────────────────────────────────────────────
// // IconButton — icon with optional badge count
// // ─────────────────────────────────────────────
// const IconButton = ({ icon, label, badge = 0, onClick }) => (
//   <button
//     onClick={onClick}
//     aria-label={label}
//     className="
//       relative w-10 h-10 flex items-center justify-center rounded
//       text-white/55 hover:text-[#c9a96e]
//       transition-colors duration-200
//       focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a96e]/40
//     "
//   >
//     <span className="material-symbols-outlined text-xl">{icon}</span>

//     {badge > 0 && (
//       <span className="
//         absolute top-1 right-1
//         min-w-[16px] h-4 px-1 rounded-full
//         bg-[#c9a96e] text-[#0d0a05] text-[0.58rem] font-medium
//         flex items-center justify-center leading-none
//       ">
//         {badge}
//       </span>
//     )}
//   </button>
// );

// // ─────────────────────────────────────────────
// // DropdownItem — button or anchor inside menu
// // ─────────────────────────────────────────────
// const DropdownItem = ({ icon, label, onClick, href, danger = false }) => {
//   const baseClass = `
//     w-full flex items-center gap-2.5 px-5 py-3
//     text-left text-[0.78rem] font-light tracking-wide
//     transition-colors duration-200 focus:outline-none
//     ${danger
//       ? "text-red-400/80 hover:bg-red-500/5 hover:text-red-400"
//       : "text-white/70 hover:bg-[#c9a96e]/5 hover:text-white"
//     }
//   `;

//   const content = (
//     <>
//       <span className="material-symbols-outlined text-base opacity-70">{icon}</span>
//       {label}
//     </>
//   );

//   return href ? (
//     <a href={href} className={baseClass} onClick={onClick}
//       style={{ fontFamily: "'Jost', sans-serif" }}>
//       {content}
//     </a>
//   ) : (
//     <button className={baseClass} onClick={onClick}
//       style={{ fontFamily: "'Jost', sans-serif" }}>
//       {content}
//     </button>
//   );
// };

// // ─────────────────────────────────────────────
// // NavSkeleton — loading placeholder
// // ─────────────────────────────────────────────
// const NavSkeleton = () => (
//   <nav className="
//     fixed top-0 inset-x-0 z-[9999] h-[72px]
//     flex items-center justify-between px-14
//     bg-[rgba(8,5,2,0.85)] backdrop-blur-xl
//   ">
//     <div className="w-40 h-5 bg-white/8 rounded animate-pulse" />
//     <div className="flex gap-10">
//       {[...Array(4)].map((_, i) => (
//         <div key={i} className="w-12 h-2.5 bg-white/6 rounded animate-pulse" />
//       ))}
//     </div>
//     <div className="w-28 h-2.5 bg-white/6 rounded animate-pulse" />
//   </nav>
// );

// // ─────────────────────────────────────────────
// // Navbar — main component
// // ─────────────────────────────────────────────
// const Navbar = () => {
//   const [scrolled,     setScrolled]     = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [mobileOpen,   setMobileOpen]   = useState(false);

//   const { openSearch, closeSearch }   = useSearch();
//   const { user, logout, isLoading }   = useAuth();
//   const { cartQuantity }              = useCart();
//   const { wishlistCount }             = useWishlist();

//   const navigate     = useNavigate();
//   const location     = useLocation();
//   const dropdownRef  = useRef(null);

//   // scroll detection
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // close dropdown on outside click
//   useEffect(() => {
//     if (!dropdownOpen) return;
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
//         setDropdownOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [dropdownOpen]);

//   // close everything on route change
//   useEffect(() => {
//     closeSearch();
//     setMobileOpen(false);
//     setDropdownOpen(false);
//   }, [location.pathname]);

//   // guarded navigation — requires auth + role
//   const guardNav = (path, label) => {

//   if (!user) {

//     toast.error(
//       `Please log in to view your ${label}`
//     );

//     navigate("/login");

//     return;
//   }

//   // ROLE CHECK
//   if (
//     user?.role
//       ?.toUpperCase() !==
//     "CUSTOMER"
//   ) {

//     toast.error("Access denied");

//     return;
//   }

//   navigate(path);
// };

//   const handleLogout = () => {
//     logout();
//     setDropdownOpen(false);
//     toast.success("Logged out successfully");
//   };

//   if (isLoading) return <NavSkeleton />;

// const isCustomer =
//   user?.role
//     ?.toUpperCase() ===
//   "CUSTOMER";

// const isAdmin =
//   user?.role
//     ?.toUpperCase() ===
//   "ADMIN";

//   return (
//     <>
//       {/* Fonts */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@200;300;400&display=swap');
//         @keyframes fadeSlideDown {
//           from { opacity: 0; transform: translateY(-8px); }
//           to   { opacity: 1; transform: translateY(0);    }
//         }
//         .animate-dropdown { animation: fadeSlideDown 0.2s ease forwards; }
//       `}</style>

//       {/* ── NAVBAR ROOT ── */}
//       <nav className={`
//         fixed top-0 inset-x-0 z-[9999] h-[72px]
//         transition-all duration-500
//         ${scrolled
//           ? "bg-[rgba(8,5,2,0.97)] backdrop-blur-xl border-b border-[#c9a96e]/12"
//           : "bg-transparent border-b border-transparent"
//         }
//       `}>
//         <div className="flex items-center justify-between h-full px-14 max-w-[1400px] mx-auto">

//           {/* ── LOGO ── */}
//           <a
//             href="/"
//             className="flex-shrink-0 text-[1.25rem] tracking-[0.55em] uppercase
//               text-[#f5f0e8] no-underline font-light relative z-10 h-full flex items-center px-10"
//             style={{ fontFamily: "'Cormorant Garamond', serif" }}
//           >
//             Maison <span className="text-[#c9a96e]">Bean</span>
//           </a>

          

//           {/* ── DESKTOP NAV LINKS (absolute centered) ── */}
//           <ul className="hidden md:flex items-center gap-12 list-none m-0 p-0
//             absolute left-1/2 -translate-x-1/2">
//             {NAV_LINKS.map(({ label, href }) => (
//               <li key={label}>
//                 <NavLink
//                   href={href}
//                   label={label}
//                   isActive={location.pathname === href}
//                 />
//               </li>
//             ))}
//           </ul>

//           {/* ── RIGHT ACTIONS ── */}
//           <div className="flex items-center gap-0.5 flex-shrink-0">

//             {/* Search */}
//             <IconButton icon="search" label="Search" onClick={openSearch} />

//             {/* Cart */}
//             <IconButton
//               icon="shopping_bag"
//               label="Cart"
//               badge={isCustomer ? cartQuantity : 0}
//               onClick={() => guardNav("/cart", "cart")}
//             />

//             {/* Wishlist */}
//             <IconButton
//               icon="favorite"
//               label="Wishlist"
//               badge={isCustomer ? wishlistCount : 0}
//               onClick={() => guardNav("/wishlist", "wishlist")}
//             />

//             {/* ── USER DROPDOWN ── */}
//             <div className="relative" ref={dropdownRef}>
//               <IconButton
//                 icon={user ? "account_circle" : "person"}
//                 label="Account"
//                 onClick={() => setDropdownOpen((v) => !v)}
//               />

//               {dropdownOpen && (
//                 <div className="
//                   animate-dropdown
//                   absolute right-0 top-[calc(100%+8px)] w-56
//                   bg-[#0d0a05] border border-[#c9a96e]/15
//                   shadow-[0_20px_60px_rgba(0,0,0,0.55)]
//                 ">
//                   {/* User info */}
//                   <div className="px-5 py-4 border-b border-[#c9a96e]/10">
//                     <p className="text-[0.85rem] font-light text-[#f5f0e8] m-0"
//                       style={{ fontFamily: "'Jost', sans-serif" }}>
//                       {user?.name || "Guest"}
//                     </p>
//                     {user?.email && (
//                       <p className="text-[0.7rem] text-[#c9a96e]/50 mt-0.5 m-0 truncate"
//                         style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200 }}>
//                         {user.email}
//                       </p>
//                     )}
//                   </div>

//                   {/* Menu items */}
//                   <div className="py-1.5">
//                     {isCustomer && (
//                       <>
//                         <DropdownItem
//                           icon="receipt_long"
//                           label="My Orders"
//                           onClick={() => { navigate("/orders");  setDropdownOpen(false); }}
//                         />
//                         <DropdownItem
//                           icon="account_circle"
//                           label="Profile"
//                           onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
//                         />
//                       </>
//                     )}

//                     {isAdmin && (
//                       <DropdownItem
//                         icon="admin_panel_settings"
//                         label="Admin Dashboard"
//                         onClick={() => { navigate("/admin/dashboard"); setDropdownOpen(false); }}
//                       />
//                     )}

//                     {/* Divider */}
//                     <div className="mx-5 my-1 h-px bg-[#c9a96e]/8" />

//                     {user ? (
//                       <DropdownItem
//                         icon="logout"
//                         label="Logout"
//                         onClick={handleLogout}
//                         danger
//                       />
//                     ) : (
//                       <DropdownItem
//                         icon="login"
//                         label="Login"
//                         href="/login"
//                         onClick={() => setDropdownOpen(false)}
//                       />
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Order Now CTA */}
//             {!isAdmin && (
//               <a
//                 href="/menu"
//                 className="
//                   hidden sm:inline-block ml-3 px-6 py-2.5
//                   text-[0.58rem] font-light tracking-[0.28em] uppercase
//                   text-[#0d0a05] bg-[#c9a96e]
//                   transition-all duration-300
//                   hover:bg-[#d4b87a] hover:tracking-[0.36em]
//                   focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]/40
//                 "
//                 style={{ fontFamily: "'Jost', sans-serif" }}
//               >
//                 Order Now
//               </a>
//             )}

//             {/* Mobile hamburger */}
//             <button
//               className="md:hidden ml-2 w-10 h-10 flex flex-col justify-center
//                 items-center gap-[5px] text-white/60 hover:text-[#c9a96e]
//                 transition-colors focus:outline-none"
//               onClick={() => setMobileOpen((v) => !v)}
//               aria-label="Toggle menu"
//             >
//               <span className={`block w-5 h-px bg-current transition-all duration-300
//                 origin-center ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
//               <span className={`block w-5 h-px bg-current transition-opacity duration-300
//                 ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
//               <span className={`block w-5 h-px bg-current transition-all duration-300
//                 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
//             </button>
//           </div>
//         </div>

//         {/* ── MOBILE MENU ── */}
//         <div className={`
//           md:hidden absolute inset-x-0 top-[72px]
//           bg-[rgba(8,5,2,0.98)] backdrop-blur-xl
//           border-b border-[#c9a96e]/10
//           overflow-hidden transition-all duration-300
//           ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}
//         `}>
//           <ul className="flex flex-col list-none m-0 p-0 py-2">
//             {NAV_LINKS.map(({ label, href }) => (
//               <li key={label}>
//                 <a
//                   href={href}
//                   className={`
//                     block px-8 py-3.5
//                     text-[0.65rem] font-light tracking-[0.3em] uppercase
//                     transition-colors duration-200
//                     ${location.pathname === href
//                       ? "text-[#c9a96e]"
//                       : "text-white/50 hover:text-[#c9a96e]"
//                     }
//                   `}
//                   style={{ fontFamily: "'Jost', sans-serif" }}
//                 >
//                   {label}
//                 </a>
//               </li>
//             ))}

//             {!isAdmin && (
//               <li className="px-8 py-3">
//                 <a
//                   href="/menu"
//                   className="
//                     block w-full text-center px-6 py-2.5
//                     text-[0.58rem] font-light tracking-[0.28em] uppercase
//                     text-[#0d0a05] bg-[#c9a96e]
//                     hover:bg-[#d4b87a] transition-colors duration-300
//                   "
//                   style={{ fontFamily: "'Jost', sans-serif" }}
//                 >
//                   Order Now
//                 </a>
//               </li>
//             )}
//           </ul>
//         </div>

//       </nav>
//     </>
//   );
// };

// export default Navbar;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import toast from "react-hot-toast";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const NAV_LINKS = [
  { label: "MENU",     href: "/menu"     },
  { label: "STORY",    href: "/story"    },
  { label: "SOURCING", href: "/sourcing" },
  { label: "VISIT",    href: "/visit"    },
];

// ─────────────────────────────────────────────
// NavLink
// ─────────────────────────────────────────────
const NavLink = ({ href, label, isActive }) => (
  <a
    href={href}
    className={`
      relative pb-0.5 group
      font-light text-[0.6rem] tracking-[0.3em] uppercase
      transition-colors duration-300
      ${isActive ? "text-[#c9a96e]" : "text-white/50 hover:text-[#c9a96e]"}
    `}
    style={{ fontFamily: "'Jost', sans-serif" }}
  >
    {label}
    <span
      className={`
        absolute bottom-0 left-0 w-full h-px bg-[#c9a96e]
        transition-transform duration-300 origin-left
        ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
      `}
    />
  </a>
);

// ─────────────────────────────────────────────
// IconButton
// ─────────────────────────────────────────────
const IconButton = ({ icon, label, badge = 0, onClick }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="
      relative w-9 h-9 flex items-center justify-center
      text-white/55 hover:text-[#c9a96e]
      transition-colors duration-200
      focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a96e]/40
    "
  >
    <span className="material-symbols-outlined text-[1.15rem]">{icon}</span>
    {badge > 0 && (
      <span className="
        absolute top-1 right-1
        min-w-[15px] h-[15px] px-1 rounded-full
        bg-[#c9a96e] text-[#0d0a05] text-[0.5rem] font-semibold
        flex items-center justify-center leading-none
      ">
        {badge}
      </span>
    )}
  </button>
);

// ─────────────────────────────────────────────
// DropdownItem
// ─────────────────────────────────────────────
const DropdownItem = ({ icon, label, onClick, href, danger = false }) => {
  const baseClass = `
    w-full flex items-center gap-2.5 px-5 py-3
    text-left text-[0.75rem] font-light tracking-wide
    transition-colors duration-200 focus:outline-none
    ${danger
      ? "text-red-400/80 hover:bg-red-500/5 hover:text-red-400"
      : "text-white/65 hover:bg-[#c9a96e]/5 hover:text-white"
    }
  `;
  const content = (
    <>
      <span className="material-symbols-outlined text-[1rem] opacity-60">{icon}</span>
      {label}
    </>
  );
  return href ? (
    <a href={href} className={baseClass} onClick={onClick} style={{ fontFamily: "'Jost', sans-serif" }}>
      {content}
    </a>
  ) : (
    <button className={baseClass} onClick={onClick} style={{ fontFamily: "'Jost', sans-serif" }}>
      {content}
    </button>
  );
};

// ─────────────────────────────────────────────
// NavSkeleton
// ─────────────────────────────────────────────
const NavSkeleton = () => (
  <nav className="fixed top-0 inset-x-0 z-[9999] h-[64px] flex items-center justify-between px-5 sm:px-10 lg:px-14 bg-[rgba(8,5,2,0.85)] backdrop-blur-xl">
    <div className="w-32 h-4 bg-white/8 rounded animate-pulse" />
    <div className="hidden lg:flex gap-10">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-12 h-2 bg-white/6 rounded animate-pulse" />
      ))}
    </div>
    <div className="w-24 h-2 bg-white/6 rounded animate-pulse" />
  </nav>
);

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────
const Navbar = () => {
  const [scrolled,     setScrolled]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);

  const { openSearch, closeSearch } = useSearch();
  const { user, logout, isLoading } = useAuth();
  const { cartQuantity }            = useCart();
  const { wishlistCount }           = useWishlist();

  const navigate    = useNavigate();
  const location    = useLocation();
  const dropdownRef = useRef(null);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  // Close everything on route change
  useEffect(() => {
    closeSearch();
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const guardNav = (path, label) => {
    if (!user) {
      toast.error(`Please log in to view your ${label}`);
      navigate("/login");
      return;
    }
    if (user?.role?.toUpperCase() !== "CUSTOMER") {
      toast.error("Access denied");
      return;
    }
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    toast.success("Logged out successfully");
  };

  if (isLoading) return <NavSkeleton />;

  const isCustomer = user?.role?.toUpperCase() === "CUSTOMER";
  const isAdmin    = user?.role?.toUpperCase() === "ADMIN";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@200;300;400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-dropdown { animation: fadeSlideDown 0.18s ease forwards; }

        @keyframes mobileSlideIn {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .mobile-slide-in { animation: mobileSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

        /* Prevent text selection on hamburger */
        .hamburger-btn { user-select: none; -webkit-tap-highlight-color: transparent; }

        /* Smooth pill underline on mobile links */
        .mob-link { position: relative; }
        .mob-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 1.5rem; right: 1.5rem;
          height: 1px;
          background: rgba(201,169,110,0.08);
        }
        .mob-link:last-child::after { display: none; }
      `}</style>

      {/* ── NAVBAR ROOT ── */}
      <nav className={`
        fixed top-0 inset-x-0 z-[9999]
        h-[60px] sm:h-[64px] lg:h-[70px]
        transition-all duration-500
        ${scrolled
          ? "bg-[rgba(8,5,2,0.97)] backdrop-blur-xl border-b border-[#c9a96e]/12 shadow-[0_4px_40px_rgba(0,0,0,0.4)]"
          : "bg-gradient-to-b from-[rgba(8,5,2,0.7)] to-transparent backdrop-blur-[2px]"
        }
      `}>
        <div className="
          h-full w-full
          px-4 sm:px-8 lg:px-14
          max-w-[1400px] mx-auto
          flex items-center justify-between
          gap-4
        ">

          {/* ── LOGO ── */}
          <a
            href="/"
            className="
              flex-shrink-0
              text-[0.95rem] sm:text-[1.05rem] lg:text-[1.2rem]
              tracking-[0.4em] sm:tracking-[0.48em] lg:tracking-[0.55em]
              uppercase text-[#f5f0e8] no-underline font-light
              whitespace-nowrap transition-opacity duration-200 hover:opacity-80
            "
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Maison&nbsp;<span className="text-[#c9a96e]">Bean</span>
          </a>

          {/* ── DESKTOP NAV (centered, only lg+) ── */}
          <ul className="
            hidden lg:flex items-center justify-center
            flex-1 gap-8 xl:gap-12 list-none m-0 p-0
          ">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <NavLink href={href} label={label} isActive={location.pathname === href} />
              </li>
            ))}
          </ul>

          {/* ── RIGHT ACTIONS ── */}
          <div className="flex items-center gap-0 flex-shrink-0">

            {/* Search — always visible */}
            <IconButton icon="search" label="Search" onClick={openSearch} />

            {/* Cart — hidden on xs, visible sm+ */}
            <span className="hidden sm:block">
              <IconButton
                icon="shopping_bag"
                label="Cart"
                badge={isCustomer ? cartQuantity : 0}
                onClick={() => guardNav("/cart", "cart")}
              />
            </span>

            {/* Wishlist — hidden on xs and sm, visible md+ */}
            <span className="hidden md:block">
              <IconButton
                icon="favorite"
                label="Wishlist"
                badge={isCustomer ? wishlistCount : 0}
                onClick={() => guardNav("/wishlist", "wishlist")}
              />
            </span>

            {/* ── USER ACCOUNT DROPDOWN ── */}
            <div className="relative" ref={dropdownRef}>
              <IconButton
                icon={user ? "account_circle" : "person"}
                label="Account"
                onClick={() => setDropdownOpen((v) => !v)}
              />

              {dropdownOpen && (
                <div className="
                  nav-dropdown
                  absolute right-0 top-[calc(100%+10px)] w-[200px] sm:w-[220px]
                  bg-[#0d0a05] border border-[#c9a96e]/15
                  shadow-[0_24px_64px_rgba(0,0,0,0.6)]
                  z-50 overflow-hidden
                ">
                  {/* User info */}
                  <div className="px-5 py-4 border-b border-[#c9a96e]/10">
                    <p
                      className="text-[0.82rem] font-light text-[#f5f0e8] m-0 truncate"
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      {user?.name || "Guest"}
                    </p>
                    {user?.email && (
                      <p
                        className="text-[0.68rem] text-[#c9a96e]/50 mt-0.5 m-0 truncate"
                        style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200 }}
                      >
                        {user.email}
                      </p>
                    )}
                  </div>

                  <div className="py-1.5">
                    {isCustomer && (
                      <>
                        {/* Cart & Wishlist inside dropdown on small screens */}
                        <div className="sm:hidden">
                          <DropdownItem
                            icon="shopping_bag"
                            label={`Cart${cartQuantity > 0 ? ` (${cartQuantity})` : ""}`}
                            onClick={() => { guardNav("/cart", "cart"); setDropdownOpen(false); }}
                          />
                        </div>
                        <div className="md:hidden">
                          <DropdownItem
                            icon="favorite"
                            label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount})` : ""}`}
                            onClick={() => { guardNav("/wishlist", "wishlist"); setDropdownOpen(false); }}
                          />
                        </div>
                        <div className="hidden sm:block md:hidden h-px mx-5 my-1 bg-[#c9a96e]/8" />

                        <DropdownItem
                          icon="receipt_long"
                          label="My Orders"
                          onClick={() => { navigate("/orders"); setDropdownOpen(false); }}
                        />
                        <DropdownItem
                          icon="account_circle"
                          label="Profile"
                          onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
                        />
                      </>
                    )}

                    {isAdmin && (
                      <DropdownItem
                        icon="admin_panel_settings"
                        label="Admin Dashboard"
                        onClick={() => { navigate("/admin/dashboard"); setDropdownOpen(false); }}
                      />
                    )}

                    <div className="mx-5 my-1 h-px bg-[#c9a96e]/8" />

                    {user ? (
                      <DropdownItem icon="logout" label="Logout" onClick={handleLogout} danger />
                    ) : (
                      <DropdownItem icon="login" label="Login" href="/login" onClick={() => setDropdownOpen(false)} />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Order Now CTA — only xl+ */}
            {!isAdmin && (
              <a
                href="/menu"
                className="
                  hidden xl:inline-block ml-3 px-5 py-2
                  text-[0.58rem] font-light tracking-[0.28em] uppercase
                  text-[#0d0a05] bg-[#c9a96e]
                  transition-all duration-300
                  hover:bg-[#d4b87a] hover:tracking-[0.36em]
                  focus:outline-none
                  whitespace-nowrap
                "
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Order Now
              </a>
            )}

            {/* ── HAMBURGER (below lg) ── */}
            <button
              className="hamburger-btn lg:hidden ml-1 w-9 h-9 flex flex-col justify-center items-center gap-[5px] text-white/55 hover:text-[#c9a96e] transition-colors focus:outline-none"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className={`block h-px bg-current transition-all duration-300 origin-center ${mobileOpen ? "w-5 rotate-45 translate-y-[5px]" : "w-5"}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "w-0 opacity-0" : "w-4 opacity-100"}`} />
              <span className={`block h-px bg-current transition-all duration-300 origin-center ${mobileOpen ? "w-5 -rotate-45 -translate-y-[5px]" : "w-5"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE OVERLAY ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── MOBILE MENU PANEL (slide from right) ── */}
      <div className={`
        lg:hidden fixed top-0 right-0 bottom-0 z-[9999]
        w-[min(280px,85vw)] bg-[#0d0a05]
        border-l border-[#c9a96e]/10
        flex flex-col
        transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        shadow-[-20px_0_60px_rgba(0,0,0,0.5)]
      `}>

        {/* Mobile menu header */}
        <div className="flex items-center justify-between px-6 h-[60px] sm:h-[64px] border-b border-[#c9a96e]/10 flex-shrink-0">
          <a
            href="/"
            className="text-[0.9rem] tracking-[0.45em] uppercase text-[#f5f0e8] no-underline font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            onClick={() => setMobileOpen(false)}
          >
            Maison&nbsp;<span className="text-[#c9a96e]">Bean</span>
          </a>
          <button
            className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-[#c9a96e] transition-colors focus:outline-none"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-[1.1rem]">close</span>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-6 pt-6 pb-4 gap-0 border-b border-[#c9a96e]/08">
          <p
            className="text-[8px] tracking-[0.5em] uppercase text-[#c9a96e]/35 mb-4"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Navigate
          </p>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`
                py-3 text-[0.7rem] font-light tracking-[0.3em] uppercase
                border-b border-[#c9a96e]/06 last:border-0
                transition-colors duration-200
                ${location.pathname === href ? "text-[#c9a96e]" : "text-white/45 hover:text-[#c9a96e]"}
              `}
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Quick actions */}
        {isCustomer && (
          <div className="flex flex-col px-6 pt-5 pb-4 gap-0 border-b border-[#c9a96e]/08">
            <p
              className="text-[8px] tracking-[0.5em] uppercase text-[#c9a96e]/35 mb-4"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Quick Access
            </p>
            <button
              onClick={() => { guardNav("/cart", "cart"); setMobileOpen(false); }}
              className="flex items-center justify-between py-3 text-[0.7rem] font-light tracking-[0.15em] text-white/50 hover:text-[#c9a96e] transition-colors border-b border-[#c9a96e]/06"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              <span className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[1rem] opacity-60">shopping_bag</span>
                Cart
              </span>
              {cartQuantity > 0 && (
                <span className="min-w-[20px] h-5 px-1.5 bg-[#c9a96e]/15 text-[#c9a96e] text-[9px] flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </button>
            <button
              onClick={() => { guardNav("/wishlist", "wishlist"); setMobileOpen(false); }}
              className="flex items-center justify-between py-3 text-[0.7rem] font-light tracking-[0.15em] text-white/50 hover:text-[#c9a96e] transition-colors border-b border-[#c9a96e]/06"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              <span className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[1rem] opacity-60">favorite</span>
                Wishlist
              </span>
              {wishlistCount > 0 && (
                <span className="min-w-[20px] h-5 px-1.5 bg-[#c9a96e]/15 text-[#c9a96e] text-[9px] flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => { navigate("/orders"); setMobileOpen(false); }}
              className="flex items-center gap-3 py-3 text-[0.7rem] font-light tracking-[0.15em] text-white/50 hover:text-[#c9a96e] transition-colors border-b border-[#c9a96e]/06"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              <span className="material-symbols-outlined text-[1rem] opacity-60">receipt_long</span>
              My Orders
            </button>
            <button
              onClick={() => { navigate("/profile"); setMobileOpen(false); }}
              className="flex items-center gap-3 py-3 text-[0.7rem] font-light tracking-[0.15em] text-white/50 hover:text-[#c9a96e] transition-colors"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              <span className="material-symbols-outlined text-[1rem] opacity-60">account_circle</span>
              Profile
            </button>
          </div>
        )}

        {isAdmin && (
          <div className="flex flex-col px-6 pt-5 pb-4 border-b border-[#c9a96e]/08">
            <button
              onClick={() => { navigate("/admin/dashboard"); setMobileOpen(false); }}
              className="flex items-center gap-3 py-3 text-[0.7rem] font-light tracking-[0.15em] text-white/50 hover:text-[#c9a96e] transition-colors"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              <span className="material-symbols-outlined text-[1rem] opacity-60">admin_panel_settings</span>
              Admin Dashboard
            </button>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom: CTA + auth */}
        <div className="px-6 pb-8 pt-4 flex flex-col gap-3 border-t border-[#c9a96e]/08">
          {!isAdmin && (
            <a
              href="/menu"
              onClick={() => setMobileOpen(false)}
              className="
                block w-full text-center py-3.5
                text-[0.6rem] font-light tracking-[0.3em] uppercase
                text-[#0d0a05] bg-[#c9a96e] hover:bg-[#d4b87a]
                transition-colors duration-300
              "
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Order Now
            </a>
          )}

          {user ? (
            <button
              onClick={() => { handleLogout(); setMobileOpen(false); }}
              className="
                w-full py-3 text-[0.6rem] font-light tracking-[0.25em] uppercase
                text-red-400/60 hover:text-red-400
                border border-red-400/10 hover:border-red-400/25
                transition-all duration-200 flex items-center justify-center gap-2
              "
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              <span className="material-symbols-outlined text-[0.9rem]">logout</span>
              Logout
            </button>
          ) : (
            <a
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="
                block w-full text-center py-3
                text-[0.6rem] font-light tracking-[0.25em] uppercase
                text-[#c9a96e]/60 hover:text-[#c9a96e]
                border border-[#c9a96e]/15 hover:border-[#c9a96e]/35
                transition-all duration-200
              "
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Login
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;