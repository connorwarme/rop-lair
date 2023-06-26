// import { useState } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'

import './App.css'

export default function App() {

  return (
    <>
      <Nav />
      <div className="content">
        <Home />
      </div>
    </>
  )
}


