/* eslint-disable react/prop-types */
import { useState } from "react"
import { Link } from "react-router-dom"
import Post from "../pages/Post"
import Like from "./Like"

const PostList = ({ posts, full, user }) => {
  return ( 
    <div className="postlist-container">
    { posts.map(post => {
      return (
        <div className="post-container" key={post._id}>
          <Link to={`/post/${post._id}`} element={ <Post id={post._id}/> }>
            <div className="post-content">
              <h2 className="post-title">Title: {post.title}</h2>
              { full && <p className="post-content">{post.content}</p> }
              { post.author && <p className="post-author">Written by: {post.author.name}</p> }
              <Like id={post._id} likes={post.likes ? post.likes : []} user={user} />
            </div>
          </Link>
        </div>
      )}
    )}
    </div>
  )
}
 
export default PostList;