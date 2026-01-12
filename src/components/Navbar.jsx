import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import SearchModal from "./SearchResult";
import ProductModal from "./cards/ProductModal";
import toast from "react-hot-toast";

/* ================= LOGO ================= */
function Logo() {
  return (
    <div
      className="text-xl md:text-2xl font-bold text-[#6c5225] cursor-pointer whitespace-nowrap"
      onClick={() => (window.location.href = "/")}
    >
      Maison Bean
    </div>
  );
}

/* ================= SEARCH BAR ================= */
const SearchBar = () => {
  const { openSearch } = useSearch();

  return (
    <div className="flex-1 mx-2 sm:mx-4 max-w-full sm:max-w-md md:max-w-2xl">
      <button
        onClick={openSearch}
        className="w-full px-3 sm:px-5 py-2 sm:py-3 bg-white border border-gray-300 rounded-full text-left text-gray-600 hover:border-[#9c7635] transition flex items-center gap-2 sm:gap-3"
      >
        <span className="material-symbols-outlined text-xl sm:text-2xl">
          search
        </span>
        <span className="hidden sm:inline text-sm sm:text-base truncate">
          Search coffee, croissant...
        </span>
      </button>
    </div>
  );
};

/* ================= ICON WITH BADGE ================= */
function IconWithBadge({ iconName, badgeCount, onClick }) {
  return (
    <button onClick={onClick} className="relative p-1">
      <span className="material-symbols-outlined text-2xl md:text-3xl text-gray-700">
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

/* ================= USER DROPDOWN ================= */
function UserDropdown({ isOpen, onClose, user, logout }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-xl ring-1 ring-black/10 z-[9999] overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="font-semibold text-gray-800 truncate">
          {user?.name || "Guest"}
        </p>
        {user?.email && (
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        )}
      </div>

      <div className="py-2">
        {/* Customer-only links */}
        {user?.role === "customer" && (
          <>
            <button
              onClick={() => {
                navigate("/orders");
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
            >
              <span className="material-symbols-outlined text-gray-600">
                receipt_long
              </span>
              <span>My Orders</span>
            </button>

            <button
              onClick={() => {
                navigate("/profile");
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
            >
              <span className="material-symbols-outlined text-gray-600">
                account_circle
              </span>
              <span>Profile</span>
            </button>
          </>
        )}

        {/* Admin link */}
        {user?.role === "admin" && (
          <button
            onClick={() => {
              navigate("/admin/dashboard");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
          >
            <span className="material-symbols-outlined text-gray-600">
              admin_panel_settings
            </span>
            <span>Admin Dashboard</span>
          </button>
        )}

        {/* Logout / Login */}
        {user ? (
          <button
            onClick={() => {
              logout();
              onClose();
              toast.success("Logged out successfully");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
          >
            <span className="material-symbols-outlined">login</span>
            <span>Login</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ================= MAIN NAVBAR ================= */
function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuth(); // ← Fully using AuthContext
  const { cartQuantity } = useCart();
  const { wishlistCount } = useWishlist();
  const { isSearchOpen, selectedProduct, setSelectedProduct } = useSearch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const dropdownRef = useRef(null);

  // Fetch products when search modal opens
  useEffect(() => {
    if (isSearchOpen) {
      fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Failed to fetch products for search:", err));
    }
  }, [isSearchOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  // Handle cart click
  const handleCartClick = () => {
    if (!user) {
      toast.error("Please log in to view your cart");
      navigate("/login");
      return;
    }
    if (user.role !== "customer") {
      toast.error("Access denied");
      return;
    }
    navigate("/cart");
  };

  // Handle wishlist click
  const handleWishlistClick = () => {
    if (!user) {
      toast.error("Please log in to view your wishlist");
      navigate("/login");
      return;
    }
    if (user.role !== "customer") {
      toast.error("Access denied");
      return;
    }
    navigate("/wishlist");
  };

  // Show loading skeleton if auth is loading
  if (isLoading) {
    return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/70 backdrop-blur-md shadow">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between h-16">
              <Logo />
              <div className="w-32 h-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex items-center gap-6">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </nav>
        <div className="h-16" />
      </>
    );
  }

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/70 backdrop-blur-md shadow">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <Logo />

            <SearchBar />

            <div className="flex items-center gap-4 md:gap-6">
              {/* Cart Icon */}
              <IconWithBadge
                iconName="shopping_cart"
                badgeCount={user?.role === "customer" ? cartQuantity : 0}
                onClick={handleCartClick}
              />

              {/* Wishlist Icon */}
              <IconWithBadge
                iconName="favorite"
                badgeCount={user?.role === "customer" ? wishlistCount : 0}
                onClick={handleWishlistClick}
              />

              {/* User Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="p-1 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="material-symbols-outlined text-2xl md:text-3xl text-gray-700">
                    {user ? "account_circle" : "more_vert"}
                  </span>
                </button>

                <UserDropdown
                  isOpen={isDropdownOpen}
                  onClose={() => setIsDropdownOpen(false)}
                  user={user}
                  logout={logout}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      {/* Search Modal */}
      {isSearchOpen && <SearchModal products={products} />}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

export default Navbar;