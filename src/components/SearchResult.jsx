import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearch } from "../context/SearchContext";

const SearchModal = ({ products }) => {
  const { closeSearch, setSelectedProduct } = useSearch();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 z-[999999]"
        onClick={closeSearch}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999999] flex flex-col items-center pt-20 px-4">
        <div
          className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Bar */}
          <div className="p-6 bg-gradient-to-r from-[#9c7635] to-[#7a5c2a]">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-3xl text-white">
                search
              </span>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search coffee, croissant, tea..."
                className="w-full pl-16 pr-16 py-5 text-xl bg-white/90 rounded-2xl focus:outline-none"
              />

              <button
                onClick={closeSearch}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl text-white"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto bg-white">
            {filtered.length === 0 ? (
              <div className="py-20 text-center text-2xl text-gray-500">
                {query ? `No results for "${query}"` : "Start typing to search..."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(product);
                      closeSearch();
                    }}
                    className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer shadow-md"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-28 h-28 object-cover rounded-2xl"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">{product.name}</h3>
                      <p className="text-xl text-[#9c7635] font-semibold">
                        ${Number(product.basePrice || 0).toFixed(2)}
                      </p>
                      <p className="text-gray-600">{product.category}</p>
                    </div>
                    <span className="text-4xl text-gray-400">›</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default SearchModal;
