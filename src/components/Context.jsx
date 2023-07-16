import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const myContext = createContext({})

const Context = (props) => {
  const [userObject, setUserObject] = useState(null)
  useEffect(() => {
    axios.get("http://localhost:3000/auth/user", { withCredentials: true })
      .then(res => {
        if (res.status === 200 && res.data.user) {
          console.log(res.data)
          setUserObject(res.data.user)
          // need to deal with the access and refresh tokens
          // save to local storage?
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