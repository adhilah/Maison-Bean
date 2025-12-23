import { useState, useEffect } from 'react';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import RecommendationCarousel from './RecommendationCarousel';

function Cards() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 9;
  const baseUrl = 'http://localhost:3000/products';

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `${baseUrl}?_page=${currentPage}&_limit=${limit}`;
      if (selectedCategory !== 'All') {
        url += `&category=${selectedCategory}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      const total = res.headers.get('X-Total-Count') || data.length;

      setProducts(data);
      setTotalCount(parseInt(total));
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const res = await fetch(`${baseUrl}?_limit=12&_sort=id&_order=desc`);
      const data = await res.json();
      // Shuffle for random recommendations
      const shuffled = data.sort(() => 0.5 - Math.random());
      setRecommendations(shuffled.slice(0, 10));
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(baseUrl);
      const data = await res.json();
      const uniqueCategories = ['All', ...new Set(data.map(p => p.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback categories
      setCategories(['All', 'Hot Coffee', 'Iced Coffee', 'Croissants', 'Pastries', 'Other']);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchRecommendations();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Café Menu</h1>

        <div className="flex gap-8">
          {/* Sidebar - Category Filter */}
          <div className="max-w-7xl mx-auto flex gap-6">
            <div className="w-64">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1); // Reset to first page on filter change
            }}
          />
          </div>
          </div>
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 border-2 border-dashed rounded-xl h-96 animate-pulse"
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


            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Horizontal Scrollable Recommendations */}
        <RecommendationCarousel recommendations={recommendations} />
      </div>
    </div>
  );
}

export default Cards;