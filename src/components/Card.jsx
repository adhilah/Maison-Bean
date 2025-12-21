import axios from "axios";
import React, { useEffect, useState } from "react";

const Card = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setProduct(res.data[0]); // pick first / featured product
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, []);

  // Loading UI
  if (!product) {
    return (
      <div className="bg-white rounded-xl shadow p-4 max-w-sm animate-pulse">
        <div className="h-40 bg-gray-200 rounded-lg"></div>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden max-w-sm">

      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <span className="text-amber-700 font-bold text-lg">
            ${product.basePrice}
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span className="material-symbols-rounded text-amber-600 text-base">
              star
            </span>
            <span>{product.rating}</span>
            <span className="text-gray-400">
              ({product.reviewsCount})
            </span>
          </div>
          <span>{product.baseCalories} kcal</span>
        </div>

        <p className="text-sm text-gray-700">{product.description}</p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-800 font-medium mb-1">
            Health Benefits
          </p>
          <p className="text-sm text-amber-700">
            {product.healthBenefits}
          </p>
        </div>

        <button className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;