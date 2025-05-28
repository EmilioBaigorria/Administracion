
import { BrowserRouter, Route, Routes } from 'react-router'
import { Products } from '../componets/screens/Products/Products'
import { Categories } from '../componets/screens/Categories/Categories'
import { Login } from '../componets/screens/Login/Login'

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
             <Route path='*' element={
              <div>Error 404 not found</div>
            }/>
        </Routes>
    </BrowserRouter>
  )
}
