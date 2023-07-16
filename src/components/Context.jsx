import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const myContext = createContext({})

const Context = (props) => {
  const [userObject, setUserObject] = useState(null)
  useEffect(() => {
    axios.get("http://localhost:3000/auth/user", { withCredentials: true })
      .then(res => {
        if (res.data) {
          console.log(res)
          setUserObject(res.data)
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