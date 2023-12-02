import { useState } from "react";
import axios from "axios";
import errorIcon from "../images/icons/error.svg"
import "../styles/commentStyle.css"

const AddComment = ({ id, setComments, makeHeader }) => {
  const [addForm, setAddForm] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [errors, setErrors] = useState(null)

  const handleShowForm = () => {
    setAddForm(true)
  }
  const handleAddComment = (e) => {
    e.preventDefault()
    // run axios request
    axios.post("https://rings-of-power.fly.dev/addcomment", { postid: id, content: commentText }, { headers: makeHeader() })
    .then(res => {
      if (res.status === 200 && res.data.post) {
        setComments(res.data.post.comments)
        setCommentText('')
        setErrors(null)
        setAddForm(false)
      } else if (res.data.errors) {
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  const handleComment = (e) => {
    setCommentText(e.target.value)
  }
  const handleCancel = () => {
    setCommentText('')
    setErrors(null)
    setAddForm(false)
  }
  return ( 
    <>
      <div className="add-comment-container">
        { !addForm && <button onClick={handleShowForm}>Add Comment</button> }
        {  addForm && (
          <div className="add-comment-content">
            <form onSubmit={handleAddComment}>
              <div className="text-input">
                <label htmlFor="comment">Add Comment:</label>
                <textarea id="comment" onChange={handleComment} rows={'3'}/>
              </div>
              <button type="button" onClick={handleCancel}>Cancel</button>
              <button type="submit">Save</button>
              { errors && <div className="errors">
                { errors.map((err, index) => {
                  if (err.status) {
                    return <div key={index}><img src={errorIcon}/><p>{err.status} Error! {err.msg}</p></div>
                  }
                  return <div key={index}><img src={errorIcon}/><p>Error! {err.msg}</p></div>
                })}
              </div> }
            </form>
          </div>
        )}
      </div>
    </>
   );
}
 
export default AddComment;