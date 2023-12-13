import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveObject } from '../utility/ls';
import { myContext } from '../contexts/Context';
import banner from "../images/titlebanner.png"
import errorIcon from "../images/icons/error.svg" 
import fbIcon from "../images/icons/facebook.svg"
import gIcon from "../images/icons/google.svg"
import SignUp from '../components/Signup';
import check from "../images/icons/accept.svg"
import "../styles/loginStyle.css"

// just got an error trying oauth with google 8/24
// There was an error during the transport or processing of this request. Error code = 7, Path = /v3/signin/_/AccountsSignInUi/data/batchexecute : Unknown HTTP error in underlying XHR (HTTP Status: 0) (XHR Error Code: 6) (XHR Error Message: ' [0]')
// haven't been able to replicate the error 8/24

const Login = () => {
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState(null)
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(null)
  // adding state to deal with displaying error colors or not...still needs work 
  const [error, setError] = useState(null)
  const [oauthError, setOAuthError] = useState(null)
  const [login, setLogin] = useState(true)
  const [signup, setSignup] = useState(false)

  // if an error happens verifying the user after oauth login...
  const { setUserObject, setAccess, errorMsg } = useContext(myContext)
  const navigate = useNavigate()

  const url = 'https://rings-of-power.fly.dev/auth/local'

  const getData = () => {
    return { email: email, password: password }
  }

  // local
  // handle error - return to login page w/ data, display errors
  // highlight inputs with errors. focus on it..?
  // handle success -> redirect to...user profile?

  const handleSubmit = (e) => {
    setLoading(true)
    const data = getData()
    e.preventDefault()
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // don't think this should be here, commenting out 12/10 but not testing that currently...
        // "Access-Control-Allow-Origin": "*",
        },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) {
        const error = new Error()
        setLoading(false)
        setError('There was a problem logging in, please try again.')
        error.status = 500
      }
      return res.json({ errors: error })
    })
    .then(data => {
      // this is giving me user object, access token, and refresh token
      if (data.errors) {
        setLoading(false)
        // remove password
        setPassword('')
        // update error
        setError(data.errors)
        handleErrors(data.errors)
        setSuccess(false)
      } else {
        setError(null)
        setLoading(false)
        setSuccess(true)
        // save token to local storage
        saveObject(data.accessToken, "access")
        // set user & set token
        setUserObject(data.user)
        setAccess(data.accessToken)
        // need to deal w/ empty return value so it doesn't throw an error..
        // route user to home page w/ data
        navigate('/', { state: data })
      }
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
      setSuccess(false)
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
    // changing on 12/11 to try and debug
    window.open('https://rings-of-power.fly.dev/auth/google', "_self")
    // window.open('http://localhost:3000/auth/google', "_self")
  }

  const facebook = () => {
    // changing on 12/11 to try and debug
    window.open('https://rings-of-power.fly.dev/auth/facebook', "_self")
    // window.open('http://localhost:3000/auth/facebook', "_self")
  }
  const handleGuest = () => {
    const url = 'https://rings-of-power.fly.dev/auth/guest'
    const data = {
      email: 'filler',
      password: 'filler',
    }
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        const error = new Error()
        setLoading(false)
        setError('There was a problem logging in, please try again.')
        error.status = 500
      }
      return response.json({ errors: error })
    })
    .then(intel => {
      // this is giving me user object, access token
      if (intel.errors) {
        console.log(intel.errors)
      } else {
        // save token to local storage
        saveObject(intel.accessToken, "access")
        // set user & set token
        setUserObject(intel.user)
        setAccess(intel.accessToken)
        // route user to home page w/ data
        navigate('/', { state: intel })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  // oauth login
  // not using currently (7/13)
  const handleOAuth = (platform) => {
    const url = `https://rings-of-power.fly.dev/auth/` + platform

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
      return res.json()
    })
    .then(data => {
      if (data.errors) {
        setOAuthError(data.errors)
      } else {
        setOAuthError(null)
        // save token to local storage
        saveObject(data.access, "access")
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
    <div className='loginDiv'>
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
                  <button>
                    { (emailErr || passwordErr) && (
                      <img src={errorIcon} alt='Error!' className='local-login-error'/>
                    )}
                    { (!emailErr && !passwordErr) && (
                      <>
                        { (!success && !loading) && <span>Log In</span> }
                        { (!success && loading) && (
                          <>
                            <div className="local-login-loading">
                              <span className="friend-loader-element"></span>
                              <span className="friend-loader-element"></span>
                              <span className="friend-loader-element"></span>
                            </div>
                          </>
                        )}
                        { success && <img src={check} alt='Log In' className='local-login-success' /> }
                      </>
                    )}
                  </button>
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
                  <button onClick={handleGuest}>Continue as Guest</button>
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
    </div>
   );
}
 
export default Login;