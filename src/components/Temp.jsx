import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveObject } from "../utility/ls";
import { myContext } from '../contexts/Context'
import custom from "../images/icons/custom2.svg"

// maybe this screen just shows a loading / spin wheel...then navigates to home

const Temp = () => {

  const { setAccess } = useContext(myContext)

  const navigate = useNavigate()

  useEffect(() => {
    // changing on 12/11 to try and debug
    // axios.get("https://rings-of-power.fly.dev/auth/oauth", {
    // // axios.get("http://localhost:3000/auth/oauth", {
    //   withCredentials: true,
    // })
    // .then(res => {
    //   if (res.status === 200 && res.data.accessToken) {
    //     // should be getting user and accessToken and refreshToken
    //     // i guess i just need the tokens...
    //     setAccess(res.data.accessToken)
    //     saveObject(res.data.accessToken, "access")
    //     // navigate to home page
    //     // do i need to pass through any state?
    //     navigate("/")
    //   }
    // })
    // .catch(err => {
    //   console.log(err)
    //   // if they don't get a token, then redirect to login page?
    //   navigate("/login")
    // })
    // fetch("https://rings-of-power.fly.dev/auth/oauth", {
    // axios.get("http://localhost:3000/auth/oauth", {
    fetch("https://rings-of-power.fly.dev/auth/oauth", {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => {
      if (!res.ok) {
          throw Error('There was a problem getting a response from the server.')
        }
        return res.json()
    })
    .then(data => {
      console.log(data)
      if (data.accessToken) {
        setAccess(data.accessToken)
        saveObject(data.accessToken, "access")
        // navigate to home page
        navigate("/")
      }
    })
    .catch(err => {
      console.log(err)
      // if they don't get a token, then redirect to login page?
      navigate("/login")
    })
  }, [])

  return ( 
    <>
    <div className="success-container">
      <div className='spinner-loading-container'>
        <img src={custom} />  
        <h1>Login successful, redirecting...</h1>
      </div>
    </div>
    </>
   );
}
 
export default Temp;