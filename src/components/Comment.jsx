import { useState } from 'react';


const Comment = ({ commentObj, user }) => {
  // should this logic be here, or in parent component? and just pass in a boolean
  const [isAuthor, setIsAuthor] = useState(false)
  //

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
          <h5 className="comment-author">{commentObj.author}</h5>
          <p className="comment-text">{commentObj.content}</p>
          { (commentObj.author === user) && <button onClick={() => console.log('Delete this comment from db.')}>Delete</button>}
        </div>
      </div>
    </>
   );
}
 
export default Comment;