import Home from './pages/Home'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import {Success} from './pages/Success'
//import { useSelector } from 'react-redux'

function App() {
  //const user = useSelector((state) => state.user.currentUser)
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        
        <Route path='/products/:category' element={<ProductList/>}/>
        
        <Route path='/product/:id' element={<Product/>}/>
        
        <Route path='/cart' element={<Cart/>}/>

        <Route path='/login' element={<Login/>} />

        <Route path='/register' element={<Register/>}/>
        
        
        {/* <Route path='/success' element={<Success/>}/> */}
        
        
        {/* <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
        <Route path='/register'>
          {user ? <Redirect to='/' /> : <Register />}
        </Route> */}
      </Routes>
    </Router>
  )
}

export default App
