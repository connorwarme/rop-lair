import { createContext, useState, useEffect } from "react"
import axios from "axios"
import { returnObject } from '../utility/ls';
import icon from "../images/icons/accountIcon.svg"

export const myContext = createContext({})

const Context = (props) => {
  const [userObject, setUserObject] = useState(null)
  const [userPhoto, setUserPhoto] = useState(icon)
  const [access, setAccess] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    const accessToken = JSON.parse(returnObject("access"))
    const abortController = new AbortController()
    if (accessToken) {
      setAccess(accessToken)
      axios.get("https://rings-of-power.fly.dev/auth/user", {
      // axios.get("http://localhost:3000/auth/user", {
        headers: {
          "Authorization": "Bearer "+ accessToken,
        }, 
        signal: abortController.signal,
      })
        .then(res => {
          if (res.status === 200 && res.data.user) {
            setUserObject(res.data.user)
          // save access and refresh tokens to local storage?
          }
          if (res.status === 200 && res.data.photo) {
            setUserPhoto(res.data.photo)
          }
        })
        .catch(err => {
          if (err.name === 'CanceledError') {
            console.log('fetch aborted (component unmounted before completed)')
          } else {
            console.log(err)
            if (err.response) {
              setErrorMsg(`${err.response.status} ${err.response.statusText}: ${err.response.data.message} Please try again.`)
            } 
          }
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
    <myContext.Provider value={{ userObject, setUserObject, userPhoto, setUserPhoto, access, setAccess, errorMsg, setErrorMsg, makeHeader }}>{props.children}</myContext.Provider>
   )
}
 
export default Context