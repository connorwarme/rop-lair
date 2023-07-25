import { useState, useEffect } from "react";

const Like = ({ likes, user }) => {
// need to grab userObject 
// need to see if user already likes the post
// if yes, show button to unlike
// if no, show button to like
  const [userLikes, setUserLikes] = useState(false)
  const [likeText, setLikeText] = useState('Be the first to like this post.')

  const findUserLike = () => {
    const userLike = likes.filter(like => like === user._id)
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
        text = `You and ${number - 1} other like this post.`
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
  }, [])

  return ( 
    <>
      <div className="like-container">
        <p>Icon  ||  {likeText}</p>
        { !userLikes && <button>Like</button> }
        { userLikes && <button>Unlike</button> }
      </div>
    </>
   );
}
 
export default Like;