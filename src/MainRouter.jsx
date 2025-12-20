import React from 'react'
import { Routes,Route } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import Home from './pages/Home'
import Login from './pages/Login'
import HeroSection from './components/heroSection'
import Wishlist from './components/Wishlist'
import Cart from './components/cart'


function MainRouter() {
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
        </Routes>
    </div>
  )
}

export default MainRouter