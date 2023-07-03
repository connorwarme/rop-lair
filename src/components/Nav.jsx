import { Link } from "react-router-dom"

// want to think through how to hide routes when the visitor has not signed in yet
// want to show routes once signed in ... but hide the sign in and login links
const Nav = () => {
  return ( 
    <>
      <div className="nav-container">
        <div className="nav-links">
          <Link to="/" className="home">Home</Link>
          <Link to="/profile" className="profile">Profile</Link>
          <Link to="/users" className="users">Users</Link>
          <Link to="/logout" className="logout">Logout</Link>
        </div>
      </div>
    </>
   );
}
 
export default Nav;