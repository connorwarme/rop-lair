import React, { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { saveObject, returnObject } from '../utility/ls';



const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [oauthError, setOAuthError] = useState(null)

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
        saveObject(data.token, "token")
        // need to deal w/ empty return value so it doesn't throw an error..
        console.log(returnObject("token"))
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
  }

  // oauth login
  const handleOAuth = (platform) => {
    const url = `http://localhost:3000/auth/` + platform
    console.log(url)

    fetch(url, {
      // options
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        // "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,

      }
    })
    .then(res => {
      if (!res.ok) {
        const error = new Error()
        setOAuthError('There was a problem logging in, please try again.')
        error.status = 500
        return res.json({ errors: error })
      }
      console.log('wtf')
      console.log(res.headers.get('location'))
      // basically getting a blank response from my server
      // which doesn't jive with my REST client test
      // const response = Response.redirect(res.location)
      // console.log(res)
      // console.log(res.location)
      // getting a blank response from my server. why?!!??!??!?!?!
      return res.json()
    })
    .then(data => {
      console.log(data)
      if (data.errors) {
        setOAuthError(data.errors)
      } else {
        setOAuthError(null)
        // save token to local storage
        saveObject(data.token, "token")
        // need to deal w/ empty return value so it doesn't throw an error..
        console.log(returnObject("token"))
        // route user to home page w/ data
        navigate('/', { state: data })
      }
    })
    .catch(err => {
      // todo: right now it is just logging an error - that there's no data to parse :(
      console.log(err)
      setOAuthError(err.msg)
    })
  }

  return ( 
    <>
      <div className="login-container">
        <div className="login-content">
          <form className="local-login" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" value={email} onChange={(e) => handleChange(e, setEmail)} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name='password' value={password} onChange={(e) => handleChange(e, setPassword)} />
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
            <button>Sign In</button>
          </form>
          <div className="google-login">
            <button onClick={google}>Sign In with Google+</button>
          </div>
          <div className="facebook-login">
            <button onClick={() => handleOAuth('facebook')}>Sign In with Facebook</button>
          </div>
          <div className="oauth-error">
            { oauthError && <p>{oauthError}</p>}
          </div>
        </div>
      </div>
    </>
   );
}
 
export default Login;