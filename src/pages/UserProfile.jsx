// separate user profile view from a regular profile viewing
// why?
// edit user info
// edit or delete posts
// just use the user object as the profile data...

// I need to get the user object and provide it to a profile component
import { useState, useContext } from "react";
import { myContext } from "../contexts/Context";
import useFetch from "../hooks/useFetch";
import Profile from "../components/Profile";
import PostList from "../components/PostList";
import ChangeProfile from "../components/ChangeProfile";
const UserProfile = () => {
  const [edit, setEdit] = useState(false)

  const { userObject, access, setUserObject, makeHeader } = useContext(myContext)
  // regular profile (of actual user) works
  // have to determine if it is the current user's profile or someone else's
  const url = 'http://localhost:3000/profile/'
  const auth = {
    headers: {
      "Authorization": `Bearer ${access}`
    }
  }
  const { data, isLoading, error } = useFetch(url, auth)
  // need to fetch user posts
  return ( 
    <>
      { (userObject && !edit) && (
        <>
          <Profile userObject={userObject} profile={userObject} />
        </>
      )}
      { (userObject && !edit) && (!isLoading) && (
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
      { (userObject && edit) && (
        <>
          <p>Edit Profile Mode</p>
          <ChangeProfile user={userObject} setEdit={setEdit} setUserObject={setUserObject} makeHeader={makeHeader} />
        </>
      )}
    </>
   );
}
 
export default UserProfile;