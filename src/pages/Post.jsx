import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { myContext } from '../contexts/Context';
import axios from 'axios';
import ChangePost from '../components/ChangePost';
import Like from '../components/Like';
import Comment from '../components/Comment';
import AddComment from '../components/AddComment';

const Post = () => {
  const { id } = useParams() 
  const location = useLocation()
  const { userObject, access } = useContext(myContext)
  const navigate = useNavigate()
  const [post, setPost] = useState({
    title: "",
    author: "",
    author_id: "",
    content: "",
    // todo: should I put the likes in it's own state? same for comments?
    likes: [],
    comments: [],
  })
  const [edit, setEdit] = useState(false)
  const [errors, setErrors] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const makeHeader = () => {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access}`
    }
  }

  // need to run a check, once, on load
  // to see if value in location state or not
  useEffect(() => {
    if (location.state) {
      console.log('location state mode')
      setPost({
        title: location.state.post.title,
        // todo: remove switch? 7/25
        // had to add the switch because of some original posts (didn't have an author value)
        // author: location.state.post.author.name,
        // author_id: location.state.post.author._id,
        author: location.state.post.author ? location.state.post.author.name : '',
        author_id: location.state.post.author ? location.state.post.author._id : '',
        content: location.state.post.content,
        likes: location.state.post.likes,
        comments: location.state.post.comments,
      })
    } else {
      console.log('axios mode')
      axios.get("http://localhost:3000/post/" + id, { headers: makeHeader() })
      .then(res => {
        if (res.status === 200 && res.data) {
          setPost({
            title: res.data.post.title,
            // todo: remove switch? 7/25
            // had to add the switch because of some original posts (didn't have an author value)
            // author: res.data.post.author.name,
            // author_id: res.data.post.author._id,
            author: res.data.post.author ? res.data.post.author.name : '',
            author_id: res.data.post.author ? res.data.post.author._id : '',
            content: res.data.post.content,
            likes: res.data.post.likes,
            comments: res.data.post.comments,
          })
        } else if (res.data.errors) {
          setErrors(res.data.errors)
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [])

  const handleEdit = () => {
    setEdit(true)
  }
  const handleDelete = () => {
    const url = "http://localhost:3000/deletepost/" + id
    const headers = makeHeader()
    axios.post(url, {}, { headers: headers })
    .then(res => {
      console.log(res)
      // success message?
      if (res.status === 200 && res.data.message) {
        navigate("/")
      }
      if (res.status === 200 && res.data.errors) {
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const updateLikes = (array) => {
    let newObj = {...post}
    newObj.likes = array
    setPost(newObj)
  }
  const updateComments = (array) => {
    let newObj = {...post}
    newObj.comments = array
    setPost(newObj)
  }
  const handleShowComments = () => {
    setShowComments(!showComments)
  }

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
        { !edit && (
          <div className="post-detail-content">
          <div className="title">{post.title}</div>
          <div className="author">{post.author}</div>
          <div className="text">{post.content}</div>
          <div className="likes">
            <Like id={id} likes={post.likes} setLikes={updateLikes} user={userObject} makeHeader={makeHeader} />
          </div>
          <div className='comments-container'>
            <button onClick={handleShowComments}>{ showComments ? 'Hide Comments' : 'Show Comments' }</button>
            { showComments && (
              <div className="comments">
              {post.comments.map(comment => {
                console.log(comment)
                return <Comment commentObj={comment} user={userObject} key={comment._id} makeHeader={makeHeader} />
              })}
              </div> 
            )}
            <AddComment id={id} setComments={updateComments} makeHeader={makeHeader} />
          </div>
          { (userObject._id === post.author_id) && (
            <div className="options-container">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
          { ((userObject._id === post.author_id) && errors) && (
            <div className="errors">
             { errors.map((err, index) => {
               if (err.status) {
                 return <p key={index}>{err.status} Error! {err.msg}</p>
               }
              return <p key={index}>Error! {err.msg}</p>
             })}
            </div>
          )}
          </div>
        )}
        { edit && (
          <ChangePost url={"http://localhost:3000/editpost/"+id}  post={post} id={id} edit={setEdit} save={setPost}/>
        )}
      </div>
    </>
   );
}
 
export default Post;