import Home from './pages/Home'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        
        <Route path=':slug' element={<ProductList/>}/>
        
        <Route path='product/:id' element={<Product/>}/>
        
        <Route path='/cart' element={<Cart/>}/>

        <Route path='/login' element={<Login/>} />

        <Route path='/register' element={<Register/>}/>
        
      </Routes>
    </Router>
  )
}

export default App
