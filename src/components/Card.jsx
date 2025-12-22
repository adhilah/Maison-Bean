import axios from "axios";
import React, { useEffect, useState } from "react";

const Card = () => {
  const [
    product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      console.log("data", res.data);
      console.log("API RESPONSE:", res.data);
      setProduct(res.data);

      // json-server always returns an array
      // if (Array.isArray(res.data) && res.data.length > 0) {
      //   setProduct(res.data);
      // }
    } catch (err) {
      console.error("API ERROR:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  /*  Loading ------------------------------------------------------------------------------------------------------ */
  if (product.length == 0) {
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


  // const cartProduct={

  //     id:
  //     productId:
  //     quantity:
  //     beanId:
  // }

const addCartProduct = async () => {
  axios
  .post("http://localhost:3000/cart",cart)
}

  return (
    <>
     <h2 className="text-2xl font-bold text-orange-900 text-center mb-4 px-4">
    Featured Products
  </h2>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">



      {product.slice(0, 10).map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col h-full">
          {/* Image */}
          <div className="h-40 w-full overflow-hidden">
  <img
    src={item.image || "https://via.placeholder.com/400"}
    alt={item.name}
    className="h-full w-full object-cover"
  />
</div>

          <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
  <div>
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
      <span className="text-amber-700 font-bold text-lg">${item.basePrice}</span>
    </div>

    <div className="flex justify-between text-sm text-gray-600 mt-1">
      <div className="flex items-center gap-1">
        <span className="material-symbols-rounded text-amber-600 text-base">star</span>
        <span>{item.rating || 0}</span>
        <span className="text-gray-400">({item.reviewsCount || 0})</span>
      </div>
      <span>{item.baseCalories || 0} kcal</span>
    </div>

    <p className="text-sm text-gray-700 mt-2">{item.description}</p>

    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
      <p className="text-xs text-amber-800 font-medium mb-1">Health Benefits</p>
      <p className="text-sm text-amber-700">{item.healthBenefits}</p>
    </div>
  </div>

  <button className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-lg mt-3 ">
    Add to Cart
  </button>
</div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Card;
