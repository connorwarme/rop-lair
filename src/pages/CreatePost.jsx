import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../contexts/Context";

const CreatePost = () => {
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)
  const [errors, setErrors] = useState(null)
  // need to import context
  const { access } = useContext(myContext)
  const navigate = useNavigate()

  const handleChange = (e, updateStateFn) => {
    updateStateFn(e.target.value)
  }
  const getState = () => {
    return { title: title, content: content }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const post = getState()
    // reset form?
    // or don't allow submit button to get clicked again...

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access}`
    }
    console.log(access)
    axios.post("http://localhost:3000/createpost", post, { headers: headers })
    .then(res => {
      console.log(res)
      if (res.status === 200 && res.data.post) {
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