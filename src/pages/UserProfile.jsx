import { useState, useContext } from "react";
import { myContext } from "../contexts/Context";
import useFetch from "../hooks/useFetch";
import Profile from "../components/Profile";
import PostList from "../components/PostList";
import ChangeProfile from "../components/ChangeProfile";
const UserProfile = () => {
  const [edit, setEdit] = useState(false)

  const { userObject, access, setUserObject, makeHeader } = useContext(myContext)
  const url = 'http://localhost:3000/profile/'
  const auth = {
    headers: {
      "Authorization": `Bearer ${access}`
    }
  }
  const { data, isLoading, error } = useFetch(url, auth)

  // todo: this is repetitive content (also on OtherProfile) - try to refactor 8/24
  const setList = (array) => {
    const newObj = {...userObject}
    newObj.friend_list = array
    setUserObject(newObj)
  }
  const handleShowEdit = () => {
    console.log('show edit')
    setEdit(true)
  }

  return ( 
    <>
      { (userObject && !edit) && (
        <>
          <Profile userObject={userObject} profile={userObject} setList={setList} />
          <button onClick={handleShowEdit}>Edit Profile</button>
        </>
      )}
      { (userObject && !edit) && (!isLoading) && (
        <>
          { data && (
            <>
            { data.posts && (
              <>
                <h4>{userObject.first_name}&#39;s Posts</h4>
                <PostList posts={data.posts} full={true} user={userObject} />
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