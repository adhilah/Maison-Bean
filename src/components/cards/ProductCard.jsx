export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="h-64 bg-gray-100 flex items-center justify-center">
        <img
        src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <div className="flex items-center gap-2 text-sm text-yellow-600 mb-3">
          <span>{product.rating || 4.8}</span>
          <span className="text-gray-500">({product.reviewCount || 120} Reviews)</span>
        </div>
        <div className="text-2xl font-bold mb-4">${product.basePrice.toFixed(2)}</div>
        <div className="flex gap-3">
          <button className="flex-1 bg-orange-800 hover:bg-orange-900 text-white py-3 rounded-lg font-bold transition">
            Buy Now
          </button>
          <button className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}