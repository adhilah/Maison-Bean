// import { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import ProductCard from "./ProductCard";
// import Pagination from "./Pagination";
// // import RecommendationCarousel from "./RecommendationCarousel";
// import Navbar from "../Navbar";

// function MainProducts() {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const { category } = useParams(); // read category from URL
//   const navigate = useNavigate();

//   const categories = ["All", "Hot Coffee", "Cold Coffee", "Croissant"];
//   const limit = 9;
//   const baseUrl = "http://localhost:3000/products";

//   // sync URL → selectedCategory
//   useEffect(() => {
//     if (category) {
//       const formattedCategory = category
//         .split("-")
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");

//       setSelectedCategory(formattedCategory);
//       setCurrentPage(1);
//     } else {
//       setSelectedCategory("All");
//     }
//   }, [category]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       let url = `${baseUrl}?_page=${currentPage}&_limit=${limit}`;
//       if (selectedCategory !== "All") {
//         url += `&category=${selectedCategory}`;
//       }

//       const res = await fetch(url);
//       const data = await res.json();
//       const total = res.headers.get("X-Total-Count") || data.length;

//       setProducts(data);
//       setTotalCount(Number(total));
//     } catch (err) {
//       console.error("Failed to fetch products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [currentPage, selectedCategory]);

//   const totalPages = Math.ceil(totalCount / limit);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Title + Continue Shopping Button */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
//           <h1 className="text-3xl font-bold">Café Menu</h1>
//           <Link to="/">
//             <button className="text-[#9c7635] hover:underline font-medium">
//               Continue Shopping
//             </button>
//           </Link>
//         </div>

//         <div className="flex gap-8">
//           {/* ===== LEFT SIDEBAR ===== */}
//           <aside className="w-64 sticky top-24 h-fit">
//             <div className="bg-white rounded-2xl shadow-md p-5">
//               <h3 className="text-lg font-semibold text-gray-800 mb-5">
//                 Categories
//               </h3>
//               <ul className="space-y-3">
//                 {categories.map((cat) => (
//                   <li key={cat}>
//                     <button
//                       onClick={() => {
//                         setSelectedCategory(cat);
//                         setCurrentPage(1);
//                         navigate(
//                           cat === "All"
//                             ? "/menu"
//                             : `/menu/${cat.toLowerCase().replace(" ", "-")}`
//                         );
//                       }}
//                       className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
//                         selectedCategory === cat
//                           ? "bg-[#9c7635] text-white shadow"
//                           : "bg-gray-50 hover:bg-[#efe6d6] text-gray-800"
//                       }`}
//                     >
//                       <span className="font-medium">{cat}</span>
//                       {selectedCategory === cat && <span className="text-sm">✓</span>}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </aside>

//           {/* ===== PRODUCTS ===== */}
//           <main className="flex-1">
//             {loading ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(12)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="h-96 bg-gray-200 rounded-xl animate-pulse"
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {products.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             )}

//             {/* PAGINATION  */}
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setCurrentPage}
//             />
//           </main>
//         </div>

//         {/* RECOMMENDATIONS */}
//         {/* <RecommendationCarousel recommendations={products.slice(0, 6)} /> */}
//       </div>
//     </div>
//   );
// }

// export default MainProducts;




import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Navbar from "../Navbar";

function Cards() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const { category } = useParams();
  const navigate = useNavigate();

  const categories = ["All", "Hot Coffee", "Cold Coffee", "Croissant"];

 
  useEffect(() => {
    if (category) {
      const formatted = category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setSelectedCategory(formatted);
    } else {
      setSelectedCategory("All");
    }
  }, [category]);

  // Fetch ALL products once
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (p) => p.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Café Menu</h1>
          <Link to="/">
            <button className="text-[#9c7635] hover:underline font-medium">
              ← Continue Shopping
            </button>
          </Link>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Categories */}
          <aside className="w-64 sticky top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-5">
                Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        navigate(
                          cat === "All"
                            ? "/menu"
                            : `/menu/${cat.toLowerCase().replace(" ", "-")}`
                        );
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                        selectedCategory === cat
                          ? "bg-[#9c7635] text-white shadow"
                          : "bg-gray-50 hover:bg-[#efe6d6] text-gray-800"
                      }`}
                    >
                      <span className="font-medium">{cat}</span>
                      {selectedCategory === cat && (
                        <span className="ml-2 text-sm">✓</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products Grid - ALL PRODUCTS */}
          <main className="flex-1">
            {loading ? (
              <p className="text-center py-20 text-xl text-gray-600">
                Loading all products...
              </p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-center py-20 text-xl text-gray-600">
                No products found in this category.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Optional: Recommendation Carousel */}
        {/* <RecommendationCarousel recommendations={products.slice(0, 6)} /> */}
      </div>
    </div>
  );
}

export default Cards;