import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { myContext } from "../contexts/Context"
import { saveObject } from '../utility/ls';
import axios from "axios"
import errorIcon from "../images/icons/error.svg"
import "../styles/signupStyle.css"

const SignUp = ({ cancelFn }) => {
  const [firstName, setFirstName] = useState('')
  const [first_nameErr, setFirst_NameErr] = useState(null)
  const [familyName, setFamilyName] = useState('')
  const [family_nameErr, setFamily_NameErr] = useState(null)
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState(null)
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState(null)
  const [confirmPW, setConfPW] = useState('')
  const [confirmPWErr, setConfPWErr] = useState(null)
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
        handleErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  const handleField = (event, setState, setError, length) => {
    setState(event.target.value)
    if (event.target.classList && event.target.value.length > length) {
      setError(null)
    }
  }
  const handleConfirm = (event) => {
    setConfPW(event.target.value)
    if (confirmPW != password) {
      setConfPWErr(true)
    }
    if (event.target.value === password) {
      setConfPWErr(null)
    }
  }
  const handleErrors = (array) => {
    array.forEach(index => {
      if (index.path) {
        if (index.path == 'first_name') {
          setFirst_NameErr(true)
        } else if (index.path == 'family_name') {
          setFamily_NameErr(true)
        } else if (index.path == 'email') {
          setEmailErr(true)
        } else if (index.path == 'password') {
          setPasswordErr(true)
        } else if (index.path == 'confirm_password') {
          setConfPWErr(true)
        }
      }
    })
  }

  return ( 
    <>
      <div className="signup-container">
        <form action="" className="signup-form">
          <div className="form-group">
            <label htmlFor="first_name">First Name:</label>
            <input type="text" id="first_name" className={first_nameErr ? 'input-error' : null} value={firstName} onChange={(e) => handleField(e, setFirstName, setFirst_NameErr, 0)} required />
          </div>
          <div className="form-group">
            <label htmlFor="family_name">Family Name:</label>
            <input type="text" id="family_name" className={family_nameErr ? 'input-error' : null} value={familyName} onChange={(e) => handleField(e, setFamilyName, setFamily_NameErr, 0)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" className={emailErr ? 'input-error' : null} value={email} onChange={(e) => handleField(e, setEmail, setEmailErr, 0)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" className={passwordErr ? 'input-error' : null} value={password} onChange={(e) => handleField(e, setPassword, setPasswordErr, 5)} required />
          </div>
          <div className="form-group">
            <label htmlFor="pwd-conf">Confirm Password:</label>
            <input type="password" id="pwd-conf" className={confirmPWErr ? 'input-error' : null} value={confirmPW} onChange={(e) => handleConfirm(e)} required />
            { confirmPWErr && <span className="conf-pw-error">Passwords do not match.</span> }
          </div>
          { errors && (
            <div className="errors">
              { errors.map((err, index) => {
                if (err.status) {
                  return <div key={index}><img src={errorIcon}/><p>{err.status} Error! {err.msg}</p></div>
                }
                return <div key={index}><img src={errorIcon}/><p>{err.msg}</p></div>
              })}
            </div>
          )}          
          <div className="button-container">
            <div className="form-group">
              <label htmlFor="cancel" onClick={handleCancel}>Cancel</label>
              <input type="button" id="cancel" style={{display: 'none'}} />
            </div>
            <div className="form-group">
              <label htmlFor="submit" onClick={handleSubmit}>Sign Up!</label>
              <input type="submit" id="submit" style={{display: 'none'}} />
            </div>
          </div>
        </form>
      </div>
    </>
   );
}
 
export default SignUp;