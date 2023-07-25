import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { myContext } from '../contexts/Context';
import axios from 'axios';
import PostList from '../components/PostList';

const Home = () => {
  // const [ params, setParams ] = useState(null) 
  // const [accessToken, setAccessToken] = useState(false)
  // const [refreshToken, setRefreshToken] = useState(false)
  // const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([
    {title: "Post 1", author: "Amity", content: "A day at the lake...", id: 1},
    {title: "Post 2", author: "Connor", content: "A day at the lake...", id: 2},
    {title: "Post 3", author: "Caleb", content: "A day at the lake...", id: 3},
  ])
  const [errors, setErrors] = useState(null)

  const { userObject, access } = useContext(myContext)
  const user = {...userObject}

  const location = useLocation()
  
  useEffect(() => {
    // query database for all posts
    // eventually have a button to toggle b/w all posts and just friends' posts
    const url = "http://localhost:3000/posts"
    const headers = {
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${access}`
    }
    axios.get(url, { headers: headers })
    .then(res => {
      if (res.status === 200 && res.data.posts) {
        console.log(res.data.posts)
        setPosts(res.data.posts)
        setErrors(null)
      } else if (res.data.errors) {
        console.log(res.data.errors)
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }, [access])

  const handleClick = (e) => {
    console.log('handle click event', e.target)
  }
  const handleWithArg = (input) => {
    console.log('handle click with ' + input)
  }


  return ( 
    <>
      <div className="home-container">
        <div className="home-content">
          <h1 className="title">Rings of Power Fan Lair</h1>
          <button onClick={handleClick} >Click Me!</button>
          <button onClick={() => handleWithArg('value')}>Click to add value!</button>
          <PostList posts={posts} full={true} />
          { errors && (
            errors.map((err, index) => {
              <p key={index}>{err.status} Error! {err.msg}</p>
            })
          )}
        </div>
      </div>
    </>
   );
}
 
export default Home;