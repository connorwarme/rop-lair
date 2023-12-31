import './App.css'
import { Route, Routes } from "react-router-dom"
import Nav from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import Users from './pages/Users'
import Post from './pages/Post'
import Temp from './components/Temp'
import CreatePost from './pages/CreatePost'
import UserProfile from './pages/UserProfile'
import OtherProfile from './pages/OtherProfile'
import Footer from './components/Footer'

export default function App() {

  // how to utilize userObject?
  // how to protect routes on frontend?
  // how to send auth header when needed?
  // how to refresh token when needed?
  const setBgPhoto = (source, position) => {
    const rootDiv = document.getElementById('root')
    rootDiv.style.backgroundImage = `url(${source})`
    rootDiv.style.backgroundPosition = position ? position : 'center center'
    rootDiv.style.backgroundRepeat = 'no-repeat'
    rootDiv.style.backgroundAttachment = 'fixed'
    rootDiv.style.backgroundSize = 'cover'
  }

  return (
    <>
      <Nav />
      <div className="content">
        <Routes>
          <Route path='/' element={ <Home setBg={setBgPhoto} /> } />
          <Route path='/auth/success' element={ <Temp /> } />
          <Route path='/login' element={ <Login setBg={setBgPhoto} /> } />
          <Route path='/users' element={ <Users setBg={setBgPhoto} />} />
          <Route path='/profile' element={ <UserProfile setBg={setBgPhoto} /> } />
          <Route path='/profile/:id' element={ <OtherProfile setBg={setBgPhoto} /> } />
          <Route path='/post/create' element={ <CreatePost setBg={setBgPhoto} /> } />
          <Route path='/post/:id' element={ <Post setBg={setBgPhoto} /> } />
        </Routes>
      </div>
      <Footer />
    </>
  )
}


