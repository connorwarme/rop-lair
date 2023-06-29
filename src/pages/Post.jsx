import React, { useState, useEffect } from 'react';


const Post = () => {
  const [post, setPost] = useState({
    title: "title",
    author: "author",
    text: "text",
    // todo: should I put the likes in it's own state? same for comments?
    likes: [],
    comments: [],
  })

  // need function to handle liking or unliking post
  // need function to handle making a comment (as well as editing and deleting)

  return ( 
    <>
      <div className="post-detail-container">
        <div className="post-detail-content">
          <div className="title">{post.title}</div>
          <div className="author">{post.author}</div>
          <div className="text">{post.text}</div>
          <div className="likes"></div>
          <div className="comments"></div>
        </div>
      </div>
    </>
   );
}
 
export default Post;