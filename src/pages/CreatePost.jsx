import React, { useState, useContext } from "react";
import axios from "axios";
import { myContext } from "../contexts/Context";

const CreatePost = () => {
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)
  // need to import context
  const { access } = useContext(myContext)

  const handleChange = (e, updateStateFn) => {
    updateStateFn(e.target.value)
  }
  const getState = () => {
    return { title: title, content: content }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // need to write this!
    // for some reason I'm not getting my header attached to the request. my backend receives an undefined auth header. 
    const post = getState()
    console.log(access)
    axios.post("http://localhost:3000/createpost", {
      headers: {
        "Authorization": `Bearer ${access}`
      }, 
      data: {
        title: post.title,
        content: post.content,
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
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