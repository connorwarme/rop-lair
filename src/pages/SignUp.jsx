const SignUp = () => {
  // todo: could I have a component that I reuse for each input?
  // and just pass in the name and handleFn..?

  return ( 
    <>
      <div className="signup-container">
        <form action="" className="signup">
          <div className="input-unit">
            <label htmlFor="first_name">First Name:</label>
            <input type="text" id="first_name" />
          </div>
          <div className="input-unit">
            <label htmlFor="family_name">Family Name:</label>
            <input type="text" id="family_name" />
          </div>
          <div className="input-unit">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" />
          </div>
          <div className="input-unit">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />
          </div>
          <div className="input-unit">
            <label htmlFor="pwd-conf">Confirm Password:</label>
            <input type="password" id="pwd-conf" />
          </div>
          <div className="input-unit">
            <label htmlFor="submit">Sign Up!</label>
            <input type="submit" id="submit" style={{display: 'none'}} />
          </div>
        </form>
      </div>
    </>
   );
}
 
export default SignUp;