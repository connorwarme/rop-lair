import { useState } from 'react';
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