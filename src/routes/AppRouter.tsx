import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<p>Administracion</p>} />
        </Routes>
    </BrowserRouter>
  )
}
