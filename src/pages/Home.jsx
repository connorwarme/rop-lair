import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { myContext } from '../contexts/Context';
import axios from 'axios';
import useAxios from '../hooks/useAxios';
import PostUnit from '../components/PostUnit';
import ropBanner from '../images/titlebanner.png'
import spinner from "../images/icons/spinner.svg"
import custom from "../images/icons/custom2.svg"
import mainBgImg from "../images/gallery/wallpaper-city.jpg"
import "../styles/homeStyle.css"

const Home = ({ setBg }) => {
  const [posts, setPosts] = useState([])
  const [errors, setErrors] = useState(null)

  const { userObject, access, makeHeader } = useContext(myContext)
  const location = useLocation()
  
  const url = "http://localhost:3000/posts"
  const auth = { headers: makeHeader()}
  const { data, isLoading, error } = useAxios(url, auth)

  setBg(mainBgImg)

  const isLoadingFake = true
  return (
    <>
      <div className="home-container">
        <div className="home-content">
          <div className="title-container">
            <div className="title-blur-container">
              <div className="image-blur-container">
                <img src={ropBanner} />
              </div>
              <h1 className="title">Fan Lair</h1>
            </div>
          </div>
          { isLoadingFake && (
            <div className='spinner-loading-container'>
              <img src={custom} />
              <p>Content is loading.</p>
            </div> 
          )}
          { (!isLoadingFake && data) && (
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
          { (!isLoadingFake && error) && (
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
}
 
export default Home;