/* eslint-disable react/prop-types */
import { useState } from "react"
import { Link } from "react-router-dom"
import PostUnit from "./PostUnit"
import Post from "../pages/Post"
import Like from "./Like"
import decodeEscapedData from "../utility/escape"

const PostList = ({ posts, content, author, user }) => {

  // summary statement: this is no longer needed - 9/2
  // keeping for the time being to confirm
  // but will be able to remove shortly...
  return (
    <>
      <div className="postlist-container">
        { posts.length === 0 && <p>This user has yet to post content.</p> }
        { posts.map(post => <PostUnit key={'2'+post._id} user={user} post={post} author={author} /> )}
      </div>
    </>
  )
}
// to-do: clean this up
// trying to incorporate postUnit -> can't remember why I'm not using it..?
// made this change over on 9/2... keeping this code for a while to confirm it all works right
//   return ( 
//     <div className="postlist-container">
//     { posts.length === 0 && (
//       <div>This user has yet to post content.</div>
//     )}
//     { posts.map(post => {
//       return (
//         <div className="post-container" key={post._id}>
//           <Link to={`/post/${post._id}`} element={ <Post id={post._id}/> }>
//             <div className="post-content">
//               <h2 className="post-title">Title: {decodeEscapedData(post.title)}</h2>
//               { content && <p className="post-content">{decodeEscapedData(post.content)}</p> }
//               { (author && post.author) && <p className="post-author">Written by: {decodeEscapedData(post.author.name)}</p> }
//             </div>
//           </Link>
//           <Like id={post._id} likes={post.likes ? post.likes : []} user={user} />
//         </div>
//       )}
//     )}
//     </div>
//   )
// }
 
export default PostList;