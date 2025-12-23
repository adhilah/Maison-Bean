import ProductCard from './ProductCard';

export default function RecommendationCarousel({ recommendations }) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
        Explore our recommendations
        <span className="text-sm font-normal text-gray-500">← Scroll →</span>
      </h2>

      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400">
        <div className="flex gap-6 min-w-max">
          {recommendations.map(product => (
            <div key={product.id} className="w-72 flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}