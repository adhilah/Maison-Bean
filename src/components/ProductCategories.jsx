// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function ProductCategories() {
//   const [activeTab, setActiveTab] = useState("All");
//   const navigate = useNavigate();

//   const categories = [
//     {
//       id: 1,
//       title: "Hot Coffee",
//       image:
//         "https://i.pinimg.com/736x/1d/75/4c/1d754c43819beac616d01e936d40f146.jpg",
//     },
//     {
//       id: 2,
//       title: "Cold Coffee",
//       image:
//         "https://i.pinimg.com/1200x/1b/33/ce/1b33ce30267c9ea5851f391e32f75926.jpg",
//     },
//     {
//       id: 3,
//       title: "Croissant",
//       image:
//         "https://i.pinimg.com/1200x/b3/62/f3/b362f30f8faba86e7f3050d6595ea41d.jpg",
//     },
//   ];

//   return (
//     <section className="py-10 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-center text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
//           Explore Our Menu
//         </h2>

//         <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6">
//           {categories.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => {
//                 setActiveTab(item.title);
//                 navigate(
//                   `/menu/${item.title.toLowerCase().replace(" ", "-")}`
//                 );
//               }}
//               className={`
//                 group relative
//                 bg-white rounded-2xl
//                 p-4 sm:p-5
//                 flex flex-col items-center
//                 shadow-md hover:shadow-xl
//                 transition-all duration-300
//                 active:scale-95
//                 ${
//                   activeTab === item.title
//                     ? "ring-2 ring-[#9c7635]"
//                     : ""
//                 }
//               `}
//             >
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="
//                   w-20 h-20 
//                   sm:w-24 sm:h-24 
//                   md:w-28 md:h-28
//                   object-cover rounded-full
//                   mb-3
//                   group-hover:scale-105
//                   transition
//                 "
//               />

//               <span className="text-sm sm:text-base font-semibold text-gray-800">
//                 {item.title}
//               </span>

//               {/* subtle hover accent */}
//               <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 group-hover:ring-[#9c7635]/40 transition"></div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProductCategories;



import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Hot Coffee",
    slug: "hot-coffee",
    sub: "Espresso · Latte · Cappuccino",
    image: "https://i.pinimg.com/736x/1d/75/4c/1d754c43819beac616d01e936d40f146.jpg",
    count: "12 items",
  },
  {
    id: 2,
    title: "Cold Coffee",
    slug: "cold-coffee",
    sub: "Cold Brew · Iced Latte · Glacé",
    image: "https://i.pinimg.com/1200x/1b/33/ce/1b33ce30267c9ea5851f391e32f75926.jpg",
    count: "9 items",
  },
  {
    id: 3,
    title: "Croissant",
    slug: "croissant",
    sub: "Butter · Almond · Chocolate",
    image: "https://i.pinimg.com/1200x/b3/62/f3/b362f30f8faba86e7f3050d6595ea41d.jpg",
    count: "7 items",
  },
];

/*
  Tailwind can't transition child elements on parent hover, so we keep
  a minimal <style> block only for those 6 parent→child transitions.
  Everything else — layout, color, spacing, typography — is Tailwind.
*/

function ProductCategories() {
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        /* image zoom */
        .pc-card .pc-img { transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s; }
        .pc-card:hover .pc-img,
        .pc-card.active .pc-img { transform: scale(1.06); opacity: 0.62 !important; }

        /* gold top-line sweep */
        .pc-card .pc-line { transform: scaleX(0); transform-origin: center; transition: transform 0.5s ease; }
        .pc-card:hover .pc-line,
        .pc-card.active .pc-line { transform: scaleX(1); }

        /* content slide up */
        .pc-card .pc-body { transform: translateY(8px); transition: transform 0.4s ease; }
        .pc-card:hover .pc-body { transform: translateY(0); }

        /* title gold on hover */
        .pc-card .pc-title { transition: color 0.3s ease; }
        .pc-card:hover .pc-title,
        .pc-card.active .pc-title { color: #c9a96e !important; }

        /* footer fade in */
        .pc-card .pc-footer { opacity: 0; transform: translateY(6px); transition: opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s; }
        .pc-card:hover .pc-footer { opacity: 1; transform: translateY(0); }

        /* watermark brightens */
        .pc-card .pc-mark { transition: color 0.4s ease; }
        .pc-card:hover .pc-mark { color: rgba(201,169,110,0.08) !important; }
      `}</style>

      <section className="relative overflow-hidden bg-[#0d0a05] py-28 font-['Jost',sans-serif]">

        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-0 left-[20%] w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.04] blur-[130px]" />
          <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-[#c9a96e]/[0.03] blur-[110px]" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14">

          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.5em] uppercase mb-3 opacity-70">
                WHAT WE OFFER
              </p>
              <h2
                className="text-[#f5f0e8] font-light leading-none tracking-wide"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,4vw,3.2rem)" }}
              >
                Explore Our{" "}
                <em className="italic text-[#c9a96e]">Menu</em>
              </h2>
            </div>

            <a
              href="/menu"
              className="group flex items-center gap-2.5 text-[#c9a96e]/50 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 self-end md:self-auto pb-1"
            >
              Full Menu
              <span className="h-px bg-current inline-block w-7 group-hover:w-11 transition-all duration-300" />
            </a>
          </div>

          {/* ── Cards Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#c9a96e]/10 border border-[#c9a96e]/10">
            {categories.map((item, i) => (
              <button
                key={item.id}
                className={`pc-card relative overflow-hidden text-left w-full bg-[#0d0a05] hover:bg-[#110d07] transition-colors duration-400 aspect-[3/4] md:aspect-[3/4]${activeTab === item.title ? " active" : ""}`}
                onClick={() => {
                  setActiveTab(item.title);
                  navigate(`/menu/${item.slug}`);
                }}
              >
                {/* Full-bleed image */}
                <img
                  className="pc-img absolute inset-0 w-full h-full object-cover opacity-45"
                  src={item.image}
                  alt={item.title}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top,rgba(8,5,2,0.96) 0%,rgba(8,5,2,0.52) 42%,rgba(8,5,2,0.10) 100%)" }}
                />

                {/* Gold sweep line — top */}
                <div className="absolute top-0 inset-x-0 h-px z-20">
                  <div
                    className="pc-line h-full"
                    style={{ background: "linear-gradient(to right,transparent,#c9a96e,transparent)" }}
                  />
                </div>

                {/* Watermark number */}
                <span
                  className="pc-mark absolute top-5 right-5 z-10 pointer-events-none select-none font-light leading-none"
                  style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "5rem", color: "rgba(201,169,110,0.05)" }}
                >
                  0{i + 1}
                </span>

                {/* Slide-up content */}
                <div className="pc-body absolute bottom-0 inset-x-0 z-20 px-8 pb-9">

                  {/* Index label */}
                  <span className="block text-[10px] tracking-[0.4em] uppercase font-light mb-2 text-[#c9a96e]/45">
                    0{i + 1}
                  </span>

                  {/* Title */}
                  <p
                    className="pc-title font-light leading-none mb-2 text-[#f5f0e8]"
                    style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", letterSpacing: "0.02em" }}
                  >
                    {item.title}
                  </p>

                  {/* Sub description */}
                  <span className="block text-[10px] tracking-[0.18em] uppercase font-light mb-5 text-[#f5f0e8]/30">
                    {item.sub}
                  </span>

                  {/* Footer — fades in on hover */}
                  <div className="pc-footer flex items-center justify-between pt-4 border-t border-[#c9a96e]/12">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[#c9a96e]/50">
                      {item.count}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase font-light text-[#c9a96e]">
                      Explore
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default ProductCategories;