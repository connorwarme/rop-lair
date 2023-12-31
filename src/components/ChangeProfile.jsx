/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import decodeEscapedData from "../utility/escape";
import icon from "../images/icons/accountIcon.svg"
import "../styles/changeProfileStyle.css"

const ChangeProfile = ({ user, setEdit, makeHeader, setUserObject, setUserPhoto, currentPhoto }) => {
  const [first_name, setFirstName] = useState(user.first_name)
  const [family_name, setFamilyName] = useState(user.family_name)
  const [bio, setBio] = useState(user.bio)
  const [picture, setPicture] = useState(user.picture ? user.picture : '')
  const [photo, setPhoto] = useState('')
  const [preview, setPreview] = useState('')
  const [photoBase, setPhotoBase] = useState('')
  const [photoError, setPhotoError] = useState(null)
  const [errors, setErrors] = useState(null)
  const [photoRadio, setPhotoRadio] = useState('none')
  
  const currentPhotoValue = currentPhoto()
  useEffect(() => {
    if (currentPhotoValue) {
      setPhotoRadio("current")
    }
  }, [])
  useEffect(() => {
    if (!photo) {
      setPreview('')
      return
    }
    const objectURL = URL.createObjectURL(photo)
    setPreview(objectURL)

    return () => URL.revokeObjectURL(objectURL)
  }, [photo])

  const navigate = useNavigate()

  useEffect(() => {
    if (!photo) {
      setPreview('')
      return
    }
    const objectURL = URL.createObjectURL(photo)
    setPreview(objectURL)

    return () => URL.revokeObjectURL(objectURL)
  }, [photo])
  const handleChange =(event, updateFn) => {
    updateFn(event.target.value)
  }
  const getState = () => {
    const photoObj = {}
    if (photoRadio === 'current') {
      photoObj.photoRadio = true
    }
    else if (photoRadio === 'new' && photo) {
      const image = {
        type: photo.type,
        data: photoBase,
      }
      photoObj.photoRadio = 'new'
      photoObj.photo = image
    }
    else {
      photoObj.photoRadio = false
    }
    return { first_name, family_name, bio, picture, userid: user._id, photo: photoObj }
  }
  // handle photo
  // check if they provided an image file
  const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
  const isImage = (file) => {
    return imageMimeTypes.includes(file.type)
  }
  // check if image is <2mb 
  const isTrim = (file) => {
    return file.size < (2*1024*1024)
  }
  const handlePhoto = (input) => {
    if (isImage(input) && isTrim(input)) {
      setPhotoError(null)
      setPhoto(input)
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64string = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '')
        setPhotoBase(base64string)
      }
      reader.readAsDataURL(input)
      return true
    }
    else {
      // post photo error
      // clear photo state
      // not sure if this is the way to handle the errors? 
      // I want to be able to clear the file from the display aka input.value = null
      setPhoto('')
      setPhotoBase('')
      setPhotoError('Upload must be an image file (.jpeg, .png, or .gif) and less than 2mb.')
      return false
    }
  }
  // working on radio buttons - 9/26
  const handleRadio = (e, boolean) => {
    setPhotoRadio(e.target.value)
    if (boolean) {
      setPhotoError('')
    }
  }

  const handleCancelEdit = () => {
    // change edit value on parent component
    setEdit(false)
  }
  const handleSaveEdit = (e) => {
    e.preventDefault()
    if (photoRadio === 'new' && photo == '') {
      setPhotoError('Please upload a new photo file.')
      return
    }
    const url = "https://rings-of-power.fly.dev/profile/update"
    const profile = getState()
    axios.post(url, profile, { headers: makeHeader() })
    .then(res => {
      if (res.status === 200 && res.data.profile) {
        // save profile to userObject
        setUserObject(res.data.profile)
        if (res.data.photo && res.data.photoPath) {
          setUserPhoto(res.data.photoPath)
        } else {
          setUserPhoto(icon)
        }
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
        <h2 className="edit-profile-mode">Edit Profile</h2>
        <form onSubmit={handleSaveEdit}>
        <div className="form-input">
            <label htmlFor="first">First Name</label>
            <input type="text" id="first" className="first" value={decodeEscapedData(first_name)} onChange={(e) => {handleChange(e, setFirstName)}}/>
          </div>
          <div className="form-input">
            <label htmlFor="family">Family Name</label>
            <input type="text" id="family" className="family" value={decodeEscapedData(family_name)} onChange={(e) => {handleChange(e, setFamilyName)}}/>
          </div>
          <div className="form-input">
            <label htmlFor="bio">About Me:</label>
            <textarea id="bio" className="bio" value={decodeEscapedData(bio)} onChange={(e) => {handleChange(e, setBio)}} rows={'3'}/>
          </div>
          { (photoRadio === "current" || photoRadio === "new") && (
            <div className="form-input">
              <label htmlFor="image-preview">Photo Preview:</label>
              <div id="image-preview">
                { photoRadio === "current" && <img src={currentPhotoValue.photoPath} alt="Current Photo Preview" /> }
                { photoRadio === "new" && !preview && <p>Please add a new photo!</p> }
                { photoRadio === "new" && preview && <img src={preview} alt="New Photo Preview" /> }
              </div> 
            </div>
          )}
          <div className="form-input">
            <fieldset>
              <legend>Select an option:</legend>
                { currentPhotoValue && (
                  <div>
                    <input type="radio" id="current" name="photoRadio" value="current" checked={photoRadio === "current"} onChange={(e) => handleRadio(e, true)} />
                    <label htmlFor="current">Keep Current Photo</label>
                  </div> 
                ) }
              <div>
                <input type="radio" id="new" name="photoRadio" value="new" checked={photoRadio === "new"} onChange={(e) => handleRadio(e)} />
                <label htmlFor="new">Add New Photo</label>
                { photoRadio === "new" && (
                  <>
                    <div className="photo-file-input">
                      <label htmlFor="photo">Add</label>
                      <input type="file" id="photo" className="photo" accept="image/png, image/jpeg, image/gif" onChange={(e) => {
                        if (!handlePhoto(e.target.files[0])) {
                          e.target.value = null
                          // other option:
                          // instead of clearing value, could highlight value in red w/ exclamation point
                          // if value is photo file, could highlight with green border
                        }
                      }} />
                     { photoError && <p>{photoError}</p> }
                    </div>
                  </>
                )}
              </div>
              <div>
                <input type="radio" id="none" name="photoRadio" value="none" checked={photoRadio === "none"} onChange={(e) => handleRadio(e, true)} />
                <label htmlFor="none">No Photo</label>
              </div>
            </fieldset>
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