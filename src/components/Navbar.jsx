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

const NAV_LINKS = [
  { label: "MENU", href: "/menu" },
  { label: "STORY", href: "#story" },
  { label: "SOURCING", href: "#sourcing" },
  { label: "VISIT", href: "#visit" },
];

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isSearchOpen, openSearch, closeSearch } = useSearch();
  const { user, logout, isLoading } = useAuth();
  const { cartQuantity } = useCart();
  const { wishlistCount } = useWishlist();

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const isScrolled = scrollY > 40;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  useEffect(() => { closeSearch(); }, [location.pathname]);

  const handleCartClick = () => {
    if (!user) { toast.error("Please log in to view your cart"); navigate("/login"); return; }
    if (user.role !== "customer") { toast.error("Access denied"); return; }
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    if (!user) { toast.error("Please log in to view your wishlist"); navigate("/login"); return; }
    if (user.role !== "customer") { toast.error("Access denied"); return; }
    navigate("/wishlist");
  };

  if (isLoading) {
    return (
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        height: "72px", background: "rgba(8,5,2,0.8)", backdropFilter: "blur(20px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 3rem",
      }}>
        <div style={{ width: 160, height: 20, background: "rgba(255,255,255,0.08)", borderRadius: 2 }} />
        <div style={{ display: "flex", gap: 40 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: 48, height: 10, background: "rgba(255,255,255,0.06)", borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ width: 120, height: 10, background: "rgba(255,255,255,0.06)", borderRadius: 2 }} />
      </nav>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@200;300;400&display=swap');

        .mb-nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9999;
          height: 72px;
          display: flex;
          align-items: center;
          padding: 0 3.5rem;
          transition: background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease;
        }

        .mb-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .mb-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 300;
          letter-spacing: 0.55em;
          text-transform: uppercase;
          color: #f5f0e8;
          text-decoration: none;
          flex-shrink: 0;
        }
        .mb-logo span { color: #c9a96e; }

        .mb-links {
          display: flex;
          gap: 3rem;
          list-style: none;
          margin: 0;
          padding: 0;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .mb-link {
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.5);
          text-decoration: none;
          transition: color 0.3s ease;
          position: relative;
          padding-bottom: 2px;
        }
        .mb-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0; right: 0;
          height: 1px;
          background: #c9a96e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .mb-link:hover, .mb-link.active { color: #c9a96e; }
        .mb-link:hover::after, .mb-link.active::after { transform: scaleX(1); }

        .mb-actions {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex-shrink: 0;
        }

        .mb-icon-btn {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(245,240,232,0.55);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.25s ease;
          position: relative;
          border-radius: 4px;
        }
        .mb-icon-btn:hover { color: #c9a96e; }

        .mb-badge {
          position: absolute;
          top: 4px; right: 4px;
          background: #c9a96e;
          color: #0d0a05;
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          font-weight: 400;
          min-width: 16px;
          height: 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
        }

        .mb-cta {
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem;
          font-weight: 300;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #0d0a05;
          background: #c9a96e;
          padding: 0.65rem 1.6rem;
          text-decoration: none;
          margin-left: 0.75rem;
          transition: background 0.3s ease, letter-spacing 0.3s ease;
          white-space: nowrap;
          display: inline-block;
        }
        .mb-cta:hover {
          background: #d4b87a;
          letter-spacing: 0.36em;
        }

        .mb-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          width: 220px;
          background: #0d0a05;
          border: 1px solid rgba(201,169,110,0.15);
          overflow: hidden;
          z-index: 9999;
        }

        .mb-dropdown-header {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(201,169,110,0.1);
        }

        .mb-dropdown-name {
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          color: #f5f0e8;
          margin: 0 0 2px;
        }

        .mb-dropdown-email {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          font-weight: 200;
          color: rgba(201,169,110,0.5);
          margin: 0;
        }

        .mb-dropdown-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.75rem 1.25rem;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 200;
          letter-spacing: 0.05em;
          color: rgba(245,240,232,0.7);
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
          text-align: left;
        }
        .mb-dropdown-btn:hover {
          background: rgba(201,169,110,0.06);
          color: #f5f0e8;
        }
        .mb-dropdown-btn.danger { color: rgba(220,80,80,0.75); }
        .mb-dropdown-btn.danger:hover { background: rgba(220,80,80,0.08); color: #e05555; }
      `}</style>

      <nav
        className="mb-nav-root"
        style={{
          background: isScrolled ? "rgba(8,5,2,0.97)" : "rgba(8,5,2,0)",
          backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
          borderBottom: isScrolled ? "1px solid rgba(201,169,110,0.12)" : "1px solid transparent",
        }}
      >
        <div className="mb-nav-inner">
          {/* Logo */}
          <a href="/" className="mb-logo">
            Maison <span>Bean</span>
          </a>

          {/* Centered Nav Links */}
          <ul className="mb-links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`mb-link ${location.pathname === href ? "active" : ""}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="mb-actions">
            {/* Search */}
            <button className="mb-icon-btn" onClick={openSearch} aria-label="Search">
              <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>search</span>
            </button>

            {/* Cart */}
            <button className="mb-icon-btn" onClick={handleCartClick} aria-label="Cart">
              <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>shopping_bag</span>
              {user?.role === "customer" && cartQuantity > 0 && (
                <span className="mb-badge">{cartQuantity}</span>
              )}
            </button>

            {/* Wishlist */}
            <button className="mb-icon-btn" onClick={handleWishlistClick} aria-label="Wishlist">
              <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>favorite</span>
              {user?.role === "customer" && wishlistCount > 0 && (
                <span className="mb-badge">{wishlistCount}</span>
              )}
            </button>

            {/* User */}
            <div style={{ position: "relative" }} ref={dropdownRef}>
              <button
                className="mb-icon-btn"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="Account"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>
                  {user ? "account_circle" : "person"}
                </span>
              </button>

              {isDropdownOpen && (
                <div className="mb-dropdown">
                  <div className="mb-dropdown-header">
                    <p className="mb-dropdown-name">{user?.name || "Guest"}</p>
                    {user?.email && <p className="mb-dropdown-email">{user.email}</p>}
                  </div>
                  <div style={{ padding: "0.4rem 0" }}>
                    {user?.role === "customer" && (
                      <>
                        <button
                          className="mb-dropdown-btn"
                          onClick={() => { navigate("/orders"); setIsDropdownOpen(false); }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>receipt_long</span>
                          My Orders
                        </button>
                        <button
                          className="mb-dropdown-btn"
                          onClick={() => { navigate("/profile"); setIsDropdownOpen(false); }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>account_circle</span>
                          Profile
                        </button>
                      </>
                    )}
                    {user?.role === "admin" && (
                      <button
                        className="mb-dropdown-btn"
                        onClick={() => { navigate("/admin/dashboard"); setIsDropdownOpen(false); }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>admin_panel_settings</span>
                        Admin Dashboard
                      </button>
                    )}
                    {user ? (
                      <button
                        className="mb-dropdown-btn danger"
                        onClick={() => { logout(); setIsDropdownOpen(false); toast.success("Logged out successfully"); }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>logout</span>
                        Logout
                      </button>
                    ) : (
                      <a
                        href="/login"
                        className="mb-dropdown-btn"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>login</span>
                        Login
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            {user?.role !== "admin" && (
              <a href="/menu" className="mb-cta">Order Now</a>
            )}
          </div>
        </div>
      </nav>


    </>
  );
};

export default Navbar;