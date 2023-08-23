import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangeProfile = ({ user, setEdit, makeHeader, setUserObject }) => {
  const [first_name, setFirstName] = useState(user.first_name)
  const [family_name, setFamilyName] = useState(user.family_name)
  const [picture, setPicture] = useState(user.picture ? user.picture : '')
  const [errors, setErrors] = useState(null)

  const navigate = useNavigate()

  const handleChange =(event, updateFn) => {
    updateFn(event.target.value)
  }
  const getState = () => {
    return { first_name, family_name, picture, userid: user._id }
  }
  const handleCancelEdit = () => {
    // change edit value on parent component
    setEdit(false)
  }
  const handleSaveEdit = (e) => {
    e.preventDefault()
    const url = "http://localhost:3000/profile/update"
    const post = getState()
    axios.post(url, post, { headers: makeHeader() })
    .then(res => {
      if (res.status === 200 && res.data.profile) {
        // save profile to userObject
        setUserObject(res.data.profile)
        // hide edit mode
        setEdit(false)
        // todo: do I need to navigate to profile/:id so that fresh values show up? 
        navigate(`/profile/${res.data.profile._id}`)
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
      <div className="edit-profile-container">
        <form onSubmit={handleSaveEdit}>
        <div className="form-input">
            <label htmlFor="first">First Name</label>
            <input type="text" id="first" className="first" value={first_name} onChange={(e) => {handleChange(e, setFirstName)}}/>
          </div>
          <div className="form-input">
            <label htmlFor="family">Family Name</label>
            <input type="text" id="family" className="content" value={family_name} onChange={(e) => {handleChange(e, setFamilyName)}}/>
          </div>
          <div className="form-input">
            <label htmlFor="picture">Profile Picture</label>
            <input type="text" id="picture" className="picture" value={picture} onChange={(e) => {handleChange(e, setPicture)}}/>
          </div>
          <button type="button" onClick={handleCancelEdit}>Cancel</button>
          <button type="submit">Save</button>
          { errors && (
            <div className="errors">
              { errors.map((err, index) => {
                if (err.status) {
                  return <p key={index}>{err.status} Error! {err.msg}</p>
                }
                return <p key={index}>Error! {err.msg}</p>
              })}
            </div>
          )}
        </form>
      </div>
    </>
   );
}
 
export default ChangeProfile;