import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { myContext } from "../contexts/Context";
import axios from "axios";
import useAxios from "../hooks/useAxios";
import useFetch from "../hooks/useFetch";
import Profile from "../components/Profile";
import PostUnit from "../components/PostUnit";
import decodeEscapedData from "../utility/escape";
import FriendList from "../components/FriendList";
import "../styles/profileStyle.css"

const OtherProfile = () => {
  const { id } = useParams()
  const url = 'http://localhost:3000/profile/'
  const [data, setData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const { userObject, access, setUserObject, makeHeader } = useContext(myContext)

  const auth = {
    headers: {
      "Authorization": `Bearer ${access}`
    }
  }
  // not sure what to do / how to get the page to update to different profile. 
  useEffect(() => {

    const abortController = new AbortController()

    axios({
      url: url + id,
      headers: makeHeader(),
      signal: abortController.signal,
    })
    .then(res => {
      if (res.status === 200 && !res.data.errors) {
        setError(null)
        setData(res.data)
        console.log('data mode')
        setTimeout(() => setIsLoading(false), 1000)
      } else if (res.data.errors) {
        setError(res.data.errors)
        setTimeout(() => setIsLoading(false), 1000)
      }
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log('axios request aborted (component unmounted before completed)')
      } else {
        setError(err.message)
        setTimeout(() => setIsLoading(false), 1000)
      }
    })
    return () => abortController.abort()
    }, [id, makeHeader] )
  
  // const url = 'http://localhost:3000/profile/' + id

  // useFetch line works, but going to shift everything to axios
  // const { data, isLoading, error } = useFetch(url, auth)
  // const { data, isLoading, error } = useAxios(url, auth)

  const setList = (array) => {
    const newObj = {...userObject}
    newObj.friend_list = array
    setUserObject(newObj)
  }

  return ( 
    <>
      { (userObject && !isLoading) && (data && data.profile) && (
        <>
          <div className="profile-content-container">
            <Profile userObject={userObject} profile={data.profile} photoPath={data.photoPath} setList={setList} />
          </div>
        </>
      )}
      { (userObject && !isLoading) && (
        <>
          { data && (
            <>
              <div className="profile-posts-container">
                <h4 className="profile-posts-title">{decodeEscapedData(data.profile.first_name)}&#39;s Posts</h4>
              { data.posts && data.posts.length == 0 && <p>{decodeEscapedData(data.profile.first_name)} has yet to post content.</p>}
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
              { error && (
                <div className="errors-container">
                  <h4>Error Loading Posts</h4>
                  <div>{error}</div>
                </div>
              )}
              </div>
            </>
          )}
          { data && data.profile && <FriendList username={data.profile.first_name} listId={data.profile.friend_list} makeHeader={makeHeader} setLoading={setIsLoading} userObject={userObject} setList={setList} /> }
        </>
      )}
    </> 
  );
}
 
export default OtherProfile;