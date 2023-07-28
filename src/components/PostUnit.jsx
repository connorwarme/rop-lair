/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Like from "./Like";

const PostUnit = ( { user, post }) => {
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
            <h2 className="post-title">Title: {post.title}</h2>
            <p className="post-content">{post.content}</p> 
          </div>
        </Link>
          { post.author && <p className="post-author">Written by: <Link to={`/profile/${post.author._id}`}>{post.author.name}</Link></p> }
          <Like id={post._id} likes={likesArr} setLikes={setLikesArr} user={user} />
      </div>
    </>
   );
}
 
export default PostUnit;