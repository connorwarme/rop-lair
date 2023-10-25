import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { myContext } from '../contexts/Context';
import axios from 'axios';
import useAxios from '../hooks/useAxios';
import PostUnit from '../components/PostUnit';
import PostList from '../components/PostList';

const Home = () => {
  const [posts, setPosts] = useState([])
  const [errors, setErrors] = useState(null)

  const { userObject, access, makeHeader } = useContext(myContext)
  const location = useLocation()
  
  const url = "http://localhost:3000/posts"
  const auth = { headers: makeHeader()}
  const { data, isLoading, error } = useAxios(url, auth)

  // useEffect(() => {
  //   // query database for all posts
  //   // eventually have a button to toggle b/w all posts and just friends' posts
  //   const url = "http://localhost:3000/posts"

  //   axios.get(url, { headers: makeHeader() })
  //   .then(res => {
  //     if (res.status === 200 && res.data.posts) {
  //       console.log(res.data.posts)
  //       setPosts(res.data.posts)
  //       setErrors(null)
  //     } else if (res.data.errors) {
  //       setErrors(res.data.errors)
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }, [access])

  return (
    <>
      <div className="home-container">
        <div className="home-content">
          <h1 className="title">Rings of Power Fan Lair</h1>
          { isLoading && <p>Content is loading...</p> }
          { (!isLoading && data) && (
            <>
            { data.posts && (
              <>
                { data.posts.map(post => <PostUnit key={post._id} user={userObject} post={post._doc} photo={post.photoImagePath ? post.photoImagePath : false} /> )}
              </>
            )}
            { data.errors && (
              <div className="errors-container">
                <h4>Error Loading Posts</h4>
                <div>{data.errors[0].msg}</div> 
              </div>
            )}
            </>
          )}
          { (!isLoading && error) && (
            <>
              <div className="errors-container">
                <h4>Error Loading Posts</h4>
                <div>{error[0].status} Error! {error[0].msg}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )

  // this is the old version. trying to implement useAxios and rewrite display accordingly
  // return ( 
  //   <>
  //     <div className="home-container">
  //       <div className="home-content">
  //         <h1 className="title">Rings of Power Fan Lair</h1>
  //         { posts.map(post => <PostUnit key={post._id} user={userObject} post={post}/> )}
  //         {/* <PostList posts={posts} full={true} user={userObject} /> */}
  //         { errors && (
  //           errors.map((err, index) => {
  //             return <p key={index}>{err.status} Error! {err.msg}</p>
  //           })
  //         )}
  //       </div>
  //     </div>
  //   </>
  //  );
}
 
export default Home;