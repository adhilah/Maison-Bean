// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useAuth } from "../context/AuthContext";
// import { useSearch } from "../context/SearchContext";
// import SearchModal from "./SearchResult";
// import ProductModal from "./cards/ProductModal";
// import toast from "react-hot-toast";

// /* ================= LOGO ================= */
// function Logo() {
//   return (
//     <div
//       className="text-xl md:text-2xl font-bold text-[#6c5225] cursor-pointer whitespace-nowrap"
//       onClick={() => (window.location.href = "/")}
//     >
//       Maison Bean
//     </div>
//   );
// }

// /* ================= SEARCH BAR ================= */
// const SearchBar = () => {
//   const { openSearch } = useSearch();

//   return (
//     <div className="flex-1 mx-2 sm:mx-4 max-w-full sm:max-w-md md:max-w-2xl">
//       <button
//         onClick={openSearch}
//         className="w-full px-3 sm:px-5 py-2 sm:py-3 bg-white border border-gray-300 rounded-full text-left text-gray-600 hover:border-[#9c7635] transition flex items-center gap-2 sm:gap-3"
//       >
//         <span className="material-symbols-outlined text-xl sm:text-2xl">
//           search
//         </span>
//         <span className="hidden sm:inline text-sm sm:text-base truncate">
//           Search coffee, croissant...
//         </span>
//       </button>
//     </div>
//   );
// };

// /* ================= ICON WITH BADGE ================= */
// function IconWithBadge({ iconName, badgeCount, onClick }) {
//   return (
//     <button onClick={onClick} className="relative p-1">
//       <span className="material-symbols-outlined text-2xl md:text-3xl text-gray-700">
//         {iconName}
//       </span>
//       {badgeCount > 0 && (
//         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//           {badgeCount > 99 ? "99+" : badgeCount}
//         </span>
//       )}
//     </button>
//   );
// }

// /* ================= USER DROPDOWN ================= */
// function UserDropdown({ isOpen, onClose, user, logout }) {
//   const navigate = useNavigate();

//   if (!isOpen) return null;

//   return (
//     <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-xl ring-1 ring-black/10 z-[9999] overflow-hidden">
//       <div className="px-4 py-3 border-b border-gray-200">
//         <p className="font-semibold text-gray-800 truncate">
//           {user?.name || "Guest"}
//         </p>
//         {user?.email && (
//           <p className="text-sm text-gray-500 truncate">{user.email}</p>
//         )}
//       </div>

//       <div className="py-2">
//         {/* Customer-only links */}
//         {user?.role === "customer" && (
//           <>
//             <button
//               onClick={() => {
//                 navigate("/orders");
//                 onClose();
//               }}
//               className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
//             >
//               <span className="material-symbols-outlined text-gray-600">
//                 receipt_long
//               </span>
//               <span>My Orders</span>
//             </button>

//             <button
//               onClick={() => {
//                 navigate("/profile");
//                 onClose();
//               }}
//               className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
//             >
//               <span className="material-symbols-outlined text-gray-600">
//                 account_circle
//               </span>
//               <span>Profile</span>
//             </button>
//           </>
//         )}

//         {/* Admin link */}
//         {user?.role === "admin" && (
//           <button
//             onClick={() => {
//               navigate("/admin/dashboard");
//               onClose();
//             }}
//             className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
//           >
//             <span className="material-symbols-outlined text-gray-600">
//               admin_panel_settings
//             </span>
//             <span>Admin Dashboard</span>
//           </button>
//         )}

//         {/* Logout / Login */}
//         {user ? (
//           <button
//             onClick={() => {
//               logout();
//               onClose();
//               toast.success("Logged out successfully");
//             }}
//             className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
//           >
//             <span className="material-symbols-outlined">logout</span>
//             <span>Logout</span>
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               navigate("/login");
//               onClose();
//             }}
//             className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
//           >
//             <span className="material-symbols-outlined">login</span>
//             <span>Login</span>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= MAIN NAVBAR ================= */
// function Navbar() {
//   const navigate = useNavigate();
//   const { user, logout, isLoading } = useAuth(); // ← Fully using AuthContext
//   const { cartQuantity } = useCart();
//   const { wishlistCount } = useWishlist();
//   const { isSearchOpen, selectedProduct, setSelectedProduct } = useSearch();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [products, setProducts] = useState([]);

//   const dropdownRef = useRef(null);

//   // Fetch products when search modal opens
//   useEffect(() => {
//     if (isSearchOpen) {
//       fetch("http://localhost:3000/products")
//         .then((res) => res.json())
//         .then((data) => setProducts(data))
//         .catch((err) => console.error("Failed to fetch products for search:", err));
//     }
//   }, [isSearchOpen]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isDropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isDropdownOpen]);

//   // Handle cart click
//   const handleCartClick = () => {
//     if (!user) {
//       toast.error("Please log in to view your cart");
//       navigate("/login");
//       return;
//     }
//     if (user.role !== "customer") {
//       toast.error("Access denied");
//       return;
//     }
//     navigate("/cart");
//   };

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     if (!user) {
//       toast.error("Please log in to view your wishlist");
//       navigate("/login");
//       return;
//     }
//     if (user.role !== "customer") {
//       toast.error("Access denied");
//       return;
//     }
//     navigate("/wishlist");
//   };

//   // Show loading skeleton if auth is loading
//   if (isLoading) {
//     return (
//       <>
//         <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/70 backdrop-blur-md shadow">
//           <div className="max-w-7xl mx-auto px-4 md:px-6">
//             <div className="flex items-center justify-between h-16">
//               <Logo />
//               <div className="w-32 h-10 bg-gray-200 rounded-full animate-pulse" />
//               <div className="flex items-center gap-6">
//                 <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
//                 <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
//                 <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
//               </div>
//             </div>
//           </div>
//         </nav>
//         <div className="h-16" />
//       </>
//     );
//   }

//   return (
//     <>
//       {/* Fixed Navbar */}
//       <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/70 backdrop-blur-md shadow">
//         <div className="max-w-7xl mx-auto px-4 md:px-6">
//           <div className="flex items-center justify-between h-16">
//             <Logo />

//             <SearchBar />

//             <div className="flex items-center gap-4 md:gap-6">
//               {/* Cart Icon */}
//               <IconWithBadge
//                 iconName="shopping_cart"
//                 badgeCount={user?.role === "customer" ? cartQuantity : 0}
//                 onClick={handleCartClick}
//               />

//               {/* Wishlist Icon */}
//               <IconWithBadge
//                 iconName="favorite"
//                 badgeCount={user?.role === "customer" ? wishlistCount : 0}
//                 onClick={handleWishlistClick}
//               />

//               {/* User Menu */}
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setIsDropdownOpen((prev) => !prev)}
//                   className="p-1 rounded-lg hover:bg-gray-100 transition"
//                 >
//                   <span className="material-symbols-outlined text-2xl md:text-3xl text-gray-700">
//                     {user ? "account_circle" : "more_vert"}
//                   </span>
//                 </button>

//                 <UserDropdown
//                   isOpen={isDropdownOpen}
//                   onClose={() => setIsDropdownOpen(false)}
//                   user={user}
//                   logout={logout}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Spacer for fixed navbar */}
//       <div className="h-16" />

//       {/* Search Modal */}
//       {isSearchOpen && <SearchModal products={products} />}

//       {/* Product Detail Modal */}
//       {selectedProduct && (
//         <ProductModal
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//         />
//       )}
//     </>
//   );
// }

// export default Navbar;


//-------------------------------------------------------------------------------------------------------------------------------
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
// NavLink — single link with animated underline
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
    {/* Underline */}
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
// IconButton — icon with optional badge count
// ─────────────────────────────────────────────
const IconButton = ({ icon, label, badge = 0, onClick }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="
      relative w-10 h-10 flex items-center justify-center rounded
      text-white/55 hover:text-[#c9a96e]
      transition-colors duration-200
      focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a96e]/40
    "
  >
    <span className="material-symbols-outlined text-xl">{icon}</span>

    {badge > 0 && (
      <span className="
        absolute top-1 right-1
        min-w-[16px] h-4 px-1 rounded-full
        bg-[#c9a96e] text-[#0d0a05] text-[0.58rem] font-medium
        flex items-center justify-center leading-none
      ">
        {badge}
      </span>
    )}
  </button>
);

// ─────────────────────────────────────────────
// DropdownItem — button or anchor inside menu
// ─────────────────────────────────────────────
const DropdownItem = ({ icon, label, onClick, href, danger = false }) => {
  const baseClass = `
    w-full flex items-center gap-2.5 px-5 py-3
    text-left text-[0.78rem] font-light tracking-wide
    transition-colors duration-200 focus:outline-none
    ${danger
      ? "text-red-400/80 hover:bg-red-500/5 hover:text-red-400"
      : "text-white/70 hover:bg-[#c9a96e]/5 hover:text-white"
    }
  `;

  const content = (
    <>
      <span className="material-symbols-outlined text-base opacity-70">{icon}</span>
      {label}
    </>
  );

  return href ? (
    <a href={href} className={baseClass} onClick={onClick}
      style={{ fontFamily: "'Jost', sans-serif" }}>
      {content}
    </a>
  ) : (
    <button className={baseClass} onClick={onClick}
      style={{ fontFamily: "'Jost', sans-serif" }}>
      {content}
    </button>
  );
};

// ─────────────────────────────────────────────
// NavSkeleton — loading placeholder
// ─────────────────────────────────────────────
const NavSkeleton = () => (
  <nav className="
    fixed top-0 inset-x-0 z-[9999] h-[72px]
    flex items-center justify-between px-14
    bg-[rgba(8,5,2,0.85)] backdrop-blur-xl
  ">
    <div className="w-40 h-5 bg-white/8 rounded animate-pulse" />
    <div className="flex gap-10">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-12 h-2.5 bg-white/6 rounded animate-pulse" />
      ))}
    </div>
    <div className="w-28 h-2.5 bg-white/6 rounded animate-pulse" />
  </nav>
);

// ─────────────────────────────────────────────
// Navbar — main component
// ─────────────────────────────────────────────
const Navbar = () => {
  const [scrolled,     setScrolled]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);

  const { openSearch, closeSearch }   = useSearch();
  const { user, logout, isLoading }   = useAuth();
  const { cartQuantity }              = useCart();
  const { wishlistCount }             = useWishlist();

  const navigate     = useNavigate();
  const location     = useLocation();
  const dropdownRef  = useRef(null);

  // scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  // close everything on route change
  useEffect(() => {
    closeSearch();
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // guarded navigation — requires auth + role
  const guardNav = (path, label) => {
    if (!user) {
      toast.error(`Please log in to view your ${label}`);
      navigate("/login");
      return;
    }
    if (user.role !== "customer") {
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

  const isCustomer = user?.role === "customer";
  const isAdmin    = user?.role === "admin";

  return (
    <>
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@200;300;400&display=swap');
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .animate-dropdown { animation: fadeSlideDown 0.2s ease forwards; }
      `}</style>

      {/* ── NAVBAR ROOT ── */}
      <nav className={`
        fixed top-0 inset-x-0 z-[9999] h-[72px]
        transition-all duration-500
        ${scrolled
          ? "bg-[rgba(8,5,2,0.97)] backdrop-blur-xl border-b border-[#c9a96e]/12"
          : "bg-transparent border-b border-transparent"
        }
      `}>
        <div className="flex items-center justify-between h-full px-14 max-w-[1400px] mx-auto">

          {/* ── LOGO ── */}
          <a
            href="/"
            className="flex-shrink-0 text-[1.25rem] tracking-[0.55em] uppercase
              text-[#f5f0e8] no-underline font-light relative z-10 h-full flex items-center px-10"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Maison <span className="text-[#c9a96e]">Bean</span>
          </a>

          

          {/* ── DESKTOP NAV LINKS (absolute centered) ── */}
          <ul className="hidden md:flex items-center gap-12 list-none m-0 p-0
            absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <NavLink
                  href={href}
                  label={label}
                  isActive={location.pathname === href}
                />
              </li>
            ))}
          </ul>

          {/* ── RIGHT ACTIONS ── */}
          <div className="flex items-center gap-0.5 flex-shrink-0">

            {/* Search */}
            <IconButton icon="search" label="Search" onClick={openSearch} />

            {/* Cart */}
            <IconButton
              icon="shopping_bag"
              label="Cart"
              badge={isCustomer ? cartQuantity : 0}
              onClick={() => guardNav("/cart", "cart")}
            />

            {/* Wishlist */}
            <IconButton
              icon="favorite"
              label="Wishlist"
              badge={isCustomer ? wishlistCount : 0}
              onClick={() => guardNav("/wishlist", "wishlist")}
            />

            {/* ── USER DROPDOWN ── */}
            <div className="relative" ref={dropdownRef}>
              <IconButton
                icon={user ? "account_circle" : "person"}
                label="Account"
                onClick={() => setDropdownOpen((v) => !v)}
              />

              {dropdownOpen && (
                <div className="
                  animate-dropdown
                  absolute right-0 top-[calc(100%+8px)] w-56
                  bg-[#0d0a05] border border-[#c9a96e]/15
                  shadow-[0_20px_60px_rgba(0,0,0,0.55)]
                ">
                  {/* User info */}
                  <div className="px-5 py-4 border-b border-[#c9a96e]/10">
                    <p className="text-[0.85rem] font-light text-[#f5f0e8] m-0"
                      style={{ fontFamily: "'Jost', sans-serif" }}>
                      {user?.name || "Guest"}
                    </p>
                    {user?.email && (
                      <p className="text-[0.7rem] text-[#c9a96e]/50 mt-0.5 m-0 truncate"
                        style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200 }}>
                        {user.email}
                      </p>
                    )}
                  </div>

                  {/* Menu items */}
                  <div className="py-1.5">
                    {isCustomer && (
                      <>
                        <DropdownItem
                          icon="receipt_long"
                          label="My Orders"
                          onClick={() => { navigate("/orders");  setDropdownOpen(false); }}
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

                    {/* Divider */}
                    <div className="mx-5 my-1 h-px bg-[#c9a96e]/8" />

                    {user ? (
                      <DropdownItem
                        icon="logout"
                        label="Logout"
                        onClick={handleLogout}
                        danger
                      />
                    ) : (
                      <DropdownItem
                        icon="login"
                        label="Login"
                        href="/login"
                        onClick={() => setDropdownOpen(false)}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Order Now CTA */}
            {!isAdmin && (
              <a
                href="/menu"
                className="
                  hidden sm:inline-block ml-3 px-6 py-2.5
                  text-[0.58rem] font-light tracking-[0.28em] uppercase
                  text-[#0d0a05] bg-[#c9a96e]
                  transition-all duration-300
                  hover:bg-[#d4b87a] hover:tracking-[0.36em]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]/40
                "
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Order Now
              </a>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden ml-2 w-10 h-10 flex flex-col justify-center
                items-center gap-[5px] text-white/60 hover:text-[#c9a96e]
                transition-colors focus:outline-none"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-px bg-current transition-all duration-300
                origin-center ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`block w-5 h-px bg-current transition-opacity duration-300
                ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block w-5 h-px bg-current transition-all duration-300
                origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div className={`
          md:hidden absolute inset-x-0 top-[72px]
          bg-[rgba(8,5,2,0.98)] backdrop-blur-xl
          border-b border-[#c9a96e]/10
          overflow-hidden transition-all duration-300
          ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}
        `}>
          <ul className="flex flex-col list-none m-0 p-0 py-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`
                    block px-8 py-3.5
                    text-[0.65rem] font-light tracking-[0.3em] uppercase
                    transition-colors duration-200
                    ${location.pathname === href
                      ? "text-[#c9a96e]"
                      : "text-white/50 hover:text-[#c9a96e]"
                    }
                  `}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {label}
                </a>
              </li>
            ))}

            {!isAdmin && (
              <li className="px-8 py-3">
                <a
                  href="/menu"
                  className="
                    block w-full text-center px-6 py-2.5
                    text-[0.58rem] font-light tracking-[0.28em] uppercase
                    text-[#0d0a05] bg-[#c9a96e]
                    hover:bg-[#d4b87a] transition-colors duration-300
                  "
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Order Now
                </a>
              </li>
            )}
          </ul>
        </div>

      </nav>
    </>
  );
};

export default Navbar;