/* eslint-disable react/prop-types */

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import Like from "./Like"
import Comment from "./Comment"
import AddComment from "./AddComment"
import decodeEscapedData from "../utility/escape"
import "../styles/postUnitStyle.css"

const PostUnit = ( { user, post, author, photo, makeHeader }) => {
  const [postUnit, setPost] = useState({    
    title: "",
    author: "",
    author_id: "",
    content: "",
    // todo: should I put the likes in it's own state? same for comments? update 7/27 - its working for the moment as is.
    likes: [],
    comments: [],
    photo: null
  })
  const [likesArr, setLikesArr] = useState([])
  const [showComments, setShowComments] = useState(false)

  // const location = useLocation()

  useEffect(() => {
    if (post) {
      setPost(post)
      setLikesArr(post.likes ? post.likes : [])
    }
  }, [])

  const handleClick = () => {
    window.scrollTo(0, 0)
  }
  const updateComments = (array) => {
    let newObj = {...post}
    newObj.comments = array
    setPost(newObj)
  }
  const handleShowComments = () => {
    setShowComments(!showComments)
  }

  return ( 
    <> 
      <div className="post-container" key={'1'+postUnit._id}>
        <Link to={`/post/${postUnit._id}`} onClick={handleClick}>
          <div className="post-content">
            <div className="post-title-container">
              <h2 className="post-title">{decodeEscapedData(postUnit.title)}</h2>
            </div>
            { photo && <img src={photo} height={'150px'} /> }
            <p className="post-content-text">{decodeEscapedData(postUnit.content)}</p> 
          </div>
        </Link>
          { (!author && postUnit.author) && <p className="post-author"><Link to={`/profile/${postUnit.author._id}`} onClick={handleClick}>{decodeEscapedData(postUnit.author.name)}</Link></p> }
          { user && <Like id={post._id} likes={likesArr} setLikes={setLikesArr} user={user} /> }
          <div className='comments-container'>
            { (postUnit && postUnit.comments.length > 0) && (
              <>
                <button onClick={handleShowComments}>{ showComments ? 'Hide Comments' : `View Comments (${postUnit.comments.length})` }</button>
                { showComments && (
                  <div className="comments">
                  {postUnit.comments.map(comment => {
                    return <Comment post={postUnit._id} commentObj={comment} user={user} key={comment._id} setComments={updateComments} makeHeader={makeHeader} />
                  })}
                  </div> 
                )}
              </>
            )}
            <AddComment id={postUnit._id} setComments={updateComments} makeHeader={makeHeader} />
          </div>
      </div>
    </>
   );
}
 
export default PostUnit;