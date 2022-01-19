import React from "react"
import "./App.css"
import { Router } from "../router/Router"
import { AuthProvider } from "../providers/AuthProvider"
import { SignIn } from "./SignIn"

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}


