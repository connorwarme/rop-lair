/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../contexts/Context";
import AddPicture from "./AddPicture";
import { saveObject } from "../utility/ls";
import useAxios from "../hooks/useAxios";
import decodeEscapedData from '../utility/escape';

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

  const { makeHeader } = useContext(myContext)
  const navigate = useNavigate()

  const handleChange = (e, updateFn) => {
    updateFn(e.target.value)
  }
  // this version works. trying to add photo element to the equation.. 09/22
  // const getState = () => {
  //   return { title, content }

  // added on 9/22
  const getPhoto = (input) => {
    return input
  }
  // added on 9/22
  const getState = () => {
    const post = { 
      title, 
      content
    }
    if (photo) {
      const image = {
        type: photo.type,
        data: photoBase,
      }
      post.photo = image
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
  const handleRadio = (e) => {
    setPhotoRadio(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" className="title" value={title} onChange={(e) => {handleChange(e, setTitle)}}/>
          </div>
          <div className="form-input">
            <label htmlFor="content">Content</label>
            <input type="text" id="content" className="content" value={content} onChange={(e) => {handleChange(e, setContent)}}/>
          </div>
          <div className="form-input">
            <fieldset>
              <legend>Select an option:</legend>
              <div>
                <input type="radio" id="current" name="photo" value="current" checked={photoRadio === "current"} onChange={(e) => handleRadio(e)} />
                <label htmlFor="current">Keep Current Photo</label>
                { currentPhotoValue && <img src={currentPhotoValue.photoPath} alt="Current Photo Preview" /> }
              </div>
              <div>
                <input type="radio" id="new" name="photo" value="new" checked={photoRadio === "new"} onChange={(e) => handleRadio(e)} />
                <label htmlFor="new">Add New Photo</label>
              </div>
              <div>
                <input type="radio" id="none" name="photo" value="none" checked={photoRadio === "none"} onChange={(e) => handleRadio(e)} />
                <label htmlFor="none">No Photo</label>
              </div>
            </fieldset>
          </div>
          <div className="form-input">
            <label htmlFor="photo">Photo</label>
            <input type="file" id="photo" className="photo" accept="image/png, image/jpeg, image/gif" onChange={(e) => {
              handlePhoto(e.target.files[0]) ? console.log('successful') : console.log('fail')
              if (!handlePhoto(e.target.files[0])) {
                e.target.value = null
                // other option:
                // instead of clearing value, could highlight value in red w/ exclamation point
                // if value is photo file, could highlight with green border
              }
            }}
            />
            <br></br>
            { photoError && <span>{photoError}</span> } 
          </div>
          { preview && (
            <>
              <div className="photo-preview">
                <img src={preview} alt="Photo" height={'250px'}/>
              </div>
            </>
          )}
          <button type="button" onClick={handleCancel}>Cancel</button>
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
 
export default ChangePost;