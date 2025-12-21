// function ProductCategories() {
//   return (
//     <div className="bg-[#efe6d6] py-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-center gap-20 text-gray-800">

//           {/* Hot Coffee */}
//           <div className="flex flex-col items-center">
//             <span className="material-symbols-outlined text-3xl">
//               local_cafe
//             </span>
//             <p className="text-xs mt-1">Hot Coffee</p>
//           </div>

//           {/* Cold Coffee – Custom SVG */}
//           <div className="flex flex-col items-center">
//             <svg
//               width="28"
//               height="28"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M6 8h12" />
//               <path d="M7 8l1 12h8l1-12" />
//               <path d="M9 4h6l1 2H8l1-2z" />
//             </svg>
//             <p className="text-xs mt-1">Cold Coffee</p>
//           </div>

//           {/* Cup Coffee */}
//           <div className="flex flex-col items-center">
//             <span className="material-symbols-outlined text-3xl">
//               emoji_food_beverage
//             </span>
//             <p className="text-xs mt-1">Cup Coffee</p>
//           </div>

//           {/* Dessert */}
//           <div className="flex flex-col items-center">
//             <span className="material-symbols-outlined text-3xl">
//               cake
//             </span>
//             <p className="text-xs mt-1">Dessert</p>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductCategories



import cappuccino from "../assets/cappuccino.jpg";
import coldCoffee from "../assets/cup-three-layered-coffee-dark.jpg";
import cupCoffee from "../assets/coffee-cup.jpg";
import dessert from "../assets/croissant.jpg";
import { useState } from "react";


function ProductCategories() {

const [activeTab, setActiveTab]= useState('All');

  const categories = [
    { id: 1, title: "Hot Coffee", image: cappuccino },
    { id: 2, title: "Cold Coffee", image: coldCoffee },
    { id: 3, title: "Cup Coffee", image: cupCoffee },
    { id: 4, title: "croissant", image: dessert },
  ];

  return (
    <section className="from-[#efe6d6] to-[#f8f4ee] py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section Title */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-10">
          The Maison Menu
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {categories.map((item) => (
            <button
              key={item.id}
              className="
                group relative bg-white rounded-2xl p-6
                flex flex-col items-center
                shadow-md
                transition-all duration-300
                hover:shadow-xl hover:-translate-y-2
                focus:outline-none"






                onClick={()=>setActiveTab(categories)}







                
            >
              {/* Image */}
              <div className="w-20 h-20 rounded-full overflow-hidden 
                              bg-[#efe6d6] flex items-center justify-center
                              group-hover:scale-110 transition-transform duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <p className="mt-5 text-base font-medium text-gray-800 group-hover:text-[#6b4f2c] transition-colors">
                {item.title}
              </p>

              {/* Hover underline */}
              <span className="absolute bottom-4 w-10 bg-[#6b4f2c]
                               scale-x-0 group-hover:scale-x-100
                               transition-transform duration-300" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCategories;