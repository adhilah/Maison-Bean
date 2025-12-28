import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCategories() {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const categories = [
    { id: 1, title: "Hot Coffee", image: "https://i.pinimg.com/736x/1d/75/4c/1d754c43819beac616d01e936d40f146.jpg" },
    { id: 2, title: "Cold Coffee", image: "https://i.pinimg.com/1200x/1b/33/ce/1b33ce30267c9ea5851f391e32f75926.jpg" },
    { id: 3, title: "Croissant", image: "https://i.pinimg.com/1200x/b3/62/f3/b362f30f8faba86e7f3050d6595ea41d.jpg" },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-8">Explore Our Menu</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.title);
                navigate(`/menu/${item.title.toLowerCase().replace(" ", "-")}`);
              }}
              className={`bg-white rounded-xl p-4 flex flex-col items-center
                          shadow hover:shadow-lg transition ${
                            activeTab === item.title ? 'ring-2 ring-[#9c7635]' : ''
                          }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-full mb-2"
              />
              <span className="font-medium text-gray-800">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCategories;