// import { useState, useEffect } from "react";
// import MainRouter from "./MainRouter";
// import { useSearch } from "./context/SearchContext";
// import SearchModal from "./components/SearchResult";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:3000/products")
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <>
//       <MainRouter />
//       {!loading && <GlobalSearchModal products={products} />}
//     </>
//   );
// }

// function GlobalSearchModal({ products }) {
//   const { isSearchOpen } = useSearch();
//   if (!isSearchOpen) return null;
//   return <SearchModal products={products} />;
// }

// export default App;



import { useState, useEffect } from "react";
import MainRouter from "./MainRouter";
import { useSearch } from "./context/SearchContext";
import SearchModal from "./components/SearchResult";
import ProductModal from "./components/cards/ProductModal"; // ← adjust path to yours

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); });
  }, []);

  return (
    <>
      <MainRouter />
      {!loading && <GlobalSearchModal products={products} />}
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
  const { isProductOpen, selectedProduct, closeProduct } = useSearch();
  if (!isProductOpen || !selectedProduct) return null;
  return <ProductModal product={selectedProduct} onClose={closeProduct} />;
}

export default App;