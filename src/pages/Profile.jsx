import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import PostList from '../components/PostList';
import value from '../../value';

const Profile = () => {
  // example user
  const [user, setUser] = useState({
    name: 'Connor Warme',
    photo: null,
    description: 'Me sleepy',
  })
  // example posts
  const [posts, setPosts] = useState([
    {title: "Post 1", author: "Amity", description: "A day at the lake...", id: 1},
    {title: "Post 2", author: "Connor", description: "A day at the lake...", id: 2},
    {title: "Post 3", author: "Caleb", description: "A day at the lake...", id: 3},
  ])
  // regular profile (of actual user) works
  const url = 'http://localhost:3000/profile'
  // visiting profile (of another user...)
  const otherUrl = 'http://localhost:3000/profile/648f861a0f6d81f002a2a222'
  const auth = {
    headers: {
    "Authorization": value.headers.auth,
    }
  }
  const { data, isLoading, error } = useFetch(otherUrl, auth)

  const handleClick = () => {
    const userCopy = { ...user }
    userCopy.name = 'Amity Warme',
    userCopy.description = 'I have energies!',
    setUser(userCopy)
  }
  return ( 
    <>
      <div className="profile-container">
        <div className="profile-content">
          { error && <div>{error}</div> }
          { data && <h1 className="profile-title">{data.profile.first_name} || {data.profile.family_name}</h1> }
          { data.profile.picture && <img src={data.profile.picture} className='profile-img'></img> }
          <p className="description">{user.description}</p>
          <button onClick={handleClick}>Click me!</button>
        </div>
      </div>
    </>
   );
}
 
export default Profile;