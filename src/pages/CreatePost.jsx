import React, { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)

  const handleChange = (e, updateStateFn) => {
    updateStateFn(e.target.value)
  }

  const getState = () => {
    return { title: title, content: content }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // need to write this!
    const post = getState()
  }

  return ( 
    <>
      <div className="create-container">
        <form className="create-post" onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" className="title" onChange={(e) => {handleChange(e, setTitle)}}/>
          </div>
          <div className="form-input">
            <label htmlFor="content">content</label>
            <input type="text" id="content" className="content" onChange={(e) => {handleChange(e, setContent)}}/>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
   );
}
 
export default CreatePost;