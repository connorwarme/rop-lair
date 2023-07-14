import React, { useState, useEffect } from 'react';
import Comment from '../components/Comment';
import { useParams } from 'react-router-dom';


const Post = () => {
  const { id } = useParams() 
  // then I can run a fetch request for the specific blog
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
      id: 1,
    },
    {
      author: '2222',
      content: 'Here is the second mock comment',
      id: 2,
    },
    {
      author: '1111',
      content: 'Here is the third mock comment',
      id: 3,
    },

  ]
  // like display: *separate component*
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
          <div className="likes">
            {(mockLikes.length == 0) && <p>Be the first to like this post!</p>}
            {(mockLikes.length == 1) && <p>1 Like</p>}
            {(mockLikes.length > 1) && <p>{mockLikes.length} Likes</p>}
          </div>
          <div className="comments">
            {mockComments.map(comment => {
              return <Comment commentObj={comment} user={null} key={comment.id}/>
            })}
          </div>
        </div>
      </div>
    </>
   );
}
 
export default Post;