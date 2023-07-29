import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { myContext } from '../contexts/Context';
import PostUnit from '../components/PostUnit';
import icon from "../images/accountIcon.svg"

const Profile = () => {
  const [favs, setFavs] = useState(false)
  const [edit, setEdit] = useState(false)
  const [friend, setFriend] = useState(false)
  const { id } = useParams() 

  const { userObject, access } = useContext(myContext)
  // regular profile (of actual user) works
  // have to determine if it is the current user's profile or someone else's
  const url = id ? 'http://localhost:3000/profile/' + id : 'http://localhost:3000/profile/'
  const auth = {
    headers: {
    "Authorization": `Bearer ${access}`,
    }
  }
  const { data, isLoading, error } = useFetch(url, auth)

  const handleShowEdit = () => {
    setEdit(true)
  }
  const determineFriendship = (list, userid) => {
    if (list.list.includes(userid)) {
      return 'Friends'
    } else if (list.pending.includes(userid)) {
      return 'Pending'
    } else if (list.request.includes(userid)) {
      return 'Accept Request'
    } else {
      return 'Add Friend'
    }
  }
  // needs edit functionality ->
  // what are they allowed to change?
  useEffect(() => {
    if (data != null) {
      if (data.profile._id === data.user._id) {
        return setFriend(false)
      } else {
        // run function to check friend status
        const status = determineFriendship(data.profile.friend_list, data.user._id)
        console.log(status)
        setFriend(status)
      }
    }
  }, [ data ])
  // needs add friend functionality
  // have to see if current user is already friends w/ profile
  // and/or see if they are pending friends
  // and/or see if they aren't friends (and have an "add friend" button)

  // still need to add favorites model and all that to the backend
  return ( 
    <>
      <div className="profile-container">
        <div className="profile-content">
          { error && <div>{error}</div> }
          <img src={(!isLoading && data.profile.picture) ? data.profile.picture : icon} style={{height: '120px'}}></img>
          { (!isLoading && data.profile) && <h1 className="profile-title">{data.profile.name}</h1> }
          <br />
          { (data && friend)}
          { favs && (
            <div className="favs-container">
              <h1>Favorites</h1>
              { favs.char && <p>Character: <em>{favs.char}</em></p> }
              { favs.story && <p>Storyline: <em>{favs.story}</em></p> }
              { favs.ep && <p>Episode: <em>{favs.ep}</em></p> }
              { favs.quote && <p>Quote: <em>{favs.quote}</em></p> }
            </div>
          )}
          { (data && userObject._id === data.profile._id) && <button onClick={handleShowEdit}>Edit Profile</button> }
          { (data && data.posts) && (
            <div className="user-posts-">
            <h3>{data.profile.first_name}&#39;s Posts</h3>
              { data.posts.map(post => <PostUnit key={post._id} user={userObject} post={post}/> )}
            </div>
          )}

        </div>
      </div>
    </>
   );
}
 
export default Profile;