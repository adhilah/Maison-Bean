import { useState, useEffect } from "react";
import MainRouter from "./MainRouter";
import api from "./services/api";
import { useSearch } from "./context/SearchContext";
import SearchModal from "./components/SearchResult";
import ProductModal from "./components/cards/ProductModal";

function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await api.get("/products");

        setProducts(response.data);

      } catch (error) {

        console.error("Failed to fetch products:", error);

      } finally {

        setLoading(false);

      }
    };

    fetchProducts();

  }, []);

  return (
    <>
      <MainRouter />

      {!loading && (
        <GlobalSearchModal products={products} />
      )}

      <GlobalProductModal />
    </>
  );
}

function GlobalSearchModal({ products }) {

  const { isSearchOpen } = useSearch();

  if (!isSearchOpen) return null;

  return <SearchModal products={products} />;
}

function GlobalProductModal() {

  const {
    isProductOpen,
    selectedProduct,
    closeProduct
  } = useSearch();

  if (!isProductOpen || !selectedProduct)
    return null;

  return (
    <ProductModal
      product={selectedProduct}
      onClose={closeProduct}
    />
  );
}

export default App;