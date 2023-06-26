const Nav = () => {
  return ( 
    <>
      <div className="nav-container">
        <div className="nav-links">
          <a href="/" className="home">Home</a>
          <a href="/profile" className="profile">Profile</a>
          <a href="/users" className="users">Users</a>
          <a href="/logout" className="logout">Logout</a>
        </div>
      </div>
    </>
   );
}
 
export default Nav;