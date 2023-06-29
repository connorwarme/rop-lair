// import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

export default function App() {

  return (
    <>
      <Nav />
      <div className="content">
        <Home />
        <Profile />
        <Login />
        <SignUp />
      </div>
    </>
  )
}


