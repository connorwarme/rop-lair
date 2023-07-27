import { useState, useEffect } from 'react';
import axios from 'axios';


const Comment = ({ commentObj, user, makeHeader }) => {
  const [author, setAuthor] = useState(false)
  // is the current user the author of the comment?
  const [isAuthor, setIsAuthor] = useState(false)
  // need an axios request to get comment author from db

  useEffect(() => {
    axios.get("http://localhost:3000/author/" + commentObj.author, { headers: makeHeader() })
    .then(res => {
      if (res.status === 200 && res.data.author) {
        setAuthor(res.data.author)
        setIsAuthor(res.data.author._id === user._id)
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
  return ( 
    <>
      <div className="comment-container">
        <div className="comment-content">
          { author && <h5 className="comment-author">{author.name}</h5> }
          <p className="comment-text">{commentObj.content}</p>
          { (isAuthor) && <button onClick={() => console.log('Delete this comment from db.')}>Delete</button>}
        </div>
      </div>
    </>
   );
}
 
export default Comment;