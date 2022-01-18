import React from "react"
import "./App.css"
import axios from "axios"
import { Router } from "../router/Router"
import { AuthProvider } from "../providers/AuthProvider"

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}


