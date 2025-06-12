
import { BrowserRouter, Route, Routes } from 'react-router'
import { Categories } from '../components/screens/Categories/Categories'
import { Discounts } from '../components/screens/Discounts/Discounts'
import { Login } from '../components/screens/Login/Login'
import { Products } from '../components/screens/Products/Products'
import { Sizes } from '../components/screens/Sizes/Sizes'

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={
              <Login/>
            } />
            <Route path='/products' element={
              <Products/>
            } />
            <Route path='/categories' element={
              <Categories/>
            }/>
            <Route path='/talles' element={
              <Sizes/>
            }/>
            <Route path='/descuento' element={
              <Discounts/>
            }/>
             <Route path='*' element={
              <div>Error 404 not found</div>
            }/>
        </Routes>
    </BrowserRouter>
  )
}
