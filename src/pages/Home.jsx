import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { myContext } from '../contexts/Context';
import axios from 'axios';
import PostUnit from '../components/PostUnit';
import PostList from '../components/PostList';

const Home = () => {
  const [posts, setPosts] = useState([
    {title: "Post 1", author: "Amity", content: "A day at the lake...", id: 1},
    {title: "Post 2", author: "Connor", content: "A day at the lake...", id: 2},
    {title: "Post 3", author: "Caleb", content: "A day at the lake...", id: 3},
  ])
  const [errors, setErrors] = useState(null)

  const { userObject, access, makeHeader } = useContext(myContext)
  const location = useLocation()
  
  useEffect(() => {
    // query database for all posts
    // eventually have a button to toggle b/w all posts and just friends' posts
    const url = "http://localhost:3000/posts"

    axios.get(url, { headers: makeHeader() })
    .then(res => {
      if (res.status === 200 && res.data.posts) {
        console.log(res.data.posts)
        setPosts(res.data.posts)
        setErrors(null)
      } else if (res.data.errors) {
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }, [access])


  return ( 
    <>
      <div className="home-container">
        <div className="home-content">
          <h1 className="title">Rings of Power Fan Lair</h1>
          { posts.map(post => <PostUnit key={post._id} user={userObject} post={post}/> )}
          {/* <PostList posts={posts} full={true} user={userObject} /> */}
          { errors && (
            errors.map((err, index) => {
              return <p key={index}>{err.status} Error! {err.msg}</p>
            })
          )}
        </div>
      </div>
    </>
   );
}
 
export default Home;