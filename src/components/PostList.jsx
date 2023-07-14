/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import Post from "../pages/Post"

const PostList = ( props ) => {
  const posts = props.posts
  const full = props.full
  return ( 
    <div className="postlist-container">
    { posts.map(post => {
      return (
        <div className="post-container" key={post.id}>
          <Link to={`/post/${post.id}`} element={ <Post /> }>
            <div className="post-content">
              <h2 className="post-title">Title: {post.title}</h2>
              { full && <p className="post-description">{post.description}</p>}
              <p className="post-author">Written by: {post.author}</p>
            </div>
          </Link>
        </div>
      )}
    )}
    </div>
  )
}
 
export default PostList;