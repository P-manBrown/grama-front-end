import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Page404 } from '../components/Page404'
import { SignIn } from "../components/SignIn"
import { SignUp } from "../components/SignUp"


export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="sign_in" element={<SignIn />} />
        <Route path="sign_up" element={<SignUp />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}
