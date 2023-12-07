/* eslint-disable react/prop-types */

import { useState, useEffect, useContext } from "react"
import { myContext } from "../contexts/Context"
import axios from "axios"
import like from "../images/icons/thumb-up-outline.svg"
import unlike from "../images/icons/thumb-down-outline.svg"
import "../styles/likeStyle.css"

const Like = ({ id, likes, setLikes, user }) => {
// need to grab userObject 
// need to see if user already likes the post
// if yes, show button to unlike
// if no, show button to like
  const [userLikes, setUserLikes] = useState(false)
  const [likeText, setLikeText] = useState('Be the first to like this post.')

  const { access, makeHeader } = useContext(myContext)

  const findUserLike = () => {
    const userLike = likes.filter(like => like.author === user._id)
    return userLike.length == 1
  }
  const determineText = (boolean, number) => {
    let text = 'Be the first to like this post.'
    if (boolean) {
      if (number == 1) {
        text = 'You like this post.'
      } else if (number == 2) {
        text = 'You and 1 other like this post.'
      } else if (number > 2) {
        text = `You and ${number - 1} others like this post.`
      }
    } else if (number == 1) {
      text = '1 like.'
    } else if (number > 1) {
      text = `${number} likes.`
    }
    return text
  }

  useEffect(() => {
    const like = findUserLike()
    if (like) {
      setUserLikes(true)
      setLikeText(determineText(true, likes.length))
    } else {
      setUserLikes(false)
      setLikeText(determineText(false, likes.length))
    }
  }, [ likes ])

  const handleLike = () => {
    const url = "https://rings-of-power.fly.dev/likepost/" + id
    axios.post(url, {}, { headers: makeHeader() })
    .then(res => {
      if (res.status === 200 && res.data.post) {
        setLikes(res.data.post.likes)
        // it worked -> need to fire an update
        // should i have a state value for number of likes? because I'll need the value and text to update
      } else if (res.data.errors) {
        console.log(res.data.errors)
      }
    })

  }
  const handleUnlike = () => {
    const url = "https://rings-of-power.fly.dev/unlikepost/" + id
    axios.post(url, {}, { headers: makeHeader() })
    .then(res => {
      if (res.status === 200 && res.data.post) {
        setLikes(res.data.post.likes)
      } else if (res.data.errors) {
        console.log(res.data.errors)
      }
    })
  }

  return ( 
    <>
      <div className="like-container">
        <p>{likeText}</p>
        { !userLikes && (
          <>
            <div className="like-btn-container">
              <button onClick={handleLike}>
                <img src={like} className="like-icon" />
                <p>Like</p>
              </button>
            </div>
          </>
          ) }
        { userLikes && (
          <>
            <div className="like-btn-container">
              <button onClick={handleUnlike}>
                <img src={unlike} className="like-icon" />
                <p>Unlike</p>
              </button>
            </div>
          </>
          ) }
      </div>
    </>
   );
}
 
export default Like;