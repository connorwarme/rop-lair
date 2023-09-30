import React, { useState, useEffect, useContext } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { saveObject, returnObject } from '../utility/ls';
import { myContext } from '../contexts/Context';
import banner from "../images/titlebanner.png" 
import fbIcon from "../images/icons/facebook.svg"
import gIcon from "../images/icons/google.svg"
import "../styles/loginStyle.css"

// just got an error trying oauth with google 8/24
// There was an error during the transport or processing of this request. Error code = 7, Path = /v3/signin/_/AccountsSignInUi/data/batchexecute : Unknown HTTP error in underlying XHR (HTTP Status: 0) (XHR Error Code: 6) (XHR Error Message: ' [0]')
// haven't been able to replicate the error 8/24

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [oauthError, setOAuthError] = useState(null)

  // if an error happens verifying the user after oauth login...
  const { setUserObject, setAccess, errorMsg } = useContext(myContext)
  const navigate = useNavigate()

  const handleChange = (e, updateStateFn) => {
    updateStateFn(e.target.value)
  }

  const url = 'http://localhost:3000/auth/local'

  const getData = () => {
    console.log('get data fired!')
    return { email: email, password: password }
  }

  // local
  // handle error - return to login page w/ data, display errors
  // highlight inputs with errors. focus on it..?
  // handle success -> redirect to...user profile?

  const handleSubmit = (e) => {
    // okay, not sure what is going on.
    // I click submit and the form submits. 
    // the initial passport function runs but nothing else in the process...
    // current theory is that I'm failing to pass along the user inputs in the request body
    // but I haven't been able to confirm exactly how to do that / confirm that the data is going through.
    // other theory was that I passed through empty data values
    // I could check if the original state values are what is getting passed along, which would indicate a problem with my react code...
    //
    // update -> currently working. I think I needed to have the getData() to send through most recent input values..
    const data = getData()
    e.preventDefault()
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) {
        const error = new Error()
        setError('There was a problem logging in, please try again.')
        error.status = 500
      }
      return res.json({ errors: error })
    })
    .then(data => {
      // this is giving me user object, access token, and refresh token
      console.log(data)
      if (data.errors) {
        // remove password
        setPassword('')
        // update error
        setError(data.errors)
        // todo: improve UI
        // if error is with email, highlight + focus that field
        // if error is with pw, highlight + focus that field
        // have those errors appear beneath respective fields
        // run validation check once user has spent time fixing either field... (remove highlight, maybe allow sign in button to be pressed)
      } else {
        setError(null)
        // save token to local storage
        saveObject(data.accessToken, "access")
        // set user & set token
        setUserObject(data.user)
        setAccess(data.accessToken)
        // need to deal w/ empty return value so it doesn't throw an error..
        console.log(returnObject("access"))
        // route user to home page w/ data
        navigate('/', { state: data })
      }
    })
    .catch(err => {
      console.log(err)
      setError(err.msg)
    })
  }

  const google = () => {
    window.open('http://localhost:3000/auth/google', "_self")
    // handleOAuth('google')
  }

  const facebook = () => {
    window.open('http://localhost:3000/auth/facebook', "_self")
  }

  // oauth login
  // not using currently (7/13)
  const handleOAuth = (platform) => {
    const url = `http://localhost:3000/auth/` + platform
    console.log(url)

    fetch(url, {
      // options
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": 'https://accounts.google.com/o/oauth2/v2/auth',
      }
    })
    .then(res => {
      if (!res.ok) {
        const error = new Error()
        setOAuthError('There was a problem logging in, please try again.')
        error.status = 500
        return res.json({ errors: error })
      }
      console.log(res)
      return res.json()
    })
    .then(data => {
      console.log(data)
      if (data.errors) {
        setOAuthError(data.errors)
      } else {
        setOAuthError(null)
        // save token to local storage
        saveObject(data.access, "access")
        // need to deal w/ empty return value so it doesn't throw an error..
        console.log(returnObject("access"))
        // route user to home page w/ data
        navigate('/', { state: data })
      }
    })
    .catch(err => {
      console.log(err)
      setOAuthError(err.msg)
    })
  }

  return ( 
    <>
      <div className="login-container">
        <div className="title-container">
          <img src={banner} alt="Lord of the Rings: The Rings of Power" />
          <h1>Fan Lair</h1>
        </div>
        <div className="login-content">
          <form className="local-login" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" value={email} onChange={(e) => handleChange(e, setEmail)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name='password' value={password} onChange={(e) => handleChange(e, setPassword)} />
            </div>
            <div className="local-errors">
              <ul className="errors-list">
              { error && 
                error.map( (err, index) => {
                  if (err.path) {
                    document.querySelector(`input#`+`${err.path}`).classList.add("input-error")
                  }
                return <li key={index}>Error: { err.msg }</li> 
                })
              }
              </ul>
            </div>
            <button>Log In</button>
          </form>
          <div className="or-divider">
            <h3>OR</h3>
          </div>
          <div className="google-login">
            <button onClick={google}><img src={gIcon}></img>Continue with Google+</button>
          </div>
          <div className="facebook-login">
            <button onClick={facebook}><img src={fbIcon}></img>Continue with Facebook</button>
          </div>
          <div className="oauth-error">
            { errorMsg && <p>{errorMsg}</p> }
            { oauthError && <p>{oauthError}</p>}
          </div>
          <div className="guest-login">
            <button onClick={() => console.log('login as guest')}>Continue as Guest</button>
          </div>
          <div className="or-divider">
            <h3>OR</h3>
          </div>
          <div className="create-acct-container">
            <button onClick={() => console.log('create account')}>Create Account</button>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default Login;