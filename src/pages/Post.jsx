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

  const mockLikes = ['1111', '2222', '3333']
  const mockComments = [
    // real ones also have a date
    {
      author: '1111',
      content: 'Here is my first mock comment',
    },
    {
      author: '2222',
      content: 'Here is the second mock comment',
    },
    {
      author: '1111',
      content: 'Here is the third mock comment',
    },

  ]
  // like display:
  // need to count and report # of likes
  // need to filter likes -> if user likes, show unlike button. if not, show like button.
  // need function to handle liking or unliking post

  // comment display:
  // need a component for each comment. then map over the array and display them all. 
  // if the user is an author of any comment, it should show:
  // a delete button...need function
  // an edit button... needs a function
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