// import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom"
import Nav from './components/Nav'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Users from './pages/Users'
import Post from './pages/Post'
import Temp from './components/Temp'
import { useState, useContext } from 'react'
import { myContext } from './contexts/Context'
import CreatePost from './pages/CreatePost'
import AddFriend from './components/AddFriend'
import UserProfile from './pages/UserProfile'
import OtherProfile from './pages/OtherProfile'

export default function App() {

  const { userObject, setUserObject } = useContext(myContext)
  console.log(userObject)
  // how to utilize userObject?
  // how to protect routes on frontend?
  // how to send auth header when needed?
  // how to refresh token when needed?

  const [ list, setList ] = useState({
    list: ['6495da6d5dea80fc65a0a443', '6495da6d5dea80fc65a0a449'],
    pending: ['6495da6d5dea80fc65a0a443', '6495da6d5dea80fc65a0a446'],
    request: ['6495da6d5dea80fc65a0a447'],
  })
  let newlist = {
    list: ['6495da6d5dea80fc65a0a443', '6495da6d5dea80fc65a0a449'],
    pending: ['6495da6d5dea80fc65a0a443'],
    request: ['6495da6d5dea80fc65a0a445', '6495da6d5dea80fc65a0a447'],
  }
  const setNew = (listObject) => {
    const newObj = {...userObject}
    newObj.friend_list = listObject
    setUserObject(newObj)
  }

  return (
    <>
        <Nav />
        <div className="content">
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/auth/success' element={ <Temp /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/signup' element={ <SignUp /> } />
            <Route path='/users' element={ <Users />} />
            <Route path='/profile' element={ <UserProfile /> } />
            <Route path='/profile/:id' element={ <OtherProfile /> } />
            <Route path='/post/create' element={ <CreatePost /> } />
            <Route path='/post/:id' element={ <Post /> } />
            <Route />
          </Routes>
        </div>
    </>
  )
}


