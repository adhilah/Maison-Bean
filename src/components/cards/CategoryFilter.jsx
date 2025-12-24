export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="sticky top-20 z-20 bg-white">
    <div className="w-40">
      <h2 className="text-xl font-semibold mb-4">Category</h2>
      <ul className="space-y-2">
        {categories.map(cat => (
          <li key={cat}>
            <button
              onClick={() => onSelect(cat)}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                selected === cat
                  ? 'bg-[#6c5225] text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}