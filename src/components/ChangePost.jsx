import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../contexts/Context";

const ChangePost = ({ url, post, id, edit }) => {
  // this could be a new post or an edit post...
  // differences?
  // cancel edit would redirect to post detail page / but cancel create would redirect to home
  const [title, setTitle] = useState( post ? post.title : '')
  const [content, setContent] = useState( post ? post.text : '')
  const [errors, setErrors] = useState(null)

  const { access } = useContext(myContext)
  const navigate = useNavigate()

  const handleChange = (e, updateFn) => {
    updateFn(e.target.value)
  }
  const getState = () => {
    return { title, content }
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
    axios.post(url, post, { headers: headers })
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