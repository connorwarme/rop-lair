import { useState } from "react";
import axios from "axios";

const AddComment = ({ id, setComments, user, makeHeader }) => {
  const [addForm, setAddForm] = useState(false)
  const [commentText, setCommentText] = useState('')

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
        console.log(res.data.post)
      } else if (res.data.errors) {
        console.log(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })

    // if error, show error
    // if successful...should I update post page? (like run an axios req? or just update state?)
    // if successful, hide add form
    setAddForm(false)
  }
  const handleComment = (e) => {
    setCommentText(e.target.value)
  }
  const handleCancel = () => {
    setCommentText('')
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
            </form>
          </div>
        )}
      </div>
    </>
   );
}
 
export default AddComment;