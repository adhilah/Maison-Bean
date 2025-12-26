import React from 'react'
import { Routes,Route } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import Home from './pages'
import Login from './pages/Login'
import HeroSection from './components/heroSection'
import Wishlist from './components/Wishlist'
import Cart from './components/Cart'
import Cards from './components/cards/MainProducts'
import CustomizeProduct from "./components/customization/CustomizeProduct";
import CustomizePage from './components/customization/CustomizationPage'



// import ProductCard from './components/ProductCard'


function  MainRouter() {
  return (
    <div>
        <Routes>

            <Route path='/' element={<Home />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />}/>
            <Route path="/herosection" element={<HeroSection />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/login' element={<Login />} />
            <Route path="/menu" element={<Cards />} />
            <Route path="/menu/:category" element={<Cards />} />
             <Route path="/customize/:id" element={<CustomizeProduct />}/>
            <Route path="/customize" element={<CustomizePage />} />
            {/* <Route path='/product' element={<ProductCard />}/> */}

      
        </Routes>
    </div>
  )
}

export default MainRouter