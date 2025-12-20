import React from "react";
import { useNavigate } from "react-router-dom";

// Main Navbar Component
function Navbar() {
    const navigation=useNavigate();
    const goToCart = ()=>{
        navigation("/cart")
    }
    const goToWishlist = ()=>{
        navigation("/wishlist")
    }
    const goToLogin = ()=>{
        navigation("/login")
    }
  return (
    <nav className="bg-white shadow py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Search Bar */}
          <SearchBar />

          {/* Right Icons: Cart, Wishlist, Login */}
          <RightIcons onCartClick={goToCart} onWishlistClick={goToWishlist} onLoginClick={goToLogin}/>
        </div>
      </div>
    </nav>
  );
}

// Logo
function Logo() {
  return (
    <div className="text-2xl font-bold text-amber-900">
      Maison Bean
    </div>
  );
}

// Search Bar with Magnifying Glass Icon
function SearchBar() {
  return (
    <div className="flex-1 max-w-xl mx-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
        />
        {/* Search Icon from Google Material Symbols */}
        <span className="material-symbols-outlined absolute right-3 top-2.5 text-gray-400 text-xl">
          search
        </span>
      </div>
    </div>
  );
}

// Right Side Icons
function RightIcons({ onCartClick ,onWishlistClick ,onLoginClick}) {
    // const navigate = useNavigate();
  return (
    <div className="flex items-center space-x-6">
      {/* Cart */}
      <button
        onClick={onCartClick}
        className="relative hover:text-amber-900 transition"
      >
        <IconWithBadge iconName="shopping_cart" badgeCount={3} />
      </button>

      {/* Wishlist (Heart) */}
      <button
      onClick={onWishlistClick}
       className="relative hover:text-amber-900 transition"
       >
      <IconWithBadge iconName="favorite" badgeCount={2} />
      </button>

      {/* Login */}
      <button
      onClick={onLoginClick}
      className="relative hover:text-amber-900 transition"
      >
      <LoginButton />
      </button>
    </div>
  );
}

// Reusable Icon with Badge (for cart and wishlist)
function IconWithBadge({ iconName, badgeCount }) {
    
  return (
    <div className="relative">
      <span className="material-symbols-outlined text-3xl text-gray-700">
        {iconName}
      </span>
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
        {badgeCount}
      </span>
    </div>
  );
}

// Login Button with Person Icon
function LoginButton() {
  return (
    <div className="flex items-center space-x-2 cursor-pointer hover:text-amber-900 transition">
      <span className="material-symbols-outlined text-3xl text-gray-700">
        account_circle
      </span>
      <span className="font-medium text-gray-700">Login</span>
    </div>
  );
}

export default Navbar;