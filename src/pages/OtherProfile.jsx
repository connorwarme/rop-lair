import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { myContext } from "../contexts/Context";
import axios from "axios";
import useAxios from "../hooks/useAxios";
import useFetch from "../hooks/useFetch";
import Profile from "../components/Profile";
import PostList from "../components/PostList";
import decodeEscapedData from "../utility/escape";
import FriendList from "../components/FriendList";

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
          <Profile userObject={userObject} profile={data.profile} photoPath={data.photoPath} setList={setList} />
        </>
      )}
      { (userObject && !isLoading) && (
        <>
          { data && (
            <>
            { data.posts && (
              <>
                <h3>{decodeEscapedData(data.profile.first_name)}&#39;s Posts</h3>
                <PostList posts={data.posts} content={true} author={false} user={userObject} />
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
          { error && (
            <div className="errors-container">
              <h4>Error Loading Posts</h4>
              <div>{error}</div>
            </div>
          )}
          { data && data.profile && <FriendList username={data.profile.first_name} makeHeader={makeHeader} /> }
        </>
      )}
    </> 
  );
}
 
export default OtherProfile;