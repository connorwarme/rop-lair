// import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom"
import Nav from './components/Nav'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Post from './pages/Post'
import Temp from './components/Temp'
import { useState, useContext } from 'react'
import { myContext } from './contexts/Context'
import CreatePost from './pages/CreatePost'

export default function App() {

  const { userObject } = useContext(myContext)
  console.log(userObject)
  // how to utilize userObject?
  // how to protect routes on frontend?
  // how to send auth header when needed?
  // how to refresh token when needed?
  return (
    <>
        <Nav />
        <div className="content">
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/auth/success' element={ <Temp /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/signup' element={ <SignUp /> } />
            <Route path='/profile' element={ <Profile /> } />
            <Route path='/post/create' element={ <CreatePost /> } />
            <Route path='/post/:id' element={ <Post /> } />
            <Route />
          </Routes>
        </div>
    </>
  )
}


