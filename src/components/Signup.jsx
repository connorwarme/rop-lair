import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { myContext } from "../contexts/Context"
import { saveObject, returnObject } from '../utility/ls';
import axios from "axios"

const SignUp = ({ cancelFn }) => {
  const [firstName, setFirstName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPW, setConfPW] = useState('')
  const [errors, setErrors] = useState(null)

  const { setAccess } = useContext(myContext)
  const navigate = useNavigate()
  // form validation?


  const handleCancel = () => {
    // clear form values ?
    // fire cancelFn from props
    cancelFn()
  }
  const getState = () => {
    return { first_name: firstName, family_name: familyName, email: email, password: password, confirm_password: confirmPW }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit form')
    const url = "http://localhost:3000/signup"
    const account = getState()
    axios.post(url, account)
    .then(res => {
      if (res.status === 200 && res.data.access) {
        // save token to context
        saveObject(res.data.access, "access")
        setAccess(res.data.access)
        navigate(`/`)
      } else if (res.status === 200 && res.data.errors) {
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  return ( 
    <>
      <div className="signup-container">
        <form action="" className="signup">
          <div className="input-unit">
            <label htmlFor="first_name">First Name:</label>
            <input type="text" id="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="input-unit">
            <label htmlFor="family_name">Family Name:</label>
            <input type="text" id="family_name" value={familyName} onChange={(e) => setFamilyName(e.target.value)} required />
          </div>
          <div className="input-unit">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-unit">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="input-unit">
            <label htmlFor="pwd-conf">Confirm Password:</label>
            <input type="password" id="pwd-conf" value={confirmPW} onChange={(e) => setConfPW(e.target.value)} required />
          </div>
          <div className="input-unit">
            <label htmlFor="cancel" onClick={handleCancel}>Cancel</label>
            <input type="button" id="cancel" style={{display: 'none'}} />
          </div>
          <div className="input-unit">
            <label htmlFor="submit" onClick={handleSubmit}>Sign Up!</label>
            <input type="submit" id="submit" style={{display: 'none'}} />
          </div>
        </form>
      </div>
    </>
   );
}
 
export default SignUp;