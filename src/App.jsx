// import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom"
import Nav from './components/Nav'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Post from './pages/Post'
import { useContext } from 'react'
import { myContext } from './components/Context'

export default function App() {
  const userObject = useContext(myContext)
  console.log(userObject)
  return (
    <>
      <Nav />
      <div className="content">
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/:access' element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <SignUp /> } />
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/post/:id' element={ <Post /> } />
          <Route />
        </Routes>
      </div>
    </>
  )
}


