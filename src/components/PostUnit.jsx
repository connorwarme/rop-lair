import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Post from "../pages/Post";
import Like from "./Like";

const PostUnit = ( { user, post }) => {
  const [postUnit, setPost] = useState(null)
  const [likesArr, setLikesArr] = useState([])
  // const [likesNumber, setLikesNumber] = useState(0)

  const location = useLocation()

  useEffect(() => {
    if (post) {
      setPost(post)
      setLikesArr(post.likes ? post.likes : [])
      // setLikesNumber(location.state.post.likes ? location.state.post.likes.length : 0)
    }
  }, [])

  return ( 
    <>
      <div className="post-container" key={post._id}>
        <Link to={`/post/${post._id}`} >
          <div className="post-content">
            <h2 className="post-title">Title: {post.title}</h2>
            <p className="post-content">{post.content}</p> 
            { post.author && <p className="post-author">Written by: {post.author.name}</p> }
          </div>
        </Link>
            <Like id={post._id} likes={likesArr} setLikes={setLikesArr} user={user} />
      </div>
    </>
   );
}
 
export default PostUnit;