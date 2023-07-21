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
import { LoginContext } from './contexts/LoginContext'

export default function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const { userObject } = useContext(myContext)
  console.log(userObject)
  // how to utilize userObject?
  // how to protect routes on frontend?
  // how to send auth header when needed?
  // how to refresh token when needed?
  return (
    <>
      <LoginContext.Provider value={{ token, setToken, user, setUser }}>
      <Nav />
        <div className="content">
        { token ? <h1>I have the token!</h1> : <h1>no token!</h1>}
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/auth/success' element={ <Temp /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/signup' element={ <SignUp /> } />
            <Route path='/profile' element={ <Profile /> } />
            <Route path='/post/:id' element={ <Post /> } />
            <Route />
          </Routes>
        </div>
      </LoginContext.Provider>
    </>
  )
}


