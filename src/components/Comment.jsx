import { useState, useEffect } from 'react';
import axios from 'axios';


const Comment = ({ post, commentObj, user, setComments, makeHeader }) => {
  const [author, setAuthor] = useState(false)
  // is the current user the author of the comment?
  const [isAuthor, setIsAuthor] = useState(false)
  const [comment, setComment] = useState(false)
  const [edit, setEdit] = useState(false)
  const [errors, setErrors] = useState(false)


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
    setErrors(false)
    setComment(commentObj.content)
  }
  const handleSaveEdit = (e) => {
    e.preventDefault()
    // axios post req to save
    axios.post("http://localhost:3000/editcomment", {
      postid: post,
      commentid: commentObj._id,
      content: comment,
    }, { headers: makeHeader() }) 
    .then(res => {
      if (res.status === 200 && res.data.post) {
        setComments(res.data.post.comments)
        setErrors(false)
        setEdit(false)
      } else if (res.data.errors) {
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  const handleShowEdit = () => {
    setEdit(true)
  }
  const handleDelete = () => {
    axios.post("http://localhost:3000/deletecomment", {
      postid: post,
      commentid: commentObj._id,
    }, { headers: makeHeader() })
    .then(res => {
      if (res.status === 200 && res.data.post) {
        console.log(res.data.post)
        // update post comments 
        setComments(res.data.post.comments)
        setErrors(false)
      } else if (res.data.errors) {
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
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