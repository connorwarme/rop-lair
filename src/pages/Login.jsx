import React, { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { saveObject, returnObject } from '../utility/ls';



const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e, updateStateFn) => {
    updateStateFn(e.target.value)
  }

  const url = 'http://localhost:3000/auth/local'

  const getData = () => {
    console.log('get data fired!')
    return { email: email, password: password }
  }
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

  // local
  // handle error - return to login page w/ data, display errors
  // highlight inputs with errors. focus on it..?
  // handle success -> redirect to...user profile?

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
            <a href="/auth/google">Sign In with Google+</a>
          </div>
          <div className="facebook-login">
            <a href="/auth/facebook">Sign In with Facebook</a>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default Login;