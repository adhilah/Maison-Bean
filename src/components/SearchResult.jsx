import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const SearchResult = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const API_PRODUCTS = "http://localhost:3000/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_PRODUCTS);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!query) {
      setFilteredProducts(products);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(results);
    }
  }, [query, products]);

  return (
    <div>
      {/* Pass query state to Navbar */}
      <Navbar query={query} setQuery={setQuery} />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 border rounded-lg shadow hover:shadow-lg transition"
              >
                <h2 className="font-semibold">{product.name}</h2>
                <p>Price: ${product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
