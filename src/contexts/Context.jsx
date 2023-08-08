import React, { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { saveObject, returnObject } from '../utility/ls';

export const myContext = createContext({})

const Context = (props) => {
  const [userObject, setUserObject] = useState(null)
  const [access, setAccess] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const navigate = useNavigate()

  // useEffect(() => {
  //   // if in local storage, save to React state
  //   // need a check (scenario where return object comes back as null)
  //   const accessToken = returnObject("access")
  //   console.log(accessToken)
  //   if (accessToken) {
  //     setAccess(accessToken)
  //   }
  //   console.log(access)
  // }, [])
  useEffect(() => {
    const accessToken = JSON.parse(returnObject("access"))
    const abortController = new AbortController()
    if (accessToken) {
      setAccess(accessToken)
      axios.get("http://localhost:3000/auth/user", {
        headers: {
          "Authorization": "Bearer "+ accessToken
        }, 
        signal: abortController.signal,
      })
        .then(res => {
          if (res.status === 200 && res.data.user) {
            console.log(res.data)
            setUserObject(res.data.user)
          // save access and refresh tokens to local storage?
          }
        })
        .catch(err => {
          if (err.name === 'CanceledError') {
            console.log('fetch aborted (component unmounted before completed)')
          } else {
            console.log(err)
            setErrorMsg(`${err.response.status} ${err.response.statusText}: ${err.response.data.message} Please try again.`)
          }
          // navigate to login page w/ err message (maybe pass it through state)
          // haven't check this
          // problem is that it runs an error once in the login phase...takes you back to /login, even though the login worked.
          // navigate("/login")
        })
      }

      return () => abortController.abort()
  }, [ access ])

  const makeHeader = () => {
    const currentAccess = access
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${currentAccess}`,
    }
  }

  return ( 
    <myContext.Provider value={{ userObject, setUserObject, access, setAccess, errorMsg, setErrorMsg, makeHeader }}>{props.children}</myContext.Provider>
   )
}
 
export default Context