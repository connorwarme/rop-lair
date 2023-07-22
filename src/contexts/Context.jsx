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
    if (accessToken) {
      setAccess(accessToken)
      axios.get("http://localhost:3000/auth/user", {
        headers: {
          "Authorization": "Bearer "+ accessToken
        }
      })
        .then(res => {
          if (res.status === 200 && res.data.user) {
            console.log(res.data)
            setUserObject(res.data.user.user)
          // save access and refresh tokens to local storage?
          }
        })
        .catch(err => {
          console.log(err)
          // navigate to login page w/ err message (maybe pass it through state)
          // haven't check this
          setErrorMsg(`${err.response.status} ${err.response.statusText}: ${err.response.data.message} Please try again.`)
          navigate("/login")
        })
      }
  }, [ access ])

  return ( 
    <myContext.Provider value={{ userObject, access, setAccess, errorMsg, setErrorMsg }}>{props.children}</myContext.Provider>
   )
}
 
export default Context