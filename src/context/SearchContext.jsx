// import { createContext, useContext, useState } from "react";

// const SearchContext = createContext();

// export const SearchProvider = ({ children }) => {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   const openSearch = () => setIsSearchOpen(true);
//   const closeSearch = () => setIsSearchOpen(false);

//   return (
//     <SearchContext.Provider value={{ isSearchOpen, openSearch, closeSearch }}>
//       {children}
//     </SearchContext.Provider>
//   );
// };

// export const useSearch = () => useContext(SearchContext);


// src/context/SearchContext.jsx
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <SearchContext.Provider value={{ isSearchOpen, openSearch, closeSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);