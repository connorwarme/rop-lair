import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { myContext } from '../contexts/Context';
import axios from 'axios';
import ChangePost from '../components/ChangePost';
import Like from '../components/Like';
import Comment from '../components/Comment';
import AddComment from '../components/AddComment';
import decodeEscapedData from '../utility/escape';
import custom from "../images/icons/custom2.svg"
import bgPhoto from "../images/gallery/wallpaper-goodvsevil.jpg"
import "../styles/postDetailStyle.css"

const Post = ({ setBg }) => {
  const { id } = useParams() 
  const location = useLocation()
  const { userObject, makeHeader } = useContext(myContext)
  const navigate = useNavigate()
  const [post, setPost] = useState({
    title: "",
    author: "",
    author_id: "",
    content: "",
    // todo: should I put the likes in it's own state? same for comments? update 7/27 - its working for the moment as is.
    likes: [],
    comments: [],
    photo: null
  })
  // added 9/22
  const [photo, setPhoto] = useState(null)
  const [edit, setEdit] = useState(false)
  const [errors, setErrors] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [loading, setLoading] = useState(true)

  setBg(bgPhoto)
  // need to run a check, once, on load
  // to see if value in location state or not
  useEffect(() => {
    if (location.state) {
      setPost({
        title: location.state.post.title,
        // todo: remove switch? 7/25
        // had to add the switch because of some original posts (didn't have an author value)
        // author: location.state.post.author.name,
        // author_id: location.state.post.author._id,
        author: location.state.user ? location.state.user.name : '',
        author_id: location.state.user ? location.state.user._id : '',
        content: location.state.post.content,
        likes: location.state.post.likes,
        comments: location.state.post.comments,
        photo: location.state.post.photo ? location.state.post.photo._id : null
      })
      setLoading(false)
      // added 9/22
      setPhoto(location.state.photoPath)
    } else {
      axios.get("https://rings-of-power.fly.dev/post/" + id, { headers: makeHeader() })
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
            photo: res.data.post.photo ? res.data.post.photo._id : null
          })
          setLoading(false)
          // added 9/22
          setPhoto(res.data.photoPath)
        } else if (res.data.errors) {
          setLoading(false)
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
    const url = "https://rings-of-power.fly.dev/deletepost/" + id
    axios.post(url, {}, { headers: makeHeader() })
    .then(res => {
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
  const getCurrentPhoto = () => {
    if (post.photo) {
      return { _id: post.photo, photoPath: photo }
    }
    return false
  }

  return ( 
    <div className='postDetailDiv'>
      <div className="post-detail-container">
        { !edit && loading && (
          <>
            <div className='spinner-loading-container'>
              <img src={custom} />
              <p>Content is loading.</p>
            </div> 
          </>
        )}
        { !edit && !loading && (
          <div className="post-detail-content">
          <div className="post-detail-body">
            <div className="title">{decodeEscapedData(post.title)}</div>
            <div className="author">
              { post.author_id != "" && <Link className='author-link' to={`/profile/${post.author_id}`}>{decodeEscapedData(post.author)}</Link> }
              { post.author_id == "" && <p className='author-link'>{decodeEscapedData(post.author)}</p>}
            </div>
            { photo && <img src={photo} /> }
            <div className="text">{decodeEscapedData(post.content)}</div>
          </div>
          <div className="likes">
            { userObject && <Like id={id} likes={post.likes} user={userObject} setLikes={updateLikes} makeHeader={makeHeader} /> }
          </div>
          <div className='comments-container'>
            { (post && post.comments.length > 0) && (
              <>
                <button onClick={handleShowComments}>{ showComments ? 'Hide Comments' : `View Comments (${post.comments.length})` }</button>
                { showComments && (
                  <div className="comments">
                  {post.comments.map(comment => {
                    return <Comment post={id} commentObj={comment} user={userObject} key={comment._id} setComments={updateComments} makeHeader={makeHeader} />
                  })}
                  </div> 
                )}
              </>
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
          <ChangePost url={"https://rings-of-power.fly.dev/editpost/"+id}  post={post} id={id} edit={setEdit} save={setPost} savePhoto={setPhoto} currentPhoto={getCurrentPhoto} />
        )}
      </div>
    </div>
   );
}
 
export default Post;