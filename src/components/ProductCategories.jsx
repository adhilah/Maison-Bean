import cappuccino from "../assets/cappuccino.jpg";
import coldCoffee from "../assets/cup-three-layered-coffee-dark.jpg";
import dessert from "../assets/croissant.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCategories() {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const categories = [
    { id: 1, title: "Hot Coffee", image: cappuccino },
    { id: 2, title: "Cold Coffee", image: coldCoffee },
    { id: 3, title: "Croissant", image: dessert },
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