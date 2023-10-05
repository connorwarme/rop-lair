import React, { useState, useEffect, useContext } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { saveObject, returnObject } from '../utility/ls';
import { myContext } from '../contexts/Context';
import banner from "../images/titlebanner.png"
import errorIcon from "../images/icons/error.svg" 
import fbIcon from "../images/icons/facebook.svg"
import gIcon from "../images/icons/google.svg"
import SignUp from '../components/Signup';
import "../styles/loginStyle.css"

// just got an error trying oauth with google 8/24
// There was an error during the transport or processing of this request. Error code = 7, Path = /v3/signin/_/AccountsSignInUi/data/batchexecute : Unknown HTTP error in underlying XHR (HTTP Status: 0) (XHR Error Code: 6) (XHR Error Message: ' [0]')
// haven't been able to replicate the error 8/24

const Login = () => {
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState(null)
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState(null)
  // adding state to deal with displaying error colors or not...still needs work 
  const [error, setError] = useState(null)
  const [oauthError, setOAuthError] = useState(null)
  const [login, setLogin] = useState(true)
  const [signup, setSignup] = useState(false)

  // if an error happens verifying the user after oauth login...
  const { setUserObject, setAccess, errorMsg } = useContext(myContext)
  const navigate = useNavigate()

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
        handleErrors(data.errors)
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
  const handleErrors = (array) => {
    array.forEach(index => {
      if (index.path) {
        if (index.path == 'email') {
          setEmailErr(true)
        } else if (index.path == 'password') {
          setPasswordErr(true)
        }
      }
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
  const handleField = (event, setState, setError, length) => {
    setState(event.target.value)
    if (event.target.classList && event.target.value.length > length) {
      setError(null)
    }
  }
  const handleCreate = () => {
    setLogin(false)
    setSignup(true)
    setError(null)
    setOAuthError(null)
  }
  const handleCancelSignup = () => {
    setSignup(false)
    setLogin(true)
  }

  return ( 
    <>
      <div className="login-container">
        <div className="title-container">
          <img src={banner} alt="Lord of the Rings: The Rings of Power" />
          <h1>Fan Lair</h1>
        </div>
        { login && ( 
          <>
            <div className="login-content">
              <div className="login-position">
                <form className="local-login" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" className={emailErr ? 'input-error' : null} id="email" name="email" value={email} onChange={(e) => handleField(e, setEmail, setEmailErr, 0)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className={passwordErr ? 'input-error' : null} id="password" name='password' value={password} onChange={(e) => handleField(e, setPassword, setPasswordErr, 5)} />
                  </div>
                  <div className="local-errors errors">
                    { error && 
                      error.map( (err, index) => <div key={index}><img src={errorIcon}/><p>{err.msg}</p></div> )
                    }
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
                  { errorMsg && <div><img src={errorIcon}/><p>{errorMsg}</p></div> }
                  { oauthError && <div><img src={errorIcon}/><p>{oauthError}</p></div>}
                </div>
                <div className="guest-login">
                  <button onClick={() => console.log('login as guest')}>Continue as Guest</button>
                </div>
                <div className="or-divider">
                  <h3>OR</h3>
                </div>
                <div className="create-acct-container">
                  <button onClick={handleCreate}>Create Account</button>
                </div>
              </div>
            </div>
            </>
        )}
        { signup && <SignUp cancelFn={handleCancelSignup} /> }    
      </div>
    </>
   );
}
 
export default Login;