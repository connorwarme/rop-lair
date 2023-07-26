import { useState } from "react";
import axios from "axios";

const AddComment = ({ id, setComments, user, makeHeader }) => {
  const [addForm, setAddForm] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [errors, setErrors] = useState(null)

  const handleShowForm = () => {
    setAddForm(true)
  }
  const handleAddComment = (e) => {
    e.preventDefault()
    console.log(commentText)
    // run axios request
    axios.post("http://localhost:3000/addcomment", { postid: id, content: commentText }, { headers: makeHeader() })
    .then(res => {
      if (res.status === 200 && res.data.post) {
        setComments(res.data.post.comments)
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
              <label htmlFor="comment">Comment:</label>
              <input type="text" id="comment" onChange={handleComment} />
              <button type="button" onClick={handleCancel}>Cancel</button>
              <button type="submit">Save</button>
              { errors && <div className="errors">
                { errors.map((err, index) => {
                  if (err.status) {
                    return <p key={index}>{err.status} Error! {err.msg}</p>
                  }
                  return <p key={index}>Error! {err.msg}</p>
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