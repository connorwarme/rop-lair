import { useState } from "react";

const AddComment = () => {
  const [addForm, setAddForm] = useState(false)
  const [commentText, setCommentText] = useState('')

  const handleShowForm = () => {
    setAddForm(true)
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    console.log(commentText)
    // run axios request
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