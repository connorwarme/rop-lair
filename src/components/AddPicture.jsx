import { useState, useEffect } from "react";
// this appears to be unused (just incorporated it directly in ChangeProf and ChangePost) - 12/07

// started building this component on 9/22
// would like to implement, to reduce duplicate code on ChangeProfile and ChangePost
// currently unfinished
// wasn't remembering well exactly how things are working in ChangeProfile

const AddPicture = ( photo, setPhoto ) => {
  const [preview, setPreview] = useState('')
  const [photoBase, setPhotoBase] = useState('')
  const [photoError, setPhotoError] = useState(null)
  
  useEffect(() => {
    if (!photo) {
      setPreview('')
      return
    }
    const objectURL = URL.createObjectURL(photo)
    setPreview(objectURL)

    return () => URL.revokeObjectURL(objectURL)
  }, [photo])

  const getState = () => {
    const image = {
      type: photo.type,
      data: photoBase,
    }
    return { photo: image }
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

  return (
    <>
      <div className="form-input">
        <label htmlFor="photo">Photo</label>
        <input
          type="file"
          id="photo"
          className="photo"
          accept="image/png, image/jpeg, image/gif"
          onChange={(e) => {
            // does this need to be run twice?! 12/07
            // handlePhoto(e.target.files[0])
            if (!handlePhoto(e.target.files[0])) {
              e.target.value = null;
              // other option:
              // instead of clearing value, could highlight value in red w/ exclamation point
              // if value is photo file, could highlight with green border
            }
          }}
        />
        <br></br>
        {photoError && <span>{photoError}</span>}
      </div>
      {preview && (
        <>
          <div className="photo-preview">
            <img src={preview} alt="Photo" height={"250px"} />
          </div>
        </>
      )}
    </>
  );
}
 
export default AddPicture;