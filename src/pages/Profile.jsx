import { useState, useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { myContext } from '../contexts/Context';
import PostUnit from '../components/PostUnit';
import value from '../../value';
import icon from "../images/accountIcon.svg"

const Profile = () => {
  const [favs, setFavs] = useState(false)

  const { userObject } = useContext(myContext)
  // regular profile (of actual user) works
  // have to have backend recognize whether its just profile (and thus provide data of current user)
  // or if there's an id in the url params (and then provide the other user's data)
  const url = 'http://localhost:3000/profile'
  // visiting profile (of another user...)
  const otherUrl = 'http://localhost:3000/profile/648f861a0f6d81f002a2a222'
  const auth = {
    headers: {
    "Authorization": value.headers.auth,
    }
  }
  const { data, isLoading, error } = useFetch(otherUrl, auth)

  // currently debugging CORS - does it give error for both regular url and otherUrl?
  // does img display work? it threw an error (when i didn't internet) and the react page failed to load because "data was null" 
  // working now (7/27)
  return ( 
    <>
      <div className="profile-container">
        <div className="profile-content">
          { error && <div>{error}</div> }
          <img src={userObject.picture ? userObject.picture : icon} style={{height: '120px'}}></img>
          <h1 className="profile-title">{userObject.name}</h1>
          <br />
          { favs && (
            <div className="favs-container">
              <h1>Favorites</h1>
              { favs.char && <p>Character: <em>{favs.char}</em></p> }
              { favs.story && <p>Storyline: <em>{favs.story}</em></p> }
              { favs.ep && <p>Episode: <em>{favs.ep}</em></p> }
              { favs.quote && <p>Quote: <em>{favs.quote}</em></p> }
            </div>
          )}
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