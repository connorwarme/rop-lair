import { useState } from "react";
import axios from "axios";

const Temp = () => {
  const [user, setUser] = useState(null)

  const getUser = () => {
    // get cookie
    // send axios req w/ cookie to backend
    // get userid, deserialize user
    // then make JWT and return token
    // setUser on client, show it on temp page
    // const cookie = document.cookie
    // const connect = cookie.split('=')[1]

    axios.get("http://localhost:3000/login/failed", {
      withCredentials: true,
    })
      .then(res => {
        console.log(res)
        // if (res.status === 200 && res.data.user) {
        //   console.log(res.data)
        //   setUserObject(res.data.user)
        // save access and refresh tokens to local storage?
        // }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return ( 
    <>
      <h1>Temp Auth Success.. not sure what to do. </h1>
      <button onClick={getUser}>Click Me</button>
      { user && <h4>{user.first_name}</h4> }
    </>
   );
}
 
export default Temp;