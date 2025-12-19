import React from 'react'
import { Routes,Route } from 'react-router-dom'
import RegistrationPage from './components/RegistrationPage'
import Home from './components/Home'
import Login from './components/Login'

function MainRouter() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </div>
  )
}

export default MainRouter