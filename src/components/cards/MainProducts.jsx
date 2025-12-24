import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import RecommendationCarousel from "./RecommendationCarousel";

function Cards() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const categories = ["All", "Hot Coffee", "Cold Coffee", "Croissant"];
  const limit = 9;
  const baseUrl = "http://localhost:3000/products";

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `${baseUrl}?_page=${currentPage}&_limit=${limit}`;

      if (selectedCategory !== "All") {
        url += `&category=${selectedCategory}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      const total = res.headers.get("X-Total-Count") || data.length;

      setProducts(data);
      setTotalCount(Number(total));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Café Menu</h1>

        <div className="flex gap-8">
          {/* ===== LEFT SIDEBAR (STICKY) ===== */}
          {/* ===== LEFT SIDEBAR (STICKY) ===== */}
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
              setCurrentPage(1);
            }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl
              transition-all duration-200
              ${
                selectedCategory === cat
                  ? "bg-[#9c7635] text-white shadow"
                  : "bg-gray-50 hover:bg-[#efe6d6] text-gray-800"
              }`}
          >
            <span className="font-medium">{cat}</span>

            {selectedCategory === cat && (
              <span className="text-sm">✓</span>
            )}
          </button>
        </li>
      ))}
    </ul>
  </div>
</aside>


          {/* ===== PRODUCTS ===== */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="h-96 bg-gray-200 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* PAGINATION */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </main>
        </div>

        {/* RECOMMENDATIONS */}
        <RecommendationCarousel recommendations={products.slice(0, 6)} />
      </div>
    </div>
  );
}

export default Cards;
