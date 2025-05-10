
import { BrowserRouter, Route, Routes } from 'react-router'
import { Products } from '../componets/screens/Products/Products'
import { Categories } from '../componets/screens/Categories/Categories'
import { Login } from '../componets/screens/Login/Login'

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={
              <Login/>
            } />
            <Route path='/' element={
              <Products/>
            } />
            <Route path='/categories' element={
              <Categories/>
            }/>
        </Routes>
    </BrowserRouter>
  )
}
