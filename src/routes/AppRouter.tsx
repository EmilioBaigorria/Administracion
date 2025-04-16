import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Products } from '../componets/screens/Products/Products'
import { Categories } from '../componets/screens/Categories/Categories'

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
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
