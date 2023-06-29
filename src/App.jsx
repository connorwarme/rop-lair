// import { useState } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'

import './App.css'

export default function App() {

  return (
    <>
      <Nav />
      <div className="content">
        <Home />
        <Profile />
        <Login />
      </div>
    </>
  )
}


