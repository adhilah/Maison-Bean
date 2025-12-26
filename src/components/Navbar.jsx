// // import { useNavigate } from "react-router-dom";
// // import { useCart } from "../context/CartContext";
// // import { useWishlist } from "../hooks/useWishlist";

// // // Main Navbar Component
// // function Navbar() {
// //     const navigation=useNavigate();
// //     const goToCart = ()=>{
// //         navigation("/cart")
// //     }
// //     const goToWishlist = ()=>{
// //         navigation("/wishlist")
// //     }
// //     const goToLogin = ()=>{
// //         navigation("/login")
// //     }

// //     const { cartQuantity } = useCart();
// //     const { wishlistCount } = useWishlist();
// //   return (
// //     <nav className="bg-white/40 backdrop-blur-md shadow py-4 sticky top-0 z-100">
// //       <div className="container mx-auto px-6">
// //         <div className="flex items-center justify-between">
// //           {/* Logo */}
// //           <Logo />

// //           {/* Search Bar */}
// //           <SearchBar />

// //           {/* Right Icons: Cart, Wishlist, Login */}
// //          <RightIcons
// //   onCartClick={goToCart}
// //   onWishlistClick={goToWishlist}
// //   onLoginClick={goToLogin}
// //   cartCount={cartQuantity}
// //   wishlistCount={wishlistCount}/>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }

// // // Logo
// // function Logo() {
// //   return (
// //     <div className="text-2xl font-bold text-[#6c5225]">
// //       Maison Bean
// //     </div>
// //   );
// // }

// // // Search Bar with Magnifying Glass Icon
// // function SearchBar() {
// //   return (
// //     <div className="flex-1 max-w-xl mx-8">
// //       <div className="relative">
// //         <input
// //           type="text"
// //           placeholder="Search..."
// //           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
// //         />
// //         {/* Search Icon from Google Material Symbols */}
// //         <span className="material-symbols-outlined absolute right-3 top-2.5 text-gray-400 text-xl">
// //           search
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }

// // // Right Side Icons
// // function RightIcons({
// //   onCartClick,
// //   onWishlistClick,
// //   onLoginClick,
// //   cartCount,
// //   wishlistCount,
// // }){

// //   return (
// //     <div className="flex items-center space-x-6">
// //       {/* Cart */}
// //       <button
// //         onClick={onCartClick}
// //         className="relative hover:text-[#6c5225] transition"
// //       >
// //         <IconWithBadge iconName="shopping_cart" badgeCount={cartCount} />
// //       </button>

// //       {/* Wishlist (Heart) */}
// //       <button
// //       onClick={onWishlistClick}
// //        className="relative hover:text-[#6c5225] transition"
// //        >
// //       <IconWithBadge iconName="favorite" badgeCount={wishlistCount} />
// //       </button>

// //       {/* Login */}
// //       <button
// //       onClick={onLoginClick}
// //       className="relative hover:text-[#6c5225] transition"
// //       >
// //       <LoginButton />
// //       </button>
// //     </div>
// //   );
// // }

// // function IconWithBadge({ iconName, badgeCount }) {
// //   return (
// //     <div className="relative">
// //       <span className="material-symbols-outlined text-3xl text-gray-700">
// //         {iconName}
// //       </span>

// //       {badgeCount > 0 && (
// //         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
// //           {badgeCount}
// //         </span>
// //       )}
// //     </div>
// //   );
// // }


// // // Login Button with Person Icon
// // function LoginButton() {
// //   return (
// //     <div className="flex items-center space-x-2 cursor-pointer hover:text-[#6c5225] transition">
// //       <span className="material-symbols-outlined text-3xl text-gray-700">
// //         account_circle
// //       </span>
// //       <span className="font-medium text-gray-700">Login</span>
// //     </div>
// //   );
// // }

// // export default Navbar;




// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext"; // ✅ FIXED IMPORT

// // ================= MAIN NAVBAR =================
// function Navbar() {
//   const navigate = useNavigate();

//   const goToCart = () => navigate("/cart");
//   const goToWishlist = () => navigate("/wishlist");
//   const goToLogin = () => navigate("/login");

//   const { cartQuantity } = useCart();
//   const { wishlistCount } = useWishlist(); // ✅ NOW WORKS

//   return (
//     <nav className="bg-white/40 backdrop-blur-md shadow py-4 sticky top-0 z-50">
//       <div className="container mx-auto px-6">
//         <div className="flex items-center justify-between">
//           <Logo />
//           <SearchBar />
//           <RightIcons
//             onCartClick={goToCart}
//             onWishlistClick={goToWishlist}
//             onLoginClick={goToLogin}
//             cartCount={cartQuantity}
//             wishlistCount={wishlistCount}
//           />
//         </div>
//       </div>
//     </nav>
//   );
// }

// // ================= LOGO =================
// function Logo() {
//   return (
//     <div className="text-2xl font-bold text-[#6c5225] cursor-pointer">
//       Maison Bean
//     </div>
//   );
// }

// // ================= SEARCH BAR =================
// function SearchBar() {
//   return (
//     <div className="flex-1 max-w-xl mx-8">
//       <div className="relative">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
//         />
//         <span className="material-symbols-outlined absolute right-3 top-2.5 text-gray-400 text-xl">
//           search
//         </span>
//       </div>
//     </div>
//   );
// }

// // ================= RIGHT ICONS =================
// function RightIcons({
//   onCartClick,
//   onWishlistClick,
//   onLoginClick,
//   cartCount,
//   wishlistCount,
// }) {
//   return (
//     <div className="flex items-center space-x-6">
//       {/* Cart */}
//       <button onClick={onCartClick} className="relative">
//         <IconWithBadge iconName="shopping_cart" badgeCount={cartCount} />
//       </button>

//       {/* Wishlist */}
//       <button onClick={onWishlistClick} className="relative">
//         <IconWithBadge iconName="favorite" badgeCount={wishlistCount} />
//       </button>

//       {/* Login */}
//       <button onClick={onLoginClick}>
//         <LoginButton />
//       </button>
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

// // ================= LOGIN BUTTON =================
// function LoginButton() {
//   const handleLogout = () => {
//   localStorage.removeItem("user");
//   window.location.reload(); // or navigate("/")
// };
//   return (
//     <div className="flex items-center space-x-2 hover:text-[#6c5225] transition">
//       <span className="material-symbols-outlined text-3xl text-gray-700">
//         account_circle
//       </span>
//       <span className="font-medium text-gray-700">Login</span>
//     </div>
//   );
// }

// export default Navbar;



import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getLoggedInUser } from "../utils/auth";

// ================= MAIN NAVBAR =================
function Navbar() {
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const { cartQuantity } = useCart();
  const { wishlistCount } = useWishlist();

  const goToCart = () => navigate("/cart");
  const goToWishlist = () => navigate("/wishlist");
  const goToLogin = () => navigate("/login");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="bg-white/40 backdrop-blur-md shadow py-4 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Logo />
          <SearchBar />

          <RightIcons
            onCartClick={goToCart}
            onWishlistClick={goToWishlist}
            onLoginClick={goToLogin}
            onLogout={handleLogout}
            cartCount={cartQuantity}
            wishlistCount={wishlistCount}
            isLoggedIn={!!user}
          />
        </div>
      </div>
    </nav>
  );
}

// ================= LOGO =================
function Logo() {
  return (
    <div
      className="text-2xl font-bold text-[#6c5225] cursor-pointer"
      onClick={() => window.location.href = "/"}
    >
      Maison Bean
    </div>
  );
}

// ================= SEARCH BAR =================
function SearchBar() {
  return (
    <div className="flex-1 max-w-xl mx-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
        />
        <span className="material-symbols-outlined absolute right-3 top-2.5 text-gray-400 text-xl">
          search
        </span>
      </div>
    </div>
  );
}

// ================= RIGHT ICONS =================
function RightIcons({
  onCartClick,
  onWishlistClick,
  onLoginClick,
  onLogout,
  cartCount,
  wishlistCount,
  isLoggedIn,
}) {
  return (
    <div className="flex items-center space-x-6">
      {/* Cart */}
      <button onClick={onCartClick}>
        <IconWithBadge iconName="shopping_cart" badgeCount={cartCount} />
      </button>

      {/* Wishlist */}
      <button onClick={onWishlistClick}>
        <IconWithBadge iconName="favorite" badgeCount={wishlistCount} />
      </button>

      {/* Login / Logout */}
      {isLoggedIn ? (
        <button onClick={onLogout}>
          <LoginButton label="Logout" />
        </button>
      ) : (
        <button onClick={onLoginClick}>
          <LoginButton label="Login" />
        </button>
      )}
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

export default Navbar;
