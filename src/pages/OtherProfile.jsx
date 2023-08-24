import { useContext } from "react";
import { useParams } from "react-router-dom";
import { myContext } from "../contexts/Context";
import useFetch from "../hooks/useFetch";
import Profile from "./Profile";
import PostList from "../components/PostList";

const OtherProfile = () => {
  const { id } = useParams()
  const { userObject, access, setUserObject } = useContext(myContext)

  const url = 'http://localhost:3000/profile' + id
  const auth = {
    headers: {
      "Authorization": `Bearer ${access}`
    }
  }
  const { data, isLoading, error } = useFetch(url, auth)
  const setList = (array) => {
    const newObj = {...userObject}
    newObj.friend_list = array
    setUserObject(newObj)
  }

  return ( 
    <>
      { (userObject && !isLoading) && (data && data.profile) && (
        <>
          <Profile userObject={userObject} profile={data.profile} setList={setList} />
        </>
      )}
      { (userObject && !isLoading) && (
        <>
          { data && (
            <>
            { data.posts && (
              <PostList posts={data.posts} full={true} user={userObject} />
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