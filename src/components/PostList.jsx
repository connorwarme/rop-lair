/* eslint-disable react/prop-types */
import { useState } from "react"
import { Link } from "react-router-dom"
import Post from "../pages/Post"
import Like from "./Like"
import decodeEscapedData from "../utility/escape"

const PostList = ({ posts, content, author, user }) => {

  return ( 
    <div className="postlist-container">
    { posts.length === 0 && (
      <div>This user has yet to post content.</div>
    )}
    { posts.map(post => {
      return (
        <div className="post-container" key={post._id}>
          <Link to={`/post/${post._id}`} element={ <Post id={post._id}/> }>
            <div className="post-content">
              <h2 className="post-title">Title: {decodeEscapedData(post.title)}</h2>
              { content && <p className="post-content">{decodeEscapedData(post.content)}</p> }
              { (author && post.author) && <p className="post-author">Written by: {decodeEscapedData(post.author.name)}</p> }
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