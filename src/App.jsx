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
          <Route path='/' element={ <Home data="null" /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <SignUp /> } />
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/post' element={ <Post /> } />
          <Route />
        </Routes>
      </div>
    </>
  )
}


