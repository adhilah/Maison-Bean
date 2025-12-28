// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";

// // ================= LOGO =================
// function Logo() {
//   return (
//     <div
//       className="text-2xl font-bold text-[#6c5225] cursor-pointer"
//       onClick={() => (window.location.href = "/")}
//     >
//       Maison Bean
//     </div>
//   );
// }

// // ================= SEARCH BAR =================
// function SearchBar({ query, setQuery }) {
//   return (
//     <div className="flex-1 max-w-xl mx-8">
//       <div className="relative">
//         <input
//           type="text"
//           placeholder="Search coffee, croissant..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl bg-white
//                      hover:border-[#9c7635] focus:outline-none focus:ring-2
//                      focus:ring-[#9c7635] transition"
//         />
//         <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl">
//           search
//         </span>
//       </div>
//     </div>
//   );
// }

// // ================= ICON WITH BADGE =================
// function IconWithBadge({ iconName, badgeCount }) {
//   return (
//     <div className="relative">
//       <span className="material-symbols-outlined text-3xl text-gray-700">
//         {iconName}
//       </span>
//       {badgeCount > 0 && (
//         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//           {badgeCount}
//         </span>
//       )}
//     </div>
//   );
// }

// // ================= LOGIN / LOGOUT BUTTON =================
// function LoginButton({ label }) {
//   return (
//     <div className="flex items-center space-x-2 hover:text-[#6c5225] transition">
//       <span className="material-symbols-outlined text-3xl text-gray-700">
//         account_circle
//       </span>
//       <span className="font-medium text-gray-700">{label}</span>
//     </div>
//   );
// }

// // ================= RIGHT ICONS =================
// function RightIcons({
//   onCartClick,
//   onWishlistClick,
//   onLoginClick,
//   onProfileClick,
//   onLogout,
//   cartCount,
//   wishlistCount,
//   user,
// }) {
//   return (
//     <div className="flex items-center space-x-6">
//       <button onClick={onCartClick}>
//         <IconWithBadge iconName="shopping_cart" badgeCount={cartCount} />
//       </button>

//       <button onClick={onWishlistClick}>
//         <IconWithBadge iconName="favorite" badgeCount={wishlistCount} />
//       </button>

//       {!user && (
//         <button onClick={onLoginClick}>
//           <LoginButton label="Login" />
//         </button>
//       )}

//       {user && (
//         <>
//           <button onClick={onProfileClick}>
//             <span className="font-medium text-gray-700 hover:text-[#6c5225] transition">
//               Profile
//             </span>
//           </button>

//           <button onClick={onLogout}>
//             <LoginButton label="Logout" />
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// // ================= NAVBAR =================
// function Navbar({ query, setQuery }) {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const { cartQuantity } = useCart();
//   const { wishlistCount } = useWishlist();

//   const handleCartClick = () => {
//     if (!user) return toast.error("You need to log in for access");
//     navigate("/cart");
//   };

//   const handleWishlistClick = () => {
//     if (!user) return toast.error("You need to log in for access");
//     navigate("/wishlist");
//   };

//   return (
//     <nav className="bg-white/40 backdrop-blur-md shadow py-4 sticky top-0 z-50">
//       <div className="container mx-auto px-6">
//         <div className="flex items-center justify-between">
//           <Logo />

//           {/* SEARCH BAR */}
//           <SearchBar query={query} setQuery={setQuery} />

//           {/* RIGHT ICONS */}
//           <RightIcons
//             onCartClick={handleCartClick}
//             onWishlistClick={handleWishlistClick}
//             onLoginClick={() => navigate("/login")}
//             onProfileClick={() => navigate("/profile")}
//             onLogout={logout}
//             cartCount={user ? cartQuantity : 0}
//             wishlistCount={user ? wishlistCount : 0}
//             user={user}
//           />
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;




// ===================================================================================



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

// ================= LOGO =================
function Logo() {
  return (
    <div
      className="text-2xl font-bold text-[#6c5225] cursor-pointer"
      onClick={() => (window.location.href = "/")}
    >
      Maison Bean
    </div>
  );
}

// ================= SEARCH BAR =================
function SearchBar({ query, setQuery }) {
  return (
    <div className="flex-1 max-w-xl mx-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search coffee, croissant..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl bg-white
                     hover:border-[#9c7635] focus:outline-none focus:ring-2
                     focus:ring-[#9c7635] transition"
        />
        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl">
          search
        </span>
      </div>
    </div>
  );
}

// ================= ICON WITH BADGE =================
function IconWithBadge({ iconName, badgeCount, onClick }) {
  return (
    <button onClick={onClick} className="relative">
      <span className="material-symbols-outlined text-3xl text-gray-700">
        {iconName}
      </span>
      {badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {badgeCount > 99 ? "99+" : badgeCount}
        </span>
      )}
    </button>
  );
}

// ================= DROPDOWN MENU =================
function UserDropdown({ isOpen, onClose, user, logout }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
      <div className="py-2">
        {/* My Orders - always visible */}
        <button
          onClick={() => {
            navigate("/orders");
            onClose();
          }}
          className="w-full flex items-center gap-3 px-5 py-3 text-left text-gray-700 hover:bg-gray-100 transition"
        >
          <span className="material-symbols-outlined text-xl">receipt_long</span>
          My Orders
        </button>

        {/* Profile - only if logged in */}
        {user && (
          <button
            onClick={() => {
              navigate("/profile");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-5 py-3 text-left text-gray-700 hover:bg-gray-100 transition"
          >
            <span className="material-symbols-outlined text-xl">account_circle</span>
            Profile
          </button>
        )}

        {/* Login / Logout */}
        {user ? (
          <button
            onClick={() => {
              logout();
              onClose();
              toast.success("Logged out successfully");
            }}
            className="w-full flex items-center gap-3 px-5 py-3 text-left text-gray-700 hover:bg-gray-100 transition"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-5 py-3 text-left text-gray-700 hover:bg-gray-100 transition"
          >
            <span className="material-symbols-outlined text-xl">login</span>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

// ================= NAVBAR =================
function Navbar({ query, setQuery }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartQuantity } = useCart();
  const { wishlistCount } = useWishlist();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCartClick = () => {
    if (!user) return toast.error("You need to log in for access");
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    if (!user) return toast.error("You need to log in for access");
    navigate("/wishlist");
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <nav className="bg-white/40 backdrop-blur-md shadow py-4 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Logo />

          {/* SEARCH BAR */}
          <SearchBar query={query} setQuery={setQuery} />

          {/* RIGHT ICONS */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <IconWithBadge
              iconName="shopping_cart"
              badgeCount={user ? cartQuantity : 0}
              onClick={handleCartClick}
            />

            {/* Wishlist */}
            <IconWithBadge
              iconName="favorite"
              badgeCount={user ? wishlistCount : 0}
              onClick={handleWishlistClick}
            />

            {/* Three Dots Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="p-1 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="material-symbols-outlined text-3xl text-gray-700">
                  more_vert
                </span>
              </button>

              <UserDropdown
                isOpen={isDropdownOpen}
                onClose={closeDropdown}
                user={user}
                logout={logout}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;