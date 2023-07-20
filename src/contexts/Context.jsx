import React, { createContext, useState, useEffect } from "react"
import axios from "axios"
import { saveObject, returnObject } from '../utility/ls';

export const myContext = createContext({})

const Context = (props) => {
  const [userObject, setUserObject] = useState(null)
  useEffect(() => {
    // need a check (scenario where return object comes back as null)
    const token = returnObject("access")

    axios.get("http://localhost:3000/auth/user", {
      headers: {
        "Authorization": "Bearer " + token
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
  }, [])

  return ( 
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
   )
}
 
export default Context