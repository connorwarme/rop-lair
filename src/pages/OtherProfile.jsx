import { useContext } from "react";
import { useParams } from "react-router-dom";
import { myContext } from "../contexts/Context";
import useAxios from "../hooks/useAxios";
import useFetch from "../hooks/useFetch";
import Profile from "../components/Profile";
import PostList from "../components/PostList";
import decodeEscapedData from "../utility/escape";

const OtherProfile = () => {
  const { id } = useParams()
  const { userObject, access, setUserObject } = useContext(myContext)

  const url = 'http://localhost:3000/profile/' + id
  const auth = {
    headers: {
      "Authorization": `Bearer ${access}`
    }
  }
  // useFetch line works, but going to shift everything to axios
  // const { data, isLoading, error } = useFetch(url, auth)
  const { data, isLoading, error } = useAxios(url, auth)
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
        </>
      )}
    </> 
  );
}
 
export default OtherProfile;