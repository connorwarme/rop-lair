const Login = () => {
  return ( 
    <>
      <div className="login-container">
        <div className="login-content">
          <form action="" className="local-login">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" />
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" />
            <button>Sign In</button>
          </form>
          <div className="google-login">
            <a href="/auth/google">Sign In with Google+</a>
          </div>
          <div className="facebook-login">
            <a href="/auth/facebook">Sign In with Facebook</a>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default Login;