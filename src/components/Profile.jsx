/* eslint-disable react/prop-types */

import AddFriend from "./AddFriend";
import icon from "../images/icons/accountIcon.svg"
import decodeEscapedData from "../utility/escape";
import "../styles/profileStyle.css"

const Profile = ({ userObject, profile, photoPath, setList }) => {

  // todo: add favorites content 8/24
  
  return ( 
    <>            
    { profile && (
      <>
        <div className="profile-content">
          <img src={photoPath ? photoPath : icon} className="profile-picture" ></img>
          <h1 className="profile-title">{decodeEscapedData(profile.name)}</h1>
          <div className="about-me-container">
            <h4>About Me:</h4>
            { profile.bio && <p>{profile.bio}</p> }
            { !profile.bio && <p>no content</p> }
          </div>
          { (profile._id != userObject._id) && <AddFriend list={userObject.friend_list} setList={setList} profileId={profile._id} full={true}/> }
        </div>
      </>
    )}
    </>
   );
}
 
export default Profile;