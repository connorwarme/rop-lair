import { useState, useContext } from "react";
import { myContext } from "../contexts/Context";
import useFetch from "../hooks/useFetch";
import useAxios from "../hooks/useAxios";
import Profile from "../components/Profile";
import PostList from "../components/PostList";
import PostUnit from "../components/PostUnit";
import ChangeProfile from "../components/ChangeProfile";
import decodeEscapedData from "../utility/escape";
import "../styles/profileStyle.css"
import FriendList from "../components/FriendList";

const UserProfile = () => {
  const [edit, setEdit] = useState(false)

  const { userObject, userPhoto, access, setUserObject, setUserPhoto, makeHeader } = useContext(myContext)
  const url = 'http://localhost:3000/profile/'
  const auth = {
    headers: {
      "Authorization": `Bearer ${access}`
    }
  }
  // useFetch line works, but going to shift everything to axios
  // const { data, isLoading, error } = useFetch(url, auth)
  const { data, isLoading, error } = useAxios(url, auth)

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
  const getCurrentPhoto = () => {
    if (userObject.photo && userPhoto) {
      return { _id: userObject.photo._id, photoPath: userPhoto }
    }
    return false
  }

  return ( 
    <>
      { (userObject && !edit) && (
        <>
          <Profile userObject={userObject} profile={userObject} photoPath={userPhoto} setList={setList} />
          <button onClick={handleShowEdit} className="profile-edit-button">Edit Profile</button>
        </>
      )}
      { (userObject && !edit) && (!isLoading) && (
        <>
          { data && (
            <>
            { data.posts && (
              <>
                <h4 className="profile-posts-title">{decodeEscapedData(userObject.first_name)}&#39;s Posts</h4>
                {/* <PostList posts={data.posts} content={true} author={false} user={userObject} /> */}
                { data.posts.map(post => <PostUnit key={post._id} user={userObject} post={post}/> )}
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
          <FriendList username={userObject.first_name} listId={userObject.friend_list._id} makeHeader={makeHeader} userObject={userObject} setList={setList}/>
        </>
      )}
      { (userObject && edit) && (
        <>
          <h2 className="edit-profile-mode">Edit Profile Mode</h2>
          <ChangeProfile user={userObject} setEdit={setEdit} setUserObject={setUserObject} setUserPhoto={setUserPhoto} makeHeader={makeHeader} currentPhoto={getCurrentPhoto} />
        </>
      )}
    </>
   );
}
 
export default UserProfile;