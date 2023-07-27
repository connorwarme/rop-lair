import { useState, useEffect } from 'react';
import axios from 'axios';


const Comment = ({ commentObj, user, makeHeader }) => {
  const [author, setAuthor] = useState(false)
  // is the current user the author of the comment?
  const [isAuthor, setIsAuthor] = useState(false)
  const [comment, setComment] = useState(false)
  const [edit, setEdit] = useState(false)


  // need an axios request to get comment author from db
  useEffect(() => {
    axios.get("http://localhost:3000/author/" + commentObj.author, { headers: makeHeader() })
    .then(res => {
      if (res.status === 200 && res.data.author) {
        setAuthor(res.data.author)
        setIsAuthor(res.data.author._id === user._id)
        setComment(commentObj.content)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  // delete logic should be passed in from parent component

  // comment author is just their _id
  // need to run a query to get their names..?

  // need a button to toggle (to reveal comments or hide them)
  // comment units
  // edit and delete buttons if comment author is user
  // handle edit and handle delete functions
  // edit view (in place) w/ cancel and save buttons
  const handleCommentEdit = (e) => {
    setComment(e.target.value)
  }
  const handleCancelEdit = () => {
    setEdit(false)
    setComment(commentObj.content)
  }
  const handleSaveEdit = () => {
    // axios post req to save 
  }
  const handleShowEdit = () => {
    setEdit(true)
  }
  const handleDelete = () => {
    // axios req to delete
  }
  return ( 
    <>
      <div className="comment-container">
        <div className="comment-content">
          { !edit && (
            <div className="comment-unit">
              <h5 className="comment-author">{author ? author.name : 'Anonymous Author'}</h5>
              <p className="comment-text">{commentObj.content}</p>
            </div>
          )}
          { edit && (
            <div className="comment-unit edit">
              <form onSubmit={handleSaveEdit}>
                <label htmlFor="comment">Comment:</label>
                <input type="text" id='comment' value={comment} onChange={handleCommentEdit} />
                <button type='button' onClick={handleCancelEdit}>Cancel</button>
                <button type='submit'>Save</button>
              </form>
            </div>
          )}
          { (isAuthor && !edit) && <button onClick={handleShowEdit}>Edit</button> }
          { (isAuthor) && <button onClick={handleDelete}>Delete</button> }
        </div>
      </div>
    </>
   );
}
 
export default Comment;