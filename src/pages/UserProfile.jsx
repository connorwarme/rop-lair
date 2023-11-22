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
import background from "../images/gallery/galadriel-warrior.jpg"
import custom from "../images/icons/custom2.svg"

const UserProfile = ({ setBg }) => {
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
  setBg(background, '52% 15%')

  return ( 
    <div className="profileDiv">
      { (userObject && !edit) && (
        <>
          <div className="profile-content-container">
            <Profile userObject={userObject} profile={userObject} photoPath={userPhoto} setList={setList} />
            <button onClick={handleShowEdit} className="profile-edit-button">Edit Profile</button>
          </div>
        </>
      )}
      { (isLoading && !edit) && (
        <>
          <div className="profile-posts-container">
            <h4 className="profile-posts-title">{decodeEscapedData(userObject.first_name)}&#39;s Posts</h4>
            <div className='spinner-loading-container'>
              <img src={custom} />
              <p>Content is loading.</p>
            </div> 
          </div>
        </>
      )}
      { (userObject && !edit) && (!isLoading) && (
        <>
          <div className="profile-posts-container">
            <h4 className="profile-posts-title">{decodeEscapedData(userObject.first_name)}&#39;s Posts</h4>
            { data && (
              <>
              { data.posts && (
                <>
                  { data.posts.map(post => <PostUnit key={post._id} user={userObject} post={post._doc} photo={post.photoImagePath ? post.photoImagePath : false} makeHeader={makeHeader}/> )}
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
          </div>
        </>
      )}
      { (userObject && !edit) && (
        <>
          <FriendList username={userObject.first_name} listId={userObject.friend_list._id} makeHeader={makeHeader} userObject={userObject} setList={setList}/>
        </>
      )}
      { (userObject && edit) && (
        <>
          <ChangeProfile user={userObject} setEdit={setEdit} setUserObject={setUserObject} setUserPhoto={setUserPhoto} makeHeader={makeHeader} currentPhoto={getCurrentPhoto} />
        </>
      )}
    </div>
   );
}
 
export default UserProfile;