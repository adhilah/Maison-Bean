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
    sub: "Espresso · Latte · Cappuccino",
    image: "https://i.pinimg.com/736x/1d/75/4c/1d754c43819beac616d01e936d40f146.jpg",
    count: "12 items",
  },
  {
    id: 2,
    title: "Cold Coffee",
    sub: "Cold Brew · Iced Latte · Glacé",
    image: "https://i.pinimg.com/1200x/1b/33/ce/1b33ce30267c9ea5851f391e32f75926.jpg",
    count: "9 items",
  },
  {
    id: 3,
    title: "Croissant",
    sub: "Butter · Almond · Chocolate",
    image: "https://i.pinimg.com/1200x/b3/62/f3/b362f30f8faba86e7f3050d6595ea41d.jpg",
    count: "7 items",
  },
];

function ProductCategories() {
  const [activeTab, setActiveTab] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        .mb-cat-section {
          background: #0d0a05;
          padding: 7rem 0;
          font-family: 'Jost', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle background texture */
        .mb-cat-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.04) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, rgba(201,169,110,0.03) 0%, transparent 60%);
          pointer-events: none;
        }

        .mb-cat-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 3rem;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .mb-cat-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 4rem;
        }

        .mb-cat-eyebrow {
          font-size: 0.55rem;
          font-weight: 200;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 0.9rem;
        }

        .mb-cat-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 300;
          line-height: 1.05;
          color: #f5f0e8;
          letter-spacing: 0.02em;
        }

        .mb-cat-heading em {
          font-style: italic;
          color: #c9a96e;
        }

        .mb-cat-view-all {
          font-size: 0.58rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.5);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color 0.3s, gap 0.3s;
          white-space: nowrap;
          padding-bottom: 4px;
        }
        .mb-cat-view-all::after {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: currentColor;
          transition: width 0.3s;
        }
        .mb-cat-view-all:hover {
          color: #c9a96e;
        }
        .mb-cat-view-all:hover::after { width: 44px; }

        /* Grid */
        .mb-cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.1);
        }

        /* Card */
        .mb-cat-card {
          background: #0d0a05;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border: none;
          padding: 0;
          text-align: left;
          display: block;
          width: 100%;
          aspect-ratio: 3/4;
          transition: background 0.4s;
        }
        .mb-cat-card:hover { background: #110d07; }

        /* Full bleed image */
        .mb-cat-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s;
          opacity: 0.45;
        }
        .mb-cat-card:hover .mb-cat-img,
        .mb-cat-card.active .mb-cat-img {
          transform: scale(1.06);
          opacity: 0.6;
        }

        /* Gradient overlay */
        .mb-cat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(8,5,2,0.95) 0%,
            rgba(8,5,2,0.5) 40%,
            rgba(8,5,2,0.1) 100%
          );
          transition: opacity 0.4s;
        }
        .mb-cat-card:hover .mb-cat-overlay {
          background: linear-gradient(
            to top,
            rgba(8,5,2,0.98) 0%,
            rgba(8,5,2,0.55) 45%,
            rgba(8,5,2,0.15) 100%
          );
        }

        /* Gold top line on hover */
        .mb-cat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, #c9a96e, transparent);
          transform: scaleX(0);
          transition: transform 0.5s ease;
          z-index: 3;
        }
        .mb-cat-card:hover::before,
        .mb-cat-card.active::before { transform: scaleX(1); }

        /* Content */
        .mb-cat-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 2rem 2rem 2.2rem;
          z-index: 2;
          transform: translateY(8px);
          transition: transform 0.4s ease;
        }
        .mb-cat-card:hover .mb-cat-content { transform: translateY(0); }

        .mb-cat-num {
          font-size: 0.5rem;
          font-weight: 200;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.45);
          margin-bottom: 0.5rem;
          display: block;
        }

        .mb-cat-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 300;
          color: #f5f0e8;
          line-height: 1;
          margin-bottom: 0.5rem;
          letter-spacing: 0.02em;
          transition: color 0.3s;
        }
        .mb-cat-card:hover .mb-cat-name,
        .mb-cat-card.active .mb-cat-name { color: #c9a96e; }

        .mb-cat-desc {
          font-size: 0.58rem;
          font-weight: 200;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
          margin-bottom: 1.4rem;
          display: block;
        }

        .mb-cat-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(201,169,110,0.12);
          padding-top: 1rem;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s;
        }
        .mb-cat-card:hover .mb-cat-footer {
          opacity: 1;
          transform: translateY(0);
        }

        .mb-cat-count {
          font-size: 0.55rem;
          font-weight: 200;
          letter-spacing: 0.2em;
          color: rgba(201,169,110,0.5);
        }

        .mb-cat-explore {
          font-size: 0.55rem;
          font-weight: 300;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a96e;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Number watermark top-right */
        .mb-cat-watermark {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 5rem;
          font-weight: 300;
          color: rgba(201,169,110,0.05);
          line-height: 1;
          z-index: 2;
          pointer-events: none;
          transition: color 0.4s;
        }
        .mb-cat-card:hover .mb-cat-watermark {
          color: rgba(201,169,110,0.08);
        }

        @media (max-width: 768px) {
          .mb-cat-grid { grid-template-columns: 1fr; }
          .mb-cat-card { aspect-ratio: 4/3; }
          .mb-cat-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
        }
      `}</style>

      <section className="mb-cat-section">
        <div className="mb-cat-inner">

          {/* Header */}
          <div className="mb-cat-header">
            <div>
              <p className="mb-cat-eyebrow">What we offer</p>
              <h2 className="mb-cat-heading">
                Explore Our <em>Menu</em>
              </h2>
            </div>
            <a href="/menu" className="mb-cat-view-all">
              Full Menu
            </a>
          </div>

          {/* Cards */}
          <div className="mb-cat-grid">
            {categories.map((item, i) => (
              <button
                key={item.id}
                className={`mb-cat-card${activeTab === item.title ? " active" : ""}`}
                onClick={() => {
                  setActiveTab(item.title);
                  navigate(`/menu/${item.title.toLowerCase().replace(" ", "-")}`);
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Background image */}
                <img className="mb-cat-img" src={item.image} alt={item.title} />

                {/* Overlay */}
                <div className="mb-cat-overlay" />

                {/* Large number watermark */}
                <span className="mb-cat-watermark">0{i + 1}</span>

                {/* Content */}
                <div className="mb-cat-content">
                  <span className="mb-cat-num">0{i + 1}</span>
                  <p className="mb-cat-name">{item.title}</p>
                  <span className="mb-cat-desc">{item.sub}</span>
                  <div className="mb-cat-footer">
                    <span className="mb-cat-count">{item.count}</span>
                    <span className="mb-cat-explore">Explore →</span>
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