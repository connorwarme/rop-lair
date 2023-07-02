import React, { useState, useEffect } from 'react';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleChange = (e, updateStateFn) => {
    updateStateFn(e.target.value)
  }

  const url = 'http://localhost:3000/auth/local'

  // why is the browser blocking my request to outside resource (aka my backend)?

  // removed headers and it goes through, but gives error - user not found (in db).
  // not sure why?? is a user currently logged in? need to debug...
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
        throw Error('There was a problem logging in, please try again.')
      }
      return res.json()
    })
    .then(data => {
      console.log(data)
      setError(null)
      // redirect to home page w/ user data
    })
    .catch(err => {
      console.log(err)
      setError(err.messsage)
    })
  }

  // local
  // handle error - return to login page w/ data, display errors
  // handle success -> redirect to...user profile?
  // create my own function to run when the user clicks submit.
  // have it try and submit the login to the backend, then respond accordingly. 
  return ( 
    <>
      <div className="login-container">
        <div className="login-content">
          <form className="local-login" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" value={email} onChange={(e) => handleChange(e, setEmail)} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name='password' value={password} onChange={(e) => handleChange(e, setPassword)} />
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