import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/heroSection'
import ProductCategories from '../components/ProductCategories'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import ProductCard from '../components/card'
// import FeaturedProductCard from '../components/FeaturedProduct'

function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ProductCategories />
      
      <Card />
      {/* <FeaturedProductCard /> */}
      {/* <ProductCard /> */}
      <Footer />
    </div>
  )
}

export default Home