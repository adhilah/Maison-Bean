// import { useState, useEffect } from "react";
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
//       className="text-2xl font-bold text-[#6c5225] cursor-pointer"
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
//     <div className="flex-1 max-w-2xl mx-4">
//       <button
//         onClick={openSearch}
//         className="w-full px-6 py-4 bg-white border border-gray-300 rounded-full text-left text-gray-600 hover:border-[#9c7635] transition flex items-center gap-4"
//       >
//         <span className="material-symbols-outlined text-2xl">search</span>
//         <span className="text-lg">Search coffee, croissant, tea...</span>
//       </button>
//     </div>
//   );
// };


// /* ================= ICON WITH BADGE ================= */


// function IconWithBadge({ iconName, badgeCount, onClick }) {
//   return (
//     <button onClick={onClick} className="relative">
//       <span className="material-symbols-outlined text-3xl text-gray-700">
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
//     <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
//       <div className="py-2">
//         <button
//           onClick={() => {
//             navigate("/orders");
//             onClose();
//           }}
//           className="w-full flex items-center gap-3 px-5 py-3 text-left text-gray-700 hover:bg-gray-100 transition"
//         >
//           <span className="material-symbols-outlined text-xl">receipt_long</span>
//           My Orders
//         </button>

//         {user && (
//           <button
//             onClick={() => {
//               navigate("/profile");
//               onClose();
//             }}
//             className="w-full flex items-center gap-3 px-5 py-3 text-left text-gray-700 hover:bg-gray-100 transition"
//           >
//             <span className="material-symbols-outlined text-xl">
//               account_circle
//             </span>
//             Profile
//           </button>
//         )}

//         {user ? (
//           <button
//             onClick={() => {
//               logout();
//               onClose();
//               toast.success("Logged out successfully");
//             }}
//             className="w-full flex items-center gap-3 px-5 py-3 text-left text-gray-700 hover:bg-gray-100 transition"
//           >
//             <span className="material-symbols-outlined text-xl">logout</span>
//             Logout
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               navigate("/login");
//               onClose();
//             }}
//             className="w-full flex items-center gap-3 px-5 py-3 text-left text-gray-700 hover:bg-gray-100 transition"
//           >
//             <span className="material-symbols-outlined text-xl">login</span>
//             Login
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


// ``
// /* ================= NAVBAR ================= */
// function Navbar({ query, setQuery }) {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const { cartQuantity } = useCart();
//   const { wishlistCount } = useWishlist();

 
//   const {
//     isSearchOpen,
//     selectedProduct,
//     setSelectedProduct,
//   } = useSearch();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [products, setProducts] = useState([]);

//   /* Load products ONLY when search opens */
//   useEffect(() => {
//     if (isSearchOpen) {
//       fetch("http://localhost:3000/products")
//         .then((res) => res.json())
//         .then((data) => setProducts(data));
//     }
//   }, [isSearchOpen]);

//   const handleCartClick = () => {
//     if (!user) return toast.error("You need to log in for access");
//     navigate("/cart");
//   };

//   const handleWishlistClick = () => {
//     if (!user) return toast.error("You need to log in for access");
//     navigate("/wishlist");
//   };

//   return (
//     <>
//       <nav className="bg-white/40 backdrop-blur-md shadow py-4 sticky top-0 z-50">
//         <div className="container mx-auto px-6">
//           <div className="flex items-center justify-between">
//             <Logo />

//             <SearchBar query={query} setQuery={setQuery} />

//             <div className="flex items-center space-x-6">
//               <IconWithBadge
//                 iconName="shopping_cart"
//                 badgeCount={user ? cartQuantity : 0}
//                 onClick={handleCartClick}
//               />

//               <IconWithBadge
//                 iconName="favorite"
//                 badgeCount={user ? wishlistCount : 0}
//                 onClick={handleWishlistClick}
//               />

//               <div className="relative">
//                 <button
//                   onClick={() => setIsDropdownOpen((p) => !p)}
//                   className="p-1 rounded-lg hover:bg-gray-100 transition"
//                 >
//                   <span className="material-symbols-outlined text-3xl text-gray-700">
//                     more_vert
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

//       {/* SEARCH RESULT MODAL */}
//       {isSearchOpen && <SearchModal products={products} />}

//       {/* PRODUCT MODAL (FIXED & WORKING) */}
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




import { useState, useEffect } from "react";
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

        {/* Hide text ONLY on very small screens */}
        <span className="hidden xs:inline sm:inline text-sm sm:text-base truncate">
          Search coffee, croissant, tea...
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
    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border z-50">
      <div className="py-2">

        {/* SHOW ONLY WHEN USER IS LOGGED IN */}
        {user && (
          <button
            onClick={() => {
              navigate("/orders");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
          >
            <span className="material-symbols-outlined">receipt_long</span>
            My Orders
          </button>
        )}

        {user && (
          <button
            onClick={() => {
              navigate("/profile");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
          >
            <span className="material-symbols-outlined">account_circle</span>
            Profile
          </button>
        )}

        {user ? (
          <button
            onClick={() => {
              logout();
              onClose();
              toast.success("Logged out successfully");
            }}
            className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
          >
            <span className="material-symbols-outlined">login</span>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

/* ================= NAVBAR ================= */
function Navbar({ query, setQuery }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartQuantity } = useCart();
  const { wishlistCount } = useWishlist();
  const { isSearchOpen, selectedProduct, setSelectedProduct } =
    useSearch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isSearchOpen) {
      fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, [isSearchOpen]);

  const handleCartClick = () => {
    if (!user) return toast.error("You need to log in for access");
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    if (!user) return toast.error("You need to log in for access");
    navigate("/wishlist");
  };

  return (
    <>
      <nav className="bg-white/40 backdrop-blur-md shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <Logo />

            <SearchBar query={query} setQuery={setQuery} />

            <div className="flex items-center gap-4 md:gap-6">
              <IconWithBadge
                iconName="shopping_cart"
                badgeCount={user ? cartQuantity : 0}
                onClick={handleCartClick}
              />

              <IconWithBadge
                iconName="favorite"
                badgeCount={user ? wishlistCount : 0}
                onClick={handleWishlistClick}
              />

              <div className="relative">
                <button
                  onClick={() =>
                    setIsDropdownOpen((prev) => !prev)
                  }
                  className="p-1 rounded-lg hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined text-2xl md:text-3xl">
                    more_vert
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

      {isSearchOpen && <SearchModal products={products} />}

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
