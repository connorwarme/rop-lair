/* eslint-disable react/prop-types */

import AddFriend from "./AddFriend";
import icon from "../images/icons/accountIcon.svg"
import decodeEscapedData from "../utility/escape";
import "../styles/profileStyle.css"

const Profile = ({ userObject, profile, photoPath, setList }) => {

  // todo: add favorites content 8/24
  const stockStyle = {
    width: '300px',
    filter: 'invert(14%) sepia(10%) saturate(2929%) hue-rotate(176deg) brightness(96%) contrast(91%)',
  }
  
  return ( 
    <>            
    { profile && (
      <>
        <div className="profile-content">
          { photoPath && <img src={photoPath} className="profile-picture" ></img> }
          { !photoPath && <img src={icon} className="profile-picture" style={stockStyle} ></img> }
          <h1 className="profile-title">{decodeEscapedData(profile.name)}</h1>
          <div className="about-me-container">
            <h4>About Me:</h4>
            { profile.bio && <p>{decodeEscapedData(profile.bio)}</p> }
            { !profile.bio && <p>no content</p> }
          </div>
          { (profile._id != userObject._id) && <AddFriend list={userObject.friend_list} setList={setList} profileId={profile._id} full={true}/> }
        </div>
      </>
    )}
    </>
   )
}
 
export default Profile;