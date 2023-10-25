/* eslint-disable react/prop-types */

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import Like from "./Like"
import decodeEscapedData from "../utility/escape"
import "../styles/postUnitStyle.css"

const PostUnit = ( { user, post, author }) => {
  const [postUnit, setPost] = useState(null)
  const [likesArr, setLikesArr] = useState([])

  // const location = useLocation()

  useEffect(() => {
    if (post) {
      setPost(post)
      setLikesArr(post.likes ? post.likes : [])
    }
  }, [])

  return ( 
    <>
      <div className="post-container" key={'1'+post._id}>
        <Link to={`/post/${post._id}`} >
          <div className="post-content">
            <div className="post-title-container">
              <h2 className="post-title">{decodeEscapedData(post.title)}</h2>
            </div>
            <p className="post-content-text">{decodeEscapedData(post.content)}</p> 
          </div>
        </Link>
          { (!author && post.author) && <p className="post-author"><Link to={`/profile/${post.author._id}`}>{decodeEscapedData(post.author.name)}</Link></p> }
          { user && <Like id={post._id} likes={likesArr} setLikes={setLikesArr} user={user} /> }
      </div>
    </>
   );
}
 
export default PostUnit;