// import { createContext, useContext, useState, useCallback } from "react";

// const SearchContext = createContext();

// export const SearchProvider = ({ children }) => {
//   const [isSearchOpen, setIsSearchOpen]       = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isProductOpen, setIsProductOpen]     = useState(false);
//   const [searchHistory, setSearchHistory]     = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("mb_search_history") || "[]");
//     } catch {
//       return [];
//     }
//   });

//   const openSearch  = useCallback(() => setIsSearchOpen(true),  []);
//   const closeSearch = useCallback(() => setIsSearchOpen(false), []);

//   const openProduct  = useCallback(() => setIsProductOpen(true),  []);
//   const closeProduct = useCallback(() => {
//     setIsProductOpen(false);
//     setSelectedProduct(null);
//   }, []);

//   /* Select a product — closes search, opens product view, saves to history */
//   const selectProduct = useCallback((product) => {
//     setSelectedProduct(product);
//     setIsSearchOpen(false);
//     setIsProductOpen(true);

//     // Persist recent searches (max 6, deduplicated)
//     setSearchHistory((prev) => {
//       const filtered = prev.filter((p) => p.id !== product.id);
//       const next = [product, ...filtered].slice(0, 6);
//       localStorage.setItem("mb_search_history", JSON.stringify(next));
//       return next;
//     });
//   }, []);

//   const clearHistory = useCallback(() => {
//     setSearchHistory([]);
//     localStorage.removeItem("mb_search_history");
//   }, []);

//   return (
//     <SearchContext.Provider
//       value={{
//         // Search modal
//         isSearchOpen,
//         openSearch,
//         closeSearch,

//         // Product quick-view modal
//         isProductOpen,
//         openProduct,
//         closeProduct,

//         // Selected product + selection handler
//         selectedProduct,
//         setSelectedProduct, // keep for backwards compat
//         selectProduct,      // preferred — use this in SearchModal

//         // Recent search history
//         searchHistory,
//         clearHistory,
//       }}
//     >
//       {children}
//     </SearchContext.Provider>
//   );
// };

// export const useSearch = () => useContext(SearchContext);




//=================================================================


import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import api from "../services/api";

const SearchContext = createContext();

export const SearchProvider = ({
  children,
}) => {
  const [isSearchOpen, setIsSearchOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [isProductOpen, setIsProductOpen] =
    useState(false);

  const [searchResults, setSearchResults] =
    useState([]);

  const [searchLoading, setSearchLoading] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [searchHistory, setSearchHistory] =
    useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem(
            "mb_search_history"
          ) || "[]"
        );
      } catch {
        return [];
      }
    });

  // SEARCH MODAL
  const openSearch = useCallback(
    () => setIsSearchOpen(true),
    []
  );

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);

    setSearchResults([]);

    setSearchTerm("");
  }, []);

  // PRODUCT MODAL
  const openProduct = useCallback(
    () => setIsProductOpen(true),
    []
  );

  const closeProduct = useCallback(() => {
    setIsProductOpen(false);

    setSelectedProduct(null);
  }, []);

  // SEARCH API
  const searchProducts = useCallback(
    async (term) => {
      setSearchTerm(term);

      if (!term.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setSearchLoading(true);

        const res = await api.get(
          `/products/search?term=${term}`
        );

        setSearchResults(res.data);
      } catch (err) {
        console.error(
          "Search failed:",
          err
        );

        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    },
    []
  );

  // SELECT PRODUCT
  const selectProduct = useCallback(
    (product) => {
      setSelectedProduct(product);

      setIsSearchOpen(false);

      setIsProductOpen(true);

      setSearchHistory((prev) => {
        const filtered = prev.filter(
          (p) => p.name !== product.name
        );

        const next = [
          product,
          ...filtered,
        ].slice(0, 6);

        localStorage.setItem(
          "mb_search_history",
          JSON.stringify(next)
        );

        return next;
      });
    },
    []
  );

  // CLEAR HISTORY
  const clearHistory = useCallback(() => {
    setSearchHistory([]);

    localStorage.removeItem(
      "mb_search_history"
    );
  }, []);

  return (
    <SearchContext.Provider
      value={{
        // Search modal
        isSearchOpen,
        openSearch,
        closeSearch,

        // Product modal
        isProductOpen,
        openProduct,
        closeProduct,

        // Product
        selectedProduct,
        setSelectedProduct,
        selectProduct,

        // Search
        searchTerm,
        searchResults,
        searchLoading,
        searchProducts,

        // History
        searchHistory,
        clearHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () =>
  useContext(SearchContext);