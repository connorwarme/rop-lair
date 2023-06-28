import { useState, useEffect } from 'react';
import PostList from '../components/PostList';

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

  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/profile', {
      headers: {
        "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0OTVkYTZkNWRlYTgwZmM2NWEwYTQ0NyIsImZpcnN0X25hbWUiOiJjb24iLCJmYW1pbHlfbmFtZSI6Im1hbiIsImVtYWlsIjoiY0BnbWFpbC5jb20iLCJsb2dpbmlkIjp7Imhhc2giOiIkMmEkMTIkbndCazFJUVpsU1BOOFVHRXFWcHl5ZUdmNFdwMmF1VGFHWm5nbGlFT1RuVnZMbmNvWXdqTXkiLCJnb29nbGVpZCI6bnVsbCwiZmJpZCI6bnVsbH0sImZyaWVuZF9saXN0IjoiNjQ5NWRhNmQ1ZGVhODBmYzY1YTBhNDQ2IiwiX192IjowfSwiaWF0IjoxNjg3NTQzMjk2fQ.BmCtxFg9iTT2PU1AwG-q_Gq2DSqgVFNmAydD47wTMrk',
      }
    })
    .then((res) => {
      console.log(res)
      if (!res.ok) {
        throw Error('Problem getting a response from the server.')
      }
      return res.json()
    })
    .then((data) => {
      console.log(data)
      setError(null)
    })
    .catch((err) => {
      console.log(err.message)
      setError(err.message)
    })
  })

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
          <h1 className="profile-title">{user.name}</h1>
          <p className="description">{user.description}</p>
          <button onClick={handleClick}>Click me!</button>
          <PostList posts={posts} />

        </div>
      </div>
    </>
   );
}
 
export default Profile;