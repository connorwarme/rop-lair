// import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom"
import Nav from './components/Nav'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Post from './pages/Post'

export default function App() {

  return (
    <>
      <Nav />
      <div className="content">
        <Routes>
          <Route path='/' />
          <Route path='/login' />
          <Route path='/signup' />
          <Route path='/profile' />
          <Route path='/post' />
          <Route />

          {/* <Home /> */}
        {/* <Profile /> */}
        <Login />
        {/* <SignUp /> */}
        {/* <Post /> */}
        </Routes>
      </div>
    </>
  )
}


