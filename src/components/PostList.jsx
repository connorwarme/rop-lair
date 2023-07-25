/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import Post from "../pages/Post"

const PostList = ({ posts, full }) => {
  return ( 
    <div className="postlist-container">
    { posts.map(post => {
      return (
        <div className="post-container" key={post._id}>
          <Link to={`/post/${post._id}`} state={ { post } } element={ <Post /> }>
            <div className="post-content">
              <h2 className="post-title">Title: {post.title}</h2>
              { full && <p className="post-content">{post.content}</p> }
              { post.author && <p className="post-author">Written by: {post.author.name}</p> }
            </div>
          </Link>
        </div>
      )}
    )}
    </div>
  )
}
 
export default PostList;