import './App.css'
import { Routes, Route } from 'react-router-dom'
import Menu from "./pages/menu"
import Dashboard from "./pages/dashboard/dashboard"
import Category from './pages/category/category'
import Restaurant from './pages/restaurant/restaurant'
import Branch from './pages/branch/branch'
import Food from './pages/food/food'
import Order from './pages/order/order'

function App() {

  return (
    <>
    <div className="container">
      <Menu/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/restaurant' element={<Restaurant/>}/>
        <Route path='/branch' element={<Branch/>}/>
        <Route path='/food' element={<Food/>}/>
        <Route path='/order' element={<Order/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
