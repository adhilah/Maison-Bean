import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/heroSection'
import ProductCategories from '../components/ProductCategories'
import Footer from '../components/Footer'
import Card from '../components/FeaturedProducts'
import { Link } from 'react-router-dom'
// import ProductCard from '../components/card'
// import FeaturedProductCard from '../components/FeaturedProduct'

function Home() {

  const scrollToMenu = () => {
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar />
      <HeroSection />
      <ProductCategories />
      
      <Card />


      {/* Sticky Menu Button =============================================================================*/}

      <Link to="/menu">
      <button
        onClick={scrollToMenu}
        className="fixed bottom-6 right-6 z-50 
             bg-amber-700/60 backdrop-blur-lg text-white 
             px-8 py-2
            //  rounded-3xl 
             shadow-xl 
             ring-1 ring-gray/70
             flex items-center gap-4 
             text-xl font-medium 
             hover:bg-amber-800/70 
             hover:backdrop-blur-xl 
             hover:shadow-2xl 
             hover:ring-white/60
             transition-all duration-500 ease-out 
             hover:scale-110 
             active:scale-95"
  aria-label="View Full Menu">
        <span className="text-2xl">☰</span>
        Menu
      </button>
      </Link>
      {/* <FeaturedProductCard /> */}
      {/* <ProductCard /> */}
      <Footer />
    </div>
  )
}

export default Home