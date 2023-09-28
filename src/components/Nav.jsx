import { useState, useContext, useEffect, useRef } from "react";
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
  const [showDropdown, setShowDropdown] = useState(false)

  const { userObject, userPhoto, makeHeader } = useContext(myContext)

  // need to send auth bearer token and refresh token in request
  // then need to remove tokens from local storage
  
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

  const optionsRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if(!optionsRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  return ( 
    <>
      <div className="nav-container">
        { userObject &&
        <div className="nav-links-full">
          <Link to="/" className="fan-lair">Fan Lair</Link>
          <div className="nav-spacer"></div>
          <Link to="/post/create" className="create-post radius"> </Link>
          <Link to="/profile" className="user">
            { userPhoto && <img src={userPhoto} /> }
            {/* {decodeEscapedData(userObject.name)} */}
          </Link>
          <div ref={optionsRef} className="nav-dropdown">
            <button type="button" onClick={() => setShowDropdown(!showDropdown)}>
              <img src={settingsIcon} alt="Options" />
            </button>
              <div className={`nav-dropdown-content ${showDropdown ? 'show' : 'hide'}`}>
                <Link to="/users" className="users">Users</Link>
                <div className="divider"></div>
                <Link to="/profile" className="user">My Profile</Link>
                <div className="divider"></div>
                <a className="logout" onClick={logout}>Logout</a>
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