import { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import { myContext } from '../contexts/Context';

const Home = () => {
  // const [ params, setParams ] = useState(null) 
  // const [accessToken, setAccessToken] = useState(false)
  // const [refreshToken, setRefreshToken] = useState(false)
  // const [user, setUser] = useState(null)

  const { userObject, access } = useContext(myContext)
  const user = {...userObject}
  const token = access

  const location = useLocation()
  
  // trying useContext hook 7/15
  // useEffect(() => {
  //   const getUser = async () => {
  //     fetch("http://localhost:3000/auth/login/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
          
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": "true",
  //       },
  //     })
  //     .then(res => {
  //       if (res.status === 200) return res.json()
  //       throw new Error("authentication has failed! :/")
  //     })
  //     .then(data => {
  //       console.log(data)
  //       setUser(data.user)
  //       setAccessToken(data.access)
  //       setRefreshToken(data.refresh)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  //   }
  //   getUser()
  // }, [])

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


  return ( 
    <>
      <div className="home-container">
        <div className="home-content">
          <h1 className="title">Rings of Power Fan Lair</h1>
          <button onClick={handleClick} >Click Me!</button>
          <button onClick={() => handleWithArg('value')}>Click to add value!</button>
          <PostList posts={posts} full={false} />

          { user && <h1>{user.family_name} || {user.first_name}</h1>}
          { token && <p>{token}</p>}
        </div>
      </div>
    </>
   );
}
 
export default Home;