// import React from 'react'
// import Navbar from '../components/Navbar'
// import HeroSection from '../components/heroSection'
// import ProductCategories from '../components/ProductCategories'
// import Footer from '../components/Footer'
// import Card from '../components/FeaturedProducts'
// import { Link } from 'react-router-dom'
// // import ProductCard from '../components/card'
// // import FeaturedProductCard from '../components/FeaturedProduct'

// function Home() {

//   const scrollToMenu = () => {
//     document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div>
//       <Navbar />
//       <HeroSection />
//       <ProductCategories />
      
//       <Card />


//       {/* Sticky Menu Button =============================================================================*/}

//       <Link to="/menu">
//       <button
//         onClick={scrollToMenu}
//         className="fixed bottom-6
//              bg-[#7a5c2a]/85 backdrop-blur-lg text-white 
//              px-8 py-2
//             //  rounded-3xl 
//              shadow-xl 
//              ring-1 ring-gray/70
//              flex items-center gap-4 
//              text-xl font-medium 
//              hover:bg-[#7a5c2a]/70
//              hover:backdrop-blur-xl 
//              hover:shadow-2xl 
//              hover:ring-white/60
//              transition-all duration-500 ease-out 
//              hover:scale-110 
//              active:scale-95"
//   aria-label="View Full Menu">
//         <span className="text-2xl">☰</span>
//         Menu
//       </button>
//       </Link>
//       {/* <FeaturedProductCard /> */}
//       {/* <ProductCard /> */}
//       <Footer />
//     </div>
//   )
// }

// export default Home



import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/heroSection";
import ProductCategories from "../components/ProductCategories";
import Footer from "../components/Footer";
import Card from "../components/FeaturedProducts";
import { Link } from "react-router-dom";

function Home() {
  const scrollToMenu = () => {
    document
      .getElementById("menu-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Categories */}
      <section className="px-4 sm:px-6 lg:px-12">
        <ProductCategories />
      </section>

      {/* Featured Products */}
      <section className="px-4 sm:px-6 lg:px-12 mt-8">
        <Card />
      </section>

      {/* Sticky Menu Button */}
      <Link to="/menu">
        <button
          onClick={scrollToMenu}
          aria-label="View Full Menu"
          className="
            fixed bottom-5 right-5 z-50
            bg-[#7a5c2a]/90 backdrop-blur-lg text-white
            px-5 py-2 sm:px-7 sm:py-3
            rounded-full
            shadow-xl
            ring-1 ring-white/30
            flex items-center gap-2 sm:gap-3
            text-base sm:text-lg font-medium
            hover:bg-[#7a5c2a]/75
            hover:shadow-2xl
            transition-all duration-300
            active:scale-95
          "
        >
          <span className="text-xl sm:text-2xl">☰</span>
          Menu
        </button>
      </Link>

      <Footer />
    </div>
  );
}

export default Home;
