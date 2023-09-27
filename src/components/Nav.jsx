import { useContext } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { clearStorage } from "../utility/ls";
import { myContext } from "../contexts/Context";
import decodeEscapedData from "../utility/escape";
import settingsIcon from "../images/icons/settings.svg"
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
        <div className="nav-links-full">
          <Link to="/" className="fan-lair">Fan Lair</Link>
          <Link to="/post/create" className="create-post">+</Link>
          <Link to="/profile" className="user">
            { userPhoto && <img src={userPhoto} height={'30px'} /> }
            {decodeEscapedData(userObject.name)}
          </Link>
          <div className="nav-dropdown">
            <button type="button">
              <img src={settingsIcon} alt="Options" />
            </button>
            <div className="nav-dropdown-content">
              <Link to="/users" className="users">Users</Link>
              <Link to="/profile" className="user">My Profile</Link>
              <li className="logout" onClick={logout}>Logout</li>
            </div>
          </div>
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