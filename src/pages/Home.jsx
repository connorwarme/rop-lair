import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostList from '../components/PostList';

const Home = () => {
  const [posts, setPosts] = useState([
    {title: "Post 1", author: "Amity", description: "A day at the lake...", id: 1},
    {title: "Post 2", author: "Connor", description: "A day at the lake...", id: 2},
    {title: "Post 3", author: "Caleb", description: "A day at the lake...", id: 3},
  ])
  const handleClick = (e) => {
    console.log('handle click event', e.target)
  }
  const handleWithArg = (input) => {
    console.log('handle click with ' + input)
  }

  const location = useLocation()

  return ( 
    <>
      <div className="home-container">
        <div className="home-content">
          <h1 className="title">Rings of Power Fan Lair</h1>
          <button onClick={handleClick} >Click Me!</button>
          <button onClick={() => handleWithArg('value')}>Click to add value!</button>
          <PostList posts={posts} full={false} />
          { location.state && <h1>{location.state.user.first_name} || {location.state.user.family_name}</h1> }
        </div>
      </div>
    </>
   );
}
 
export default Home;