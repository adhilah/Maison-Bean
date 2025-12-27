// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useAuth } from "../context/AuthContext"; // ✅ use AuthContext
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


// // import { useSearch } from "../context/SearchContext";

// // function SearchBar() {
// //   const { openSearch } = useSearch();

// //   return (
// //     <div className="flex-1 max-w-xl mx-8">
// //       <div className="relative">
// //         <input
// //           readOnly
// //           onClick={openSearch}
// //           placeholder="Search coffee, croissant..."
// //           className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl cursor-pointer bg-white hover:border-[#9c7635] focus:outline-none transition"
// //         />
// //         <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl">
// //           search
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }


// const SearchBar = ({ query, setQuery }) => {
//   return (
//     <div className="search-bar w-full flex justify-center my-4">
//       <input
//         type="text"
//         placeholder="Search products..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// };



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
//       {/* Cart */}
//       <button onClick={onCartClick}>
//         <IconWithBadge iconName="shopping_cart" badgeCount={cartCount} />
//       </button>

//       {/* Wishlist */}
//       <button onClick={onWishlistClick}>
//         <IconWithBadge iconName="favorite" badgeCount={wishlistCount} />
//       </button>

//       {/* Login button */}
//       {!user && (
//         <button onClick={onLoginClick}>
//           <LoginButton label="Login" />
//         </button>
//       )}

//       {/* Profile icon */}
//       {user && (
//         <button onClick={onProfileClick}>
//           <div className="flex items-center space-x-2 hover:text-[#6c5225] transition">
//             {/* <span className="material-symbols-outlined text-3xl text-gray-700">
//               account_circle
//             </span> */}
//             <span className="font-medium text-gray-700">Profile</span>
//           </div>
//         </button>
//       )}

//       {/* Logout */}
//       {user && (
//         <button onClick={onLogout}>
//           <LoginButton label="Logout" />
//         </button>
//       )}
//     </div>
//   );
// }

// // ================= NAVBAR =================
// function Navbar() {
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

//   const handleLoginClick = () => navigate("/login");
//   const handleProfileClick = () => navigate("/profile"); // NEW

//   return (
//     <nav className="bg-white/40 backdrop-blur-md shadow py-4 sticky top-0 z-50">
//       <div className="container mx-auto px-6">
//         <div className="flex items-center justify-between">
//           <Logo />
//           <SearchBar />
//           <RightIcons
//             onCartClick={handleCartClick}
//             onWishlistClick={handleWishlistClick}
//             onLoginClick={handleLoginClick}
//             onProfileClick={handleProfileClick} // NEW
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
function IconWithBadge({ iconName, badgeCount }) {
  return (
    <div className="relative">
      <span className="material-symbols-outlined text-3xl text-gray-700">
        {iconName}
      </span>
      {badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {badgeCount}
        </span>
      )}
    </div>
  );
}

// ================= LOGIN / LOGOUT BUTTON =================
function LoginButton({ label }) {
  return (
    <div className="flex items-center space-x-2 hover:text-[#6c5225] transition">
      <span className="material-symbols-outlined text-3xl text-gray-700">
        account_circle
      </span>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
  );
}

// ================= RIGHT ICONS =================
function RightIcons({
  onCartClick,
  onWishlistClick,
  onLoginClick,
  onProfileClick,
  onLogout,
  cartCount,
  wishlistCount,
  user,
}) {
  return (
    <div className="flex items-center space-x-6">
      <button onClick={onCartClick}>
        <IconWithBadge iconName="shopping_cart" badgeCount={cartCount} />
      </button>

      <button onClick={onWishlistClick}>
        <IconWithBadge iconName="favorite" badgeCount={wishlistCount} />
      </button>

      {!user && (
        <button onClick={onLoginClick}>
          <LoginButton label="Login" />
        </button>
      )}

      {user && (
        <>
          <button onClick={onProfileClick}>
            <span className="font-medium text-gray-700 hover:text-[#6c5225] transition">
              Profile
            </span>
          </button>

          <button onClick={onLogout}>
            <LoginButton label="Logout" />
          </button>
        </>
      )}
    </div>
  );
}

// ================= NAVBAR =================
function Navbar({ query, setQuery }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartQuantity } = useCart();
  const { wishlistCount } = useWishlist();

  const handleCartClick = () => {
    if (!user) return toast.error("You need to log in for access");
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    if (!user) return toast.error("You need to log in for access");
    navigate("/wishlist");
  };

  return (
    <nav className="bg-white/40 backdrop-blur-md shadow py-4 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Logo />

          {/* SEARCH BAR */}
          <SearchBar query={query} setQuery={setQuery} />

          {/* RIGHT ICONS */}
          <RightIcons
            onCartClick={handleCartClick}
            onWishlistClick={handleWishlistClick}
            onLoginClick={() => navigate("/login")}
            onProfileClick={() => navigate("/profile")}
            onLogout={logout}
            cartCount={user ? cartQuantity : 0}
            wishlistCount={user ? wishlistCount : 0}
            user={user}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
