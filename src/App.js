import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.css"
import Sidebar from './components/Sidebar'
import Contact from './pages/Contact'
import CustomerRegistration from './pages/CustomerRegistration'
import Dashboard from './pages/Dashboard'

import Login from './pages/Login'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Sidebar>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/register' element={<CustomerRegistration/>}/>
    </Routes>
    </Sidebar>
    </BrowserRouter>
    </>
  )
}

export default App