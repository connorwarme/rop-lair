/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../contexts/Context";
import decodeEscapedData from '../utility/escape';
import errorIcon from "../images/icons/error.svg"
import "../styles/changePostStyle.css"

const ChangePost = ({ url, post, id, edit, save, savePhoto, currentPhoto }) => {
  // this could be a new post or an edit post...
  // differences?
  // cancel edit would redirect to post detail page / but cancel create would redirect to home
  const [title, setTitle] = useState( post ? decodeEscapedData(post.title) : '')
  const [content, setContent] = useState( post ? decodeEscapedData(post.content) : '')
  const [errors, setErrors] = useState(null)
  // trying to implement photo add - 9/22
  const [photo, setPhoto] = useState('')
  const [preview, setPreview] = useState('')
  const [photoBase, setPhotoBase] = useState('')
  const [photoError, setPhotoError] = useState(null)
  // trying to add radio buttons for photo options (keep current, add new, or none)
  // this is where I left off - 9/24
  // best way to deal with three options? string values or what?
  const [photoRadio, setPhotoRadio] = useState('none')
  
  const currentPhotoValue = currentPhoto()
  useEffect(() => {
    if (currentPhotoValue) {
      setPhotoRadio("current")
    }
  }, [])

  const { makeHeader } = useContext(myContext)
  const navigate = useNavigate()

  const handleChange = (e, updateFn) => {
    updateFn(e.target.value)
  }

  // added on 9/22
  const getState = () => {
    const post = { 
      title, 
      content
    }
    if (photoRadio === 'current') {
      post.photoRadio = true
    }
    else if (photoRadio === 'new' && photo) {
      const image = {
        type: photo.type,
        data: photoBase,
      }
      post.photoRadio = 'new'
      post.photo = image
    }
    else {
      post.photoRadio = false
    }
    return post
  }
  // added on 9/22
  useEffect(() => {
    if (!photo) {
      setPreview('')
      return
    }
    const objectURL = URL.createObjectURL(photo)
    setPreview(objectURL)

    return () => URL.revokeObjectURL(objectURL)
  }, [photo])

  // added on 9/22
  // handle photo
  // check if they provided an image file
  const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
  const isImage = (file) => {
    return imageMimeTypes.includes(file.type)
  }
  // added on 9/22
  // check if image is <2mb 
  const isTrim = (file) => {
    return file.size < (2*1024*1024)
  }
  // added on 9/22
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
  // working on radio buttons - 9/25
  const handleRadio = (e, boolean) => {
    setPhotoRadio(e.target.value)
    if (boolean) {
      setPhotoError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (photoRadio === 'new' && photo == '') {
      setPhotoError('Please upload a new photo file.')
      return
    }
    const post = getState()

    axios.post(url, post, { headers: makeHeader() })
    .then(res => {
      if (res.status === 200 && res.data.post) {
        if (edit) {
          edit(false)
          save({...res.data.post, author: res.data.user.name, author_id: res.data.user._id})
          if (res.data.photoPath) {
            savePhoto(res.data.photoPath)
          } else {
            savePhoto(null)
          }
        }
        // need to set up post detail page to receive / use state
        navigate(`/post/${res.data.post._id}`, { state: res.data })
      }
      if (res.status === 200 && res.data.errors) {
        // display errors on form 
        // provide their data (so they don't have to retype everything)
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleCancel = () => {
    // navigate back to original post or back to home
    if (id) {
      edit(false)
      navigate("/post/"+id, { state: { post }})
    } else {
      navigate("/")
    }
  }

  return ( 
    <>
      <div className="change-post-container">
        { id ? <h2>Edit Post</h2> : <h2>Create Post</h2> }
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" className="input-title" value={title} onChange={(e) => {handleChange(e, setTitle)}}/>
          </div>
          <div className="form-input">
            <label htmlFor="content">Content:</label>
            <textarea id="content" className="input-content" value={content} onChange={(e) => {handleChange(e, setContent)}} rows={'4'}/>
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
                  </div> ) }
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
                      <br></br>
                     { photoError && <span>{photoError}</span> }
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
          <button type="button" onClick={handleCancel}>Cancel</button>
          <button type="submit">Save</button>
          { errors && (
            <div className="errors">
              { errors.map((err, index) => {
                if (err.status) {
                  return <div key={index}><img src={errorIcon}/><p>{err.status} Error! {err.msg}</p></div>
                }
                return <div key={index}><img src={errorIcon}/><p>Error! {err.msg}</p></div>
              })}
            </div>
          )}
        </form>
      </div>
    </>
   );
}
 
export default ChangePost;