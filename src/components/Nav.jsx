import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { clearStorage } from "../utility/ls";
import { myContext } from "../contexts/Context";
import useClickOutside from "../hooks/useClickOutside";
import decodeEscapedData from "../utility/escape";
import settingsIcon from "../images/icons/settings.svg"
import usersIcon from "../images/icons/users.svg"
import accountIcon from "../images/icons/account.svg"
import logoutIcon from "../images/icons/logout.svg"
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

  // close dropdown with click anywhere else on screen
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setShowDropdown(false))

  return ( 
    <>
      <div className="nav-container" id="top">
        { userObject &&
        <div className="nav-links-full">
          <Link to="/" className="fan-lair small" title="Home">
            <h1>F</h1>
            <h1 className="fan-lair-divider">||</h1>
            <h1>L</h1>
          </Link>
          <Link to="/" className="fan-lair large" title="Home">
            <h1>Fan</h1>
            <h1 className="fan-lair-divider">||</h1>
            <h1>Lair</h1>
          </Link>
          <div className="nav-spacer"></div>
          <Link to="/profile" className="user" title="My Profile">
            { userPhoto && <img src={userPhoto} /> }
            <div className="user-name">{decodeEscapedData(userObject.name)}</div>
          </Link>
          <Link to="/post/create" className="create-post radius" title="Create Post"></Link>
          <div className="nav-dropdown" >
            <button ref={dropdownRef} type="button" onClick={() => setShowDropdown(!showDropdown)} title="More Options">
              <img src={settingsIcon} alt="Options" />
            </button>
              <div className={`nav-dropdown-content ${showDropdown ? 'show' : 'hide'}`}>
                <Link to="/users" className="dropdown-item-1"><div><img src={usersIcon} /><p>Users</p></div></Link>
                <div className="divider dropdown-item-2"></div>
                <Link to="/profile" className="dropdown-item-3"><div><img src={accountIcon} /><p>My Profile</p></div></Link>
                <div className="divider dropdown-item-4"></div>
                <a className="logout dropdown-item-5" onClick={logout} ><div><img src={logoutIcon} /><p>Logout</p></div></a>
              </div>
          </div>
        </div>
        }
        {
          userObject === null && (
            <>
              <div ref={dropdownRef} className="hidden-div"></div>
              {/* <div className="outside-nav">
                <h1>Fan Lair</h1>
                <div className="nav-spacer"></div>
                <div className="nav-links">
                  <Link to="/login" className="login">Login</Link>
                  <Link to="/signup" className="signup">Sign-Up</Link>
                  <div ref={dropdownRef} className="hidden-div"></div>
                </div>
              </div> */}
            </>
          )
        }
      </div>
    </>
   );
}
 
export default Nav;