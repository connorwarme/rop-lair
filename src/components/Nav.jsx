import { Link } from "react-router-dom"
import axios from "axios";
import { clearStorage, returnObject } from "../utility/ls";

// want to think through how to hide routes when the visitor has not signed in yet
// want to show routes once signed in ... but hide the sign in and login links
const Nav = () => {

  // need to send auth bearer token and refresh token in request
  // then need to remove tokens from local storage
  // 
  const logout = () => {
    const token = returnObject("access")
    console.log(token)
    axios.post("http://localhost:3000/auth/logout", {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(res => {
        if (res.data) {
          clearStorage("access")
          window.location.href = "/login"
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return ( 
    <>
      <div className="nav-container">
        <div className="nav-links">
          <Link to="/" className="home">Home</Link>
          <Link to="/profile" className="profile">Profile</Link>
          <Link to="/users" className="users">Users</Link>
          <li className="logout" onClick={logout}>Logout</li>
        </div>
      </div>
    </>
   );
}
 
export default Nav;