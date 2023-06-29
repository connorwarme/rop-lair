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
  const url = 'http://localhost:3000/profile'
  const auth = {
    headers: {
    "Authorization": value.headers.auth,
    }
  }
  const { data, isLoading, error } = useFetch(url, auth)
  // shifted hook logic to separate file (useFetch.js)
  // const [error, setError] = useState(null)

  // useEffect(() => {
  //   fetch('http://localhost:3000/profile', {
  //     headers: {
  //       "Authorization": value.headers.auth,
  //     }
  //   })
  //   .then((res) => {
  //     console.log(res)
  //     if (!res.ok) {
  //       throw Error('Problem getting a response from the server.')
  //     }
  //     return res.json()
  //   })
  //   .then((data) => {
  //     console.log(data)
  //     setError(null)
  //     setUser({
  //       // virtual "name" doesn't work yet, have to construct it from first and family name
  //       // todo: check this by creating new user object (I already changed user model to provide virtuals toJSON)
  //       // name: data.user.name,
  //       name: data.user.first_name + ' ' + data.user.family_name,
  //       photo: null,
  //       description: "user updated from database",
  //     })
  //   })
  //   .catch((err) => {
  //     console.log(err.message)
  //     setError(err.message)
  //   })
  // }, [])

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
          { data && <h1 className="profile-title">{data.user.first_name} || {data.user.family_name}</h1> }
          <img className='profile-img'></img>
          <p className="description">{user.description}</p>
          <button onClick={handleClick}>Click me!</button>
        </div>
      </div>
    </>
   );
}
 
export default Profile;