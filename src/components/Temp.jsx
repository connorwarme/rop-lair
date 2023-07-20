import { useState, useEffect } from "react";
import axios from "axios";

// maybe this screen just shows a loading / spin wheel...then navigates to home

const Temp = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:3000/auth/oauth", {
      withCredentials: true,
    })
    .then(res => {
      console.log(res)
      if (res.data) {
        // should be getting user and accessToken and refreshToken
        setUser(res.data)
        // i guess i just need the tokens...

        // navigate to home page
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
      <button onClick={() => console.log(user)}>Click Me</button>
      { user && <h4>{user.first_name}</h4> }
    </>
   );
}
 
export default Temp;