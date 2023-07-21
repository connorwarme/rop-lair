import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveObject } from "../utility/ls";
import { LoginContext } from "../contexts/LoginContext";
import { myContext } from '../contexts/Context'

// maybe this screen just shows a loading / spin wheel...then navigates to home

const Temp = () => {
  // is there any need for a user state obj? 7/20
  // const [user, setUser] = useState(null)
  // const { setToken } = useContext(LoginContext)
  const { setAccess } = useContext(myContext)

  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3000/auth/oauth", {
      withCredentials: true,
    })
    .then(res => {
      console.log(res)
      if (res.status === 200 && res.data.accessToken) {
        // should be getting user and accessToken and refreshToken
        // i guess i just need the tokens...
        // setToken(res.data.accessToken)
        setAccess(res.data.accessToken)
        saveObject(res.data.accessToken, "access")
        // navigate to home page
        // do i need to pass through any state?
        navigate("/")
      }
    })
    .catch(err => {
      console.log(err)
      // navigate to login page w/ err message (maybe pass it through state)
    })
  }, [])

  return ( 
    <>
      <h1>Temp Auth Success.. not sure what to do. </h1>
    </>
   );
}
 
export default Temp;