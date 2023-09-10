import { useContext } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { clearStorage } from "../utility/ls";
import { myContext } from "../contexts/Context";
import decodeEscapedData from "../utility/escape";
import "../styles/navStyle.css"

// want to think through how to hide routes when the visitor has not signed in yet
// want to show routes once signed in ... but hide the sign in and login links
const Nav = () => {

  const { userObject, userPhoto, makeHeader } = useContext(myContext)

  // need to send auth bearer token and refresh token in request
  // then need to remove tokens from local storage
  // 
  const logout = () => {
    axios.post("http://localhost:3000/auth/logout", { headers: makeHeader() })
      .then(res => {
        if (res.data) {
          clearStorage("access")
          // clear session cookie too? (if they logged in via oauth)
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
        { userObject &&
        <div className="nav-links">
          <Link to="/" className="home">Home</Link>
          <Link to="/profile" className="profile">Profile</Link>
          <Link to="/users" className="users">Users</Link>
          <Link to="/post/create" className="create-post">+</Link>
          <Link to="/profile" className="user">
            { userPhoto && <img src={userPhoto} height={'30px'} /> }
            {decodeEscapedData(userObject.name)}
          </Link>
          <Link to="/profile/6495da6d5dea80fc65a0a447" >Other Profile</Link>
          <li className="logout" onClick={logout}>Logout</li>
        </div>
        }
        {
          userObject === null && 
          <div className="nav-links">
            <Link to="/login" className="login">Login</Link>
            <Link to="/signup" className="signup">Sign-Up</Link>
          </div>
        }
      </div>
    </>
   );
}
 
export default Nav;