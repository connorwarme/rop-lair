import React, { createContext, useState, useEffect } from "react"
import axios from "axios"
import { saveObject, returnObject } from '../utility/ls';

export const myContext = createContext({})

const Context = (props) => {
  const [userObject, setUserObject] = useState(null)
  const [access, setAccess] = useState(null)
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
            setUserObject(res.data.user)
          // save access and refresh tokens to local storage?
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
  }, [ access ])

  return ( 
    <myContext.Provider value={{ userObject, access, setAccess }}>{props.children}</myContext.Provider>
   )
}
 
export default Context