import { useState, useEffect, useContext } from "react";
import { myContext } from "../contexts/Context";
import axios from "axios";

const Like = ({ id, likes, user }) => {
// need to grab userObject 
// need to see if user already likes the post
// if yes, show button to unlike
// if no, show button to like
  const [userLikes, setUserLikes] = useState(false)
  const [likeText, setLikeText] = useState('Be the first to like this post.')

  const { access } = useContext(myContext)

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
  const makeHeader = () => {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access}`
    }
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
  }, [])

  const handleLike = () => {
    const url = "http://localhost:3000/likepost/" + id
    const headers = makeHeader()
    axios.post(url, {}, { headers: headers })
    .then(res => {
      if (res.status === 200 && res.data.post) {
        console.log(res.data.post)
        // it worked -> need to fire an update
        // should i have a state value for number of likes? because I'll need the value and text to update
      } else if (res.data.errors) {
        console.log(res.data.errors)
      }
    })

  }
  const handleUnlike = () => {
    const url = "http://localhost:3000/unlikepost/" + id
    const headers = makeHeader()
    axios.post(url, {}, { headers: headers })
    .then(res => {
      if (res.status === 200 && res.data.post) {
        console.log(res.data.post)
      } else if (res.data.errors) {
        console.log(res.data.errors)
      }
    })
  }

  return ( 
    <>
      <div className="like-container">
        <p>Icon  ||  {likeText}</p>
        { !userLikes && <button onClick={handleLike}>Like</button> }
        { userLikes && <button onClick={handleUnlike}>Unlike</button> }
      </div>
    </>
   );
}
 
export default Like;