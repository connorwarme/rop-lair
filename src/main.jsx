import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Context from './contexts/Context.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/rop-lair/'>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  </React.StrictMode>,
)
